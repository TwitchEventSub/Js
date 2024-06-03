import {
  ChannelModeratorRemoveEvent,
  ChannelModeratorRemoveSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

/** Requires auth to be at least of an editor */
export default class ChannelModeratorRemove extends BaseEvent<ChannelModeratorRemoveEvent> implements ChannelModeratorRemoveSubscription {
  readonly type = "channel.moderator.remove";
  readonly version = "2";
  readonly permissions = ["moderation:read"];

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
  
  constructor(channel: string, ...args: ((arg: ChannelModeratorRemoveEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
