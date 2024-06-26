import {
  ChannelSuspiciousUserUpdateEvent,
  ChannelSuspiciousUserUpdateSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

export default class ChannelSuspiciousUserUpdate extends BaseEvent<ChannelSuspiciousUserUpdateEvent> implements ChannelSuspiciousUserUpdateSubscription {
  readonly type = "channel.suspicious_user.update";
  readonly version = "1";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    return (tokenPermissions: string[]) => {
      return ["moderator:read:suspicious_users"].filter((permission) => !tokenPermissions.includes(permission));
    };
  }

  get condition() {
    return (...args: string[]) => {
      // always expect arg count to be channel array length + 1
      return {
        broadcaster_user_id: args[0],
        moderator_user_id: args[args.length - 1],
      };
    };
  }
  
  constructor(channel: string, ...args: ((arg: ChannelSuspiciousUserUpdateEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
