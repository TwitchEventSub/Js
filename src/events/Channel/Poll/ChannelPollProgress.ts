import {
  ChannelPollProgressEvent,
  ChannelPollProgressSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

// FIXME: alternatively requires channel:manage:polls
export default class ChannelPollProgress extends BaseEvent<ChannelPollProgressEvent> implements ChannelPollProgressSubscription {
  readonly type = "channel.poll.progress";
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
  
  constructor(channel: string, ...args: ((arg: ChannelPollProgressEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
