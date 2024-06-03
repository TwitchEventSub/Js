import {
  ChannelFollowSubscription,
  ChannelFollowEvent,
} from "../../types/events";
import BaseEvent from "../../util/BaseEvent";

/** Requires auth to be at least of an editor */
export default class ChannelFollow extends BaseEvent<ChannelFollowEvent> implements ChannelFollowSubscription {
  readonly type = "channel.follow";
  readonly version = "2";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    return (tokenPermissions: string[]) => {
      return ["moderator:read:followers"].filter((permission) => !tokenPermissions.includes(permission));
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
  
  constructor(channel: string, ...args: ((arg: ChannelFollowEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
