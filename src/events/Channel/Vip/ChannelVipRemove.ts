import {
  ChannelVipRemoveEvent,
  ChannelVipRemoveSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";


// FIXME: alternatively requires channel:manage:vips
export default class ChannelVipRemove extends BaseEvent<ChannelVipRemoveEvent> implements ChannelVipRemoveSubscription {
  readonly type = "channel.vip.remove";
  readonly version = "1";
  readonly permissions = ["channel:read:vips"];

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
  
  constructor(channel: string, ...args: ((arg: ChannelVipRemoveEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
