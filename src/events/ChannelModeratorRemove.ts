import {
  ChannelModeratorRemoveEvent,
  ChannelModeratorRemoveSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";


export default class ChannelModeratorRemove extends BaseEvent<ChannelModeratorRemoveEvent> implements ChannelModeratorRemoveSubscription {
  readonly type = "channel.moderator.remove";
  readonly version = "2";
  readonly permissions = ["moderation:read"];
  
  constructor(...args: ((arg: ChannelModeratorRemoveEvent) => void)[]) {
    super(args);
  }
}
