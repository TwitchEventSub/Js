import {
  ChannelUnbanRequestCreateEvent,
  ChannelUnbanRequestCreateSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";


// FIXME: alternatively requires moderator:manage:unban_requests
export default class ChannelUnbanRequestCreate extends BaseEvent<ChannelUnbanRequestCreateEvent> implements ChannelUnbanRequestCreateSubscription {
  readonly type = "channel.unban_request.create";
  readonly version = "1";
  readonly permissions = ["moderator:read:unban_requests"];

  private _channel: string;

  get channel() {
    return [this._channel];
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
  
  constructor(channel: string, ...args: ((arg: ChannelUnbanRequestCreateEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
