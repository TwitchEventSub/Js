import {
  ChannelAdBreakBeginEvent,
  ChannelAdBreakBeginSubscription,
} from "../../types/events";
import BaseEvent from "../../util/BaseEvent";

export default class ChannelAdBreakBegin extends BaseEvent<ChannelAdBreakBeginEvent> implements ChannelAdBreakBeginSubscription {
  readonly type = "channel.ad_break.begin";
  readonly version = "2";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    return (tokenPermissions: string[]) => {
      return ["channel:read:ads"].filter((permission) => !tokenPermissions.includes(permission));
    };
  }

  get condition() {
    return (...args: string[]) => {
      // always expect arg count to be channel array length + 1
      return {
        broadcaster_user_id: args[0],
      };
    };
  }
  
  constructor(channel: string, ...args: ((arg: ChannelAdBreakBeginEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
