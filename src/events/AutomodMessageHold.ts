import {
  AutomodMessageHoldEvent,
  AutomodMessageHoldSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";


export default class ChannelFollow extends BaseEvent<AutomodMessageHoldEvent> implements AutomodMessageHoldSubscription {
  readonly type = "automod.message.hold";
  readonly version = "2";
  readonly permissions = ["moderator:read:followers"];
  
  constructor(...args: ((arg: AutomodMessageHoldEvent) => void)[]) {
    super(args);
  }
}
