import {
  ChannelUpdateEvent,
  ChannelUpdateSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";

export default class ChannelUpdate extends BaseEvent<ChannelUpdateEvent> implements ChannelUpdateSubscription {
  readonly type = "channel.update";
  readonly version = "2";
  readonly permissions = [];
  readonly broadcasterOnly = true;
  
  constructor(...args: ((arg: ChannelUpdateEvent) => void)[]) {
    super(args);
  }
}
