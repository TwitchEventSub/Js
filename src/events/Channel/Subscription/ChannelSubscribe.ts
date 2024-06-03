import {
  ChannelSubscribeEvent,
  ChannelSubscribeSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

export default class ChannelSubscribe extends BaseEvent<ChannelSubscribeEvent> implements ChannelSubscribeSubscription {
  readonly type = "channel.subscribe";
  readonly version = "1";
  readonly permissions = ["channel:read:subscriptions"];

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
  
  constructor(channel: string, ...args: ((arg: ChannelSubscribeEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
