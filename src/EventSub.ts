import { WebSocket as WS } from "ws";
import type { EventSubConstructor } from "./types/eventSub";
import { EventItem } from "./types/events";
import {
  setOutput,
  consoleOutput,
} from "./util/consoleOutput";
import getBroadcasterAsync, { User } from "./util/getBroadcasterAsync";
import getUserAsync from "./util/getUserAsync";
import socket from "./util/socket";
import { EventSubMessage } from "./messages";
import subscribeToEventAsync from "./util/subscribeToEventAsync";
import {
  isNotification,
  isSessionKeepAlive,
  isSessionReconnect,
  isSessionWelcome,
} from "./util/messageIdentifiers";

export default class EventSub {
  private auth: string;
  private permissions: string[] | undefined;
  private clientId: string | undefined;

  private events: EventItem[] = [];
  
  private socket: WebSocket | WS | undefined;
  private keepAliveTimeout: NodeJS.Timeout | undefined;
  private messageIdRecord: Record<string, true> = {};
  private broadcasterMap: Record<string, string> = {};
  private authUserId: string | undefined;

  constructor(props: EventSubConstructor) {
    this.auth = props.auth.replace("oauth:", "");
    setOutput(props.output ?? "error");
  }

  subscribe(event: EventItem) {
    consoleOutput("debug", "subscribing to event", event);
    if (!this.permissions) {
      this.events.push(event);
      return;
    }
    throw new Error(`cannot subscribe to event ${event.type} after initialization`);
  }


  async startAsync() {
    await this.initializeAuthAsync();
    await this.initializeBroadcasterListAsync();
    this.initializeSocket();
  }


  private async initializeAuthAsync() {
    consoleOutput("debug", "Initializing auth...");
    let err: Error | null = null;
    const response = await getUserAsync(this.auth)
    .catch((e: Error) => {
      err = e;
      return null;
    });

    if (!!err || !response) {
      consoleOutput("error", "failed fetching user data", { err, response });

      throw err ?? new Error("response was not set");
    }

    consoleOutput("debug", "auth initialized", response);

    this.clientId = response.client_id;
    this.authUserId = response.user_id;
    this.permissions = response.scopes;
    const missingScopes = this.getMissingScopes();
    if (missingScopes.length) {
      consoleOutput("error", "missing required scopes", missingScopes);

      const scopeList = missingScopes.map(([type, permissions]) => `${type} requires ${permissions.join(", ")}`)
      .join(", ");

      throw new Error(`Missing required scopes: ${scopeList}`);
    }
  }

  private async initializeBroadcasterListAsync() {
    consoleOutput("debug", "Fetching broadcaster data...");
    if (!this.clientId) {
      throw new Error("client id is not set");
    }

    this.broadcasterMap = this.events.reduce(
      (acc, x) => {
        for (const channel of x.channel) {
          acc[channel.toLocaleLowerCase()] = "";
        }
        return acc;
      },
      this.broadcasterMap,
    );

    const broadcasterlist = Object.keys(this.broadcasterMap)
    .reduce(
      (acc, x) => {
        let currentIndex = acc.length - 1;
        if (acc[currentIndex].length === 100) {
          acc.push([]);
          currentIndex++;
        }
        acc[currentIndex].push(x);
        return acc;
      },
      [[]] as string[][],
    );

    let err: Error | null = null;
    const data: User[] = [];
    await Promise.all(broadcasterlist.map((x) => getBroadcasterAsync(this.auth, x, this.clientId!)))
    .then((res) => {
      for (const response of res) {
        if (response) {
          data.push(...response.data);
        }
      }
    })
    .catch((e: Error) => {
      err = e;
    });

    if (!!err || !data.length) {
      consoleOutput("error", "failed fetching broadcaster data");

      throw err ?? new Error("response was not set");
    }
    
    consoleOutput("debug", "broadcasters fetched", data);

    for (const broadcaster of data) {
      this.broadcasterMap[broadcaster.login.toLowerCase()] = broadcaster.id;
    }

    const missingBroadcaster = Object.entries(this.broadcasterMap)
    .filter(([, x]) => !x);

    if (missingBroadcaster.length) {
      consoleOutput("error", "missing broadcaster", missingBroadcaster);
      throw new Error(`Missing broadcaster: ${missingBroadcaster.join(", ")}`);
    }
  }

  private initializeSocket(url?: string) {
    let keepAliveSeconds = 30;
    if (Object.keys(this.broadcasterMap).length === 0) {
      throw new Error("broadcaster list is not set");
    }

    if (!this.clientId || this.authUserId === undefined) {
      throw new Error("client id is not set");
    }

    if (url === undefined) {
      url = `wss://eventsub.wss.twitch.tv/ws`;
    }

    consoleOutput("debug", "Connecting to socket", url);
    this.socket = new socket(url);

    this.socket.onerror = (event: Parameters<Exclude<WS["onerror"], null>>[0]) => {
      consoleOutput("error", "socket error", event);
    };

    this.socket.onopen = () => {
      consoleOutput("info", "socket connected");
    };

    this.socket.onmessage = (event: Parameters<Exclude<WS["onmessage"], null>>[0]) => {
      
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      const message = JSON.parse(event.data.toString("utf-8")) as EventSubMessage;

      if ("type" in message && message.type === "PING") {
        this.socket?.send(JSON.stringify({ type: "PONG" }));
        return;
      }

      if (isSessionWelcome(message)) {
        consoleOutput("debug", "socket welcome message", message);
        // + 1 is to account for variation in miliseconds
        keepAliveSeconds = message.payload.session.keepalive_timeout_seconds + 1;
        this.keepAliveTimeout = setTimeout(() => {
          this.removeSocketIntervals();
          this.socket?.close();
          this.initializeSocket();
        }, keepAliveSeconds * 1000);
        const uniqueSubscriptions = Object.values(this.events.reduce(
          (acc, x) => {
            acc[x.type + x.channel.join(",")] = x;
            return acc;
          },
          {} as Record<string, EventItem>,
        ));

        void Promise.all(uniqueSubscriptions.map((x) =>subscribeToEventAsync({
          auth: this.auth,
          event: x,
          clientId: this.clientId!,
          session: message.payload.session.id,
          condition: x.condition(...x.channel.map(y => this.broadcasterMap[y])
          .concat(this.authUserId!))
          // client id is required for specific events
          ?? { clientId: this.clientId! },
          broadcaster: this.broadcasterMap[x.channel[0].toLowerCase()],
        })))
        .then((res) => {
          const failed = res.map<[boolean, EventItem]>((x, i) => [x, uniqueSubscriptions[i]])
          .filter(([x]) => !x)
          .map(([, x]) => x.type);
          if (failed.length) {
            this.removeSocketIntervals();
            this.socket?.close();
            throw new Error(`Failed to subscribe to events: ${failed.join(", ")}, closing socket...`);
          }
        });
        return;
      }

      if (isSessionReconnect(message)) {
        consoleOutput("debug", "socket reconnect message", message);
        this.removeSocketIntervals();
        this.socket?.close();
        this.initializeSocket(message.payload.session.reconnect_url);
        return;
      }

      if (isSessionKeepAlive(message)) {
        consoleOutput("debug", "socket keep alive message", message);
        this.removeSocketIntervals();
        this.keepAliveTimeout = setTimeout(
          () => {
            this.removeSocketIntervals();
            this.socket?.close();
            this.initializeSocket();
          },
          keepAliveSeconds * 1000,
        );
        return;
      }

      if (isNotification(message)) {
        consoleOutput("info", "notification message", message);
        this.removeSocketIntervals();
        this.keepAliveTimeout = setTimeout(
          () => {
            this.removeSocketIntervals();
            this.socket?.close();
            this.initializeSocket();
          },
          keepAliveSeconds * 1000,
        );

        if (this.messageIdRecord[message.metadata.message_id]) {
          return;
        }
        const id = message.metadata.message_id;
        setTimeout(() => delete this.messageIdRecord[id], keepAliveSeconds * 1000);
        
        for (const event of this.events) {
          // type becomes any with message.payload.subscription having 40+ types
          if (event.type === message.payload.subscription.type) {
            event.dispatchEvent(message.payload.event);
          }
        }
      }
    };

    this.socket.onclose = (event: Parameters<Exclude<WS["onclose"], null>>[0]) => {
      consoleOutput("info", "socket closed", event.code, event.reason);
    };
  }

  private removeSocketIntervals() {
    if (!this.socket) {
      consoleOutput("debug", "socket is not set");
      return;
    }
    if (this.keepAliveTimeout) {
      clearTimeout(this.keepAliveTimeout);
      this.keepAliveTimeout = undefined;
    }
  }

  private getMissingScopes(event?: EventItem) {
    let scopePermissionMap: [string, string[]][] = [];
    if (event) {
      scopePermissionMap = [[event.type, event.permissions(this.permissions ?? [])]];
    } else {
      const uniqueTypes = this.events.reduce(
        (acc, x) => {
          acc[x.type] = x;
          return acc;
        },
        {} as Record<string, EventItem>,
      );

      scopePermissionMap = Object.values(uniqueTypes)
      .map<[string, string[]]>((x) => [x.type, x.permissions(this.permissions ?? [])]);
    }
    return scopePermissionMap.filter(([, permissions]) => permissions.length);
  }
}
