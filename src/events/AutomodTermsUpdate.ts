import {
  AutomodTermsUpdateEvent,
  AutomodTermsUpdateSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";


export default class AutomodTermsUpdate extends BaseEvent<AutomodTermsUpdateEvent> implements AutomodTermsUpdateSubscription {
  readonly type = "automod.terms.update";
  readonly version = "1";
  readonly permissions = ["moderator:manage:automod"];
  
  constructor(...args: ((arg: AutomodTermsUpdateEvent) => void)[]) {
    super(args);
  }
}
