import {
  ChannelFollowSubscription,
  ChannelFollowEvent,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";


export default class ChannelFollow extends BaseEvent<ChannelFollowEvent> implements ChannelFollowSubscription {
  readonly type = "channel.follow";
  readonly version = "2";
  readonly permissions = ["moderator:read:followers"];
  
  constructor(...args: ((arg: ChannelFollowEvent) => void)[]) {
    super(args);
  }
}
