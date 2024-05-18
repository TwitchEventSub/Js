import { WebSocket as WS } from "ws";
import type { EventSubConstructor } from "./types/eventSub";
import { EventItem } from "./types/events";
import {
  setOutput,
  consoleOutput,
} from "./util/consoleOutput";
import getBroadcasterAsync from "./util/getBroadcasterAsync";
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

  private broadcaster: string;
  private broadcasterId: string | undefined;
  private events: EventItem[] = [];
  
  private socket: WebSocket | WS | undefined;
  private keepAliveTimeout: NodeJS.Timeout | undefined;
  private messageIdRecord: Record<string, true> = {};

  constructor(props: EventSubConstructor) {
    this.auth = props.auth.replace("oauth:", "");
    this.broadcaster = props.broadcaster;
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
    await this.initializeBroadcasterAsync();
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
    this.permissions = response.scopes;
    const missingScopes = this.getMissingScopes();
    if (missingScopes.length) {
      consoleOutput("error", "missing required scopes", missingScopes);

      const scopeList = missingScopes.map(([type, permissions]) => `${type} requires ${permissions.join(", ")}`)
      .join(", ");

      throw new Error(`Missing required scopes: ${scopeList}`);
    }
  }

  private async initializeBroadcasterAsync() {
    consoleOutput("debug", "Fetching broadcaster data...");
    if (!this.clientId) {
      throw new Error("client id is not set");
    }

    let err: Error | null = null;
    const response = await getBroadcasterAsync(this.auth, this.broadcaster, this.clientId)
    .catch((e: Error) => {
      err = e;
      return null;
    });

    if (!!err || !response) {
      consoleOutput("error", "failed fetching broadcaster data");

      throw err ?? new Error("response was not set");
    }
    
    if (response.data.length === 0) {
      consoleOutput("error", "broadcaster not found");
      throw new Error("broadcaster not found");
    }

    consoleOutput("debug", "broadcaster initialized", response);
    
    this.broadcasterId = response.data[0].id;
  }

  private initializeSocket(url?: string) {
    let keepAliveSeconds = 30;
    if (!this.broadcasterId) {
      throw new Error("broadcaster id is not set");
    }
    if (!this.clientId) {
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
            acc[x.type] = x;
            return acc;
          },
          {} as Record<string, EventItem>,
        ));

        void Promise.all(uniqueSubscriptions.map((x) =>subscribeToEventAsync({
          auth: this.auth,
          event: x,
          clientId: this.clientId!,
          session: message.payload.session.id,
          broadcaster: this.broadcasterId!,
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
          if (event.type === message.payload.subscription.type) {
            // @ts-expect-error event type is matched in above if statement
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
    const scopePermissionMap: [string, string[]][] = event
      ? [[event.type, event.permissions]]
      : this.events.map<[string, string[]]>((x) => [x.type, x.permissions]);

    return scopePermissionMap.filter(([, permissions]) => permissions.some((x) => !this.permissions?.includes(x)));
  }
}
