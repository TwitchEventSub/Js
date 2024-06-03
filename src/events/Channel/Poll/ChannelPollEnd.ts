import {
  ChannelPollEndEvent,
  ChannelPollEndSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

// FIXME: alternatively requires channel:manage:polls
export default class ChannelPollEnd extends BaseEvent<ChannelPollEndEvent> implements ChannelPollEndSubscription {
  readonly type = "channel.poll.end";
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
  
  constructor(channel: string, ...args: ((arg: ChannelPollEndEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
