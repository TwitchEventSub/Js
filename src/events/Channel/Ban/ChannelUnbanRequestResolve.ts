import {
  ChannelUnbanRequestResolveEvent,
  ChannelUnbanRequestResolveSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";


// FIXME: alternatively requires moderator:manage:unban_requests
export default class ChannelUnbanRequestResolve extends BaseEvent<ChannelUnbanRequestResolveEvent> implements ChannelUnbanRequestResolveSubscription {
  readonly type = "channel.unban_request.resolve";
  readonly version = "1";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    return (tokenPermissions: string[]) => {
      return ["moderator:read:unban_requests"].filter((permission) => !tokenPermissions.includes(permission));
    };
  }

  get condition() {
    return (...args: string[]) => {
      // always expect arg count to be channel array length + 1
      return {
        broadcaster_user_id: args[0],
        moderator_user_id: args[1],
      };
    };
  }
  
  constructor(channel: string, ...args: ((arg: ChannelUnbanRequestResolveEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
