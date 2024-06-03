import {
  AutomodMessageHoldUpdateEvent,
  AutomodMessageHoldUpdateSubscription,
} from "../../types/events";
import BaseEvent from "../../util/BaseEvent";

/** Requires auth to be at least of an editor */
export default class AutomodMessageHoldUpdate extends BaseEvent<AutomodMessageHoldUpdateEvent> implements AutomodMessageHoldUpdateSubscription {
  readonly type = "automod.message.update";
  readonly version = "1";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    return (tokenPermissions: string[]) => {
      return ["moderator:manage:automod"].filter((permission) => !tokenPermissions.includes(permission));
    };
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
  
  constructor(channel: string, ...args: ((arg: AutomodMessageHoldUpdateEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
