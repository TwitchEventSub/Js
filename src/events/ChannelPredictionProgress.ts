import {
  ChannelPredictionProgressEvent,
  ChannelPredictionProgressSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";

// FIXME: alternatively requires channel:manage:predictions
export default class ChannelPredictionProgress extends BaseEvent<ChannelPredictionProgressEvent> implements ChannelPredictionProgressSubscription {
  readonly type = "channel.prediction.progress";
  readonly version = "1";
  readonly permissions = ["channel:read:predictions"];

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
  
  constructor(channel: string, ...args: ((arg: ChannelPredictionProgressEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
