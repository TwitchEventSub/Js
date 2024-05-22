import {
  ChannelPollBeginEvent,
  ChannelPollBeginSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";

// FIXME: alternatively requires channel:manage:polls
export default class ChannelPollBegin extends BaseEvent<ChannelPollBeginEvent> implements ChannelPollBeginSubscription {
  readonly type = "channel.poll.begin";
  readonly version = "1";
  readonly permissions = ["channel:read:polls"];

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get condition() {
    return (...args: string[]) => {
      // always expect arg count to be channel array length + 1
      return {
        broadcaster_user_id: args[0],
      };
    };
  }
  
  constructor(channel: string, ...args: ((arg: ChannelPollBeginEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
