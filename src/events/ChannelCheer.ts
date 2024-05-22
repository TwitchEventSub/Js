import {
  ChannelCheerEvent,
  ChannelCheerSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";

export default class ChannelCheer extends BaseEvent<ChannelCheerEvent> implements ChannelCheerSubscription {
  readonly type = "channel.cheer";
  readonly version = "1";
  readonly permissions = ["bits:read"];

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
  
  constructor(channel: string, ...args: ((arg: ChannelCheerEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
