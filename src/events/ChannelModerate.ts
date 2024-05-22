import {
  ChannelModerateEvent,
  ChannelModerateSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";

// FIXME: alternatively reqyures multitude of permissions
export default class ChannelModerate extends BaseEvent<ChannelModerateEvent> implements ChannelModerateSubscription {
  readonly type = "channel.moderate";
  readonly version = "1";
  readonly permissions = [
    "moderator:read:blocked_terms", // || moderator:manage:blocked_terms
    "moderator:read:chat_settings", // || moderator:manage:chat_settings
    "moderator:read:banned_users", // || moderator:manage:banned_users
    "moderator:read:chat_messages", // || moderator:manage:chat_messages
    "moderator:read:moderators",
    "moderator:read:vips",
  ];

  private _channel: string;

  get channel() {
    return [this._channel];
  }


  get condition() {
    return (...args: string[]) => {
      // always expect arg count to be channel array length + 1
      return {
        broadcaster_user_id: args[0],
      };
    };
  }
  
  constructor(channel: string, ...args: ((arg: ChannelModerateEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
