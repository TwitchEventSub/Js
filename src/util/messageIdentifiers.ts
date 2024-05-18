import { ESKeepAliveMessage, ESReconnectMessage, ESWelcomeMessage, EventSubMessage, NotificationMessage } from "../messages";

export function isSessionWelcome(arg: EventSubMessage): arg is ESWelcomeMessage {
  return "metadata" in arg && arg.metadata.message_type === "session_welcome";
}

export function isSessionReconnect(arg: EventSubMessage): arg is ESReconnectMessage {
  return "metadata" in arg && arg.metadata.message_type === "session_reconnect";
}

export function isSessionKeepAlive(arg: EventSubMessage): arg is ESKeepAliveMessage {
  return "metadata" in arg && arg.metadata.message_type === "session_keepalive";
}

export function isNotification(arg: EventSubMessage): arg is NotificationMessage {
  return "metadata" in arg && arg.metadata.message_type === "notification";
}
