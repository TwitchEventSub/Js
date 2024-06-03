import {
  HypeTrainBeginEvent,
  HypeTrainBeginSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";


export default class HypeTrainBegin extends BaseEvent<HypeTrainBeginEvent> implements HypeTrainBeginSubscription {
  readonly type = "channel.hype_train.begin";
  readonly version = "1";
  readonly permissions = ["channel:read:hype_train"];

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
  
  constructor(channel: string, ...args: ((arg: HypeTrainBeginEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
