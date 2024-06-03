import {
  ChannelSubscribeEndSubscription,
  ChannelSubscribeEvent,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

export default class ChannelSubscriptionEnd extends BaseEvent<ChannelSubscribeEvent> implements ChannelSubscribeEndSubscription {
  readonly type = "channel.subscription.end";
  readonly version = "1";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    return (tokenPermissions: string[]) => {
      return ["channel:read:subscriptions"].filter((permission) => !tokenPermissions.includes(permission));
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
  
  constructor(channel: string, ...args: ((arg: ChannelSubscribeEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
