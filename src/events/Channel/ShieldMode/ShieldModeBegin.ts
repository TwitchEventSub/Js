import {
  ShieldModeBeginEvent,
  ShieldModeBeginSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

export default class ShieldModeBegin extends BaseEvent<ShieldModeBeginEvent> implements ShieldModeBeginSubscription {
  readonly type = "channel.shield_mode.begin";
  readonly version = "1";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    const permissions = ["moderator:read:shield_mode", "moderator:manage:shield_mode"];
    return (tokenPermissions: string[]) => {
      if (!tokenPermissions.some((permission) => permissions.includes(permission))) {
        return [permissions[0]];
      }
      return [];
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
  
  constructor(channel: string, ...args: ((arg: ShieldModeBeginEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
