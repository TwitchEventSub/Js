import { jest, describe, it, expect } from "@jest/globals";
import { RequestInit } from "node-fetch";

const fullsuccessAuth = "1";
const failAtAuth = "2";
const failAtBroadcaster = "3";
const failAtEvent = "4";
const failAtScope = "5";
const baseEventType = "channel.follow";
const baseEventPermission = "moderator:read:followers";
const broadcaster = "broadcaster";
const broadcasterId = "id";

jest.mock(
  "../util/fetch",
  () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const originalModule = jest.requireActual("../util/fetch") as typeof import("../util/fetch");
    return {
      __esModule: true,
      ...originalModule,
      default: jest.fn<(url: string, data?: RequestInit) => Promise<unknown>>()
      .mockImplementation((url: string, data?: RequestInit) => {
        switch (url) {
          case "https://id.twitch.tv/oauth2/validate":
          {
            return new Promise((resolve, reject) => {
              if (typeof data?.headers === "object"
                && !Array.isArray(data.headers)
                && "Authorization" in data.headers
                && !Array.isArray(data.headers.Authorization)
                && data.headers.Authorization !== `Bearer ${failAtAuth}`
              ) {
                const client_id = data.headers.Authorization.replace("Bearer ", "");
                const scopes = client_id !== failAtScope ? [baseEventPermission] : [];
                resolve({ json: () => Promise.resolve({ client_id, scopes }) });
              } else {
                reject(new Error("No Authorization"));
              }
            });
          }
          case `https://api.twitch.tv/helix/users?login=${broadcaster}`:
          {
            return new Promise((resolve, reject) => {
              if (typeof data?.headers === "object"
                && !Array.isArray(data.headers)
                && "Client-Id" in data.headers
                && !Array.isArray(data.headers["Client-Id"])
                && data.headers["Client-Id"] !== failAtBroadcaster
              ) {
                resolve({ json: () => Promise.resolve({ data: [{ id: broadcasterId }] }) });
              } else {
                reject(new Error("No Client-Id"));
              }
            });
          }
          case "https://api.twitch.tv/helix/eventsub/subscriptions":
          {
            return new Promise((resolve, reject) => {
              if (typeof data?.headers === "object"
                && !Array.isArray(data.headers)
                && "Client-Id" in data.headers
                && !Array.isArray(data.headers["Client-Id"])
                && data.headers["Client-Id"] !== failAtEvent
              ) {
                resolve({ status: 202 });
              } else {
                reject(new Error("No Client-Id"));
              }
            });
          }
          default:
          {
            return new Promise((_, reject) => reject(new Error("Invalid URL")));
          }
        }
      }),
    };
  },
);


jest.mock(
  "../util/socket",
  () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const originalModule = jest.requireActual("../util/socket") as typeof import("../util/socket");
    return {
      __esModule: true,
      ...originalModule,
      default: jest.fn(() => {
        
        return class MockSocket {
          constructor(url: string) {
            if (url !== "wss://pubsub-edge.twitch.tv") {
              throw new Error("Invalid URL");
            }
            setTimeout(
              () => {
                this.onmessage({
                  data: JSON.stringify({
                    metadata: {
                      message_id: "1",
                      message_type: "session_welcome",
                      message_timestamp: new Date()
                      .toISOString(),
                    },
                    payload: {
                      id: "1",
                      status: "connected",
                      keepalive_timeout_seconds: 30,
                      connected_at: new Date()
                      .toISOString(),
                    },
                  }),
                });
              },
              10,
            );
          }
          onmessage(a: { data: string; }) {
            throw new Error("Method not implemented.");
            console.log(a);
            return;
          }

          close() {
            return;
          }
        };
      }),
    };
  },
);

import EventSub from "../EventSub";
import ChannelFollow from "../events/ChannelFollow";

describe(
  "EventSub",
  () => {
    it(
      "should crash at auth",
      async () => {
        const eventSub = new EventSub({ auth: failAtAuth, broadcaster, output: "none" });
        eventSub.subscribe(new ChannelFollow((e) => console.log(e)));
        await expect(eventSub.startAsync())
        .rejects
        .toThrow(new Error("No Authorization"));
      },
    );

    it(
      "should crash at scope",
      async () => {
        const eventSub = new EventSub({ auth: failAtScope, broadcaster, output: "none" });
        eventSub.subscribe(new ChannelFollow((e) => console.log(e)));
        await expect(eventSub.startAsync())
        .rejects
        .toThrow(new Error(`Missing required scopes: ${baseEventType} requires ${baseEventPermission}`));
      },
    );

    it(
      "should crash at fetching broadcaster data",
      async () => {
        const eventSub = new EventSub({ auth: failAtBroadcaster, broadcaster, output: "none" });
        eventSub.subscribe(new ChannelFollow((e) => console.log(e)));
        await expect(eventSub.startAsync())
        .rejects
        .toThrow(new Error("No Client-Id"));
      },
    );

    it(
      "should crash at subscribing to event",
      async () => {
        jest.useFakeTimers();
        const eventSub = new EventSub({ auth: failAtEvent, broadcaster, output: "none" });
        eventSub.subscribe(new ChannelFollow((e) => console.log(e)));
        await eventSub.startAsync();
        jest.advanceTimersByTime(15);
        setImmediate(() => {
          expect(() => {
            jest.runAllTimers();
          })
          .toThrow(new Error(`Failed to subscribe to events: ${baseEventType}, closing socket...`));
        });
      },
    );

    it(
      "should reject new events after initialization",
      async () => {
        const eventSub = new EventSub({ auth: fullsuccessAuth, broadcaster, output: "none" });
        eventSub.subscribe(new ChannelFollow((e) => console.log(e)));
        await eventSub.startAsync();
        expect(() => eventSub.subscribe(new ChannelFollow((e) => console.log(e))))
        .toThrow(new Error(`cannot subscribe to event ${baseEventType} after initialization`));
      },
    );
  },
);
