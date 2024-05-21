import {
  AutomodMessageHoldEvent,
  AutomodMessageHoldSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";

/** Requires auth to be at least of an editor */
export default class AutomodMessageHold extends BaseEvent<AutomodMessageHoldEvent> implements AutomodMessageHoldSubscription {
  readonly type = "automod.message.hold";
  readonly version = "1";
  readonly permissions = ["moderator:manage:automod"];

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get condition() {
    return (...args: string[]) => {
      // always expect arg count to be channel array length + 1
      return {
        broadcaster_user_id: args[0],
        moderator_user_id: args[1],
      };
    };
  }
  
  constructor(channel: string, ...args: ((arg: AutomodMessageHoldEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
