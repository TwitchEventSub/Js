import {
  ChannelBanEvent,
  ChannelBanSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

export default class ChannelBan extends BaseEvent<ChannelBanEvent> implements ChannelBanSubscription {
  readonly type = "channel.ban";
  readonly version = "1";
  readonly permissions = ["channel:moderate"];

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
  
  constructor(channel: string, ...args: ((arg: ChannelBanEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
