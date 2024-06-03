import {
  StreamOnlineEvent,
  StreamOnlineSubscription,
} from "../../types/events";
import BaseEvent from "../../util/BaseEvent";

export default class StreamOnline extends BaseEvent<StreamOnlineEvent> implements StreamOnlineSubscription {
  readonly type = "stream.online";
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
  
  constructor(channel: string, ...args: ((arg: StreamOnlineEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
