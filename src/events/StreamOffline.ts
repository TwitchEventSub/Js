import {
  StreamOfflineEvent,
  StreamOfflineSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";

export default class StreamOffline extends BaseEvent<StreamOfflineEvent> implements StreamOfflineSubscription {
  readonly type = "stream.offline";
  readonly version = "1";
  readonly permissions = [];

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
  
  constructor(channel: string, ...args: ((arg: StreamOfflineEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
