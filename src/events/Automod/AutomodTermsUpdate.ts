import {
  AutomodTermsUpdateEvent,
  AutomodTermsUpdateSubscription,
} from "../../types/events";
import BaseEvent from "../../util/BaseEvent";

/** Requires auth to be at least of an editor */
export default class AutomodTermsUpdate extends BaseEvent<AutomodTermsUpdateEvent> implements AutomodTermsUpdateSubscription {
  readonly type = "automod.terms.update";
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
  
  constructor(channel: string, ...args: ((arg: AutomodTermsUpdateEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
