import {
  ChannelUpdateEvent,
  ChannelUpdateSubscription,
} from "../../types/events";
import BaseEvent from "../../util/BaseEvent";

export default class ChannelUpdate extends BaseEvent<ChannelUpdateEvent> implements ChannelUpdateSubscription {
  readonly type = "channel.update";
  readonly version = "2";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    return (_tokenPermissions: string[]) => [];
  }

  get condition() {
    return (...args: string[]) => {
      // always expect arg count to be channel array length + 1
      return {
        broadcaster_user_id: args[0],
      };
    };
  }
  
  constructor(channel: string, ...args: ((arg: ChannelUpdateEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
