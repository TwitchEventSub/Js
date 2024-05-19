import {
  AutomodMessageHoldEvent,
  AutomodMessageHoldSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";


export default class AutomodMessageHold extends BaseEvent<AutomodMessageHoldEvent> implements AutomodMessageHoldSubscription {
  readonly type = "automod.message.hold";
  readonly version = "1";
  readonly permissions = ["moderator:manage:automod"];
  
  constructor(...args: ((arg: AutomodMessageHoldEvent) => void)[]) {
    super(args);
  }
}
