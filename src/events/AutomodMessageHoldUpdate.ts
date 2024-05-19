import {
  AutomodMessageHoldUpdateEvent,
  AutomodMessageHoldUpdateSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";


export default class AutomodMessageHoldUpdate extends BaseEvent<AutomodMessageHoldUpdateEvent> implements AutomodMessageHoldUpdateSubscription {
  readonly type = "automod.message.update";
  readonly version = "1";
  readonly permissions = ["moderator:manage:automod"];
  
  constructor(...args: ((arg: AutomodMessageHoldUpdateEvent) => void)[]) {
    super(args);
  }
}
