import { AutomodMessageHoldEvent, AutomodSettingsUpdateEvent, ChannelFollowEvent, ChannelFollowSubscription, ChannelModeratorRemoveEvent } from "./types/events";
import ChannelModeratorRemove from "./events/ChannelModeratorRemove";
import AutomodMessageHold from "./events/AutomodMessageHold";
import AutomodMessageHoldUpdate from "./events/AutomodMessageHoldUpdate";
import AutomodSettingsUpdate from "./events/AutomodSettingsUpdate";


type EventSubMetaType = "session_welcome" | "session_keepalive" | "notification" | "session_reconnect" | "revocation";

interface EventSubMetaData<T extends EventSubMetaType> {
  message_id: string;
  message_type: T;
  message_timestamp: string;
}

interface BaseEventSubMessage<T extends EventSubMetaType, P> {
  metadata: EventSubMetaData<T>;
  payload: P;
}

interface BaseESConnectionPayload {
  id: string;
  /** UTC date and time */
  connected_at: string;
}

interface ESWelcomeMessagePayload {
  session: BaseESConnectionPayload & {
    status: "connected";
    keepalive_timeout_seconds: number;
    reconnect_url: null;
  };
}

type ESWelcomeMessage = BaseEventSubMessage<"session_welcome", ESWelcomeMessagePayload>;

interface ESReconnectMessagePayload {
  session: BaseESConnectionPayload & {
    status: "reconnected";
    keepalive_timeout_seconds: number;
    reconnect_url: string;
  };
}

type ESReconnectMessage = BaseEventSubMessage<"session_reconnect", ESReconnectMessagePayload>;

// exact response of the keep alive message is empty object
type ESKeepAliveMessage = BaseEventSubMessage<"session_keepalive", Record<never, never>>;

interface BaseEventSubNotificationPayload<T extends string, E> {
  subscription: {
    id: string;
    status: "enabled";
    type: T;
    version: string;
    /** set as unknown as its not used */
    condition: Record<string, unknown>;
    transport: {
      method: "websocket";
      session_id: string;
    };
    created_at: string;
  };
  event: E;
}

export type NotificationFollowMessage = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelFollowSubscription["type"], ChannelFollowEvent>>;

export type NotificationChannelModeratorRemoved = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelModeratorRemove["type"], ChannelModeratorRemoveEvent>>;

export type NotificationAutomodMessageHold = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<AutomodMessageHold["type"], AutomodMessageHoldEvent>>;

export type NotificationAutomodMessageHoldUpdate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<AutomodMessageHoldUpdate["type"], AutomodMessageHoldEvent>>;

export type NotificationAutomodSettingsUpdate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<AutomodSettingsUpdate["type"], AutomodSettingsUpdateEvent>>;

export type NotificationMessage = NotificationFollowMessage
| NotificationChannelModeratorRemoved
| NotificationAutomodMessageHold
| NotificationAutomodMessageHoldUpdate
| NotificationAutomodSettingsUpdate;

export interface PingMessage {
  type: "PING";
}

export type EventSubMessage = PingMessage
| ESWelcomeMessage
| ESReconnectMessage
| ESKeepAliveMessage
| NotificationMessage;
