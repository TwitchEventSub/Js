import {
  ShieldModeEndEvent,
  ShieldModeEndSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

// FIXME: alternatively requires moderator:manage:shield_mode
export default class ShieldModeEnd extends BaseEvent<ShieldModeEndEvent> implements ShieldModeEndSubscription {
  readonly type = "channel.shield_mode.end";
  readonly version = "1";
  readonly permissions = ["moderator:read:shield_mode"];

  private _channel: string;

  get channel() {
    return [this._channel];
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
  
  constructor(channel: string, ...args: ((arg: ShieldModeEndEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
