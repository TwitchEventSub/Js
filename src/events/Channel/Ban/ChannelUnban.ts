import {
  ChannelUnbanEvent,
  ChannelUnbanSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

export default class ChannelUnban extends BaseEvent<ChannelUnbanEvent> implements ChannelUnbanSubscription {
  readonly type = "channel.unban";
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
  
  constructor(channel: string, ...args: ((arg: ChannelUnbanEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
