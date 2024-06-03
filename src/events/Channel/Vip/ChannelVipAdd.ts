import {
  ChannelVipAddEvent,
  ChannelVipAddSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";


export default class ChannelVipAdd extends BaseEvent<ChannelVipAddEvent> implements ChannelVipAddSubscription {
  readonly type = "channel.vip.add";
  readonly version = "1";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    const permissions = ["channel:read:vips", "channel:manage:vips"];
    return (tokenPermissions: string[]) => {
      if (!tokenPermissions.some((permission) => permissions.includes(permission))) {
        return [permissions[0]];
      }
      return [];
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
  
  constructor(channel: string, ...args: ((arg: ChannelVipAddEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
