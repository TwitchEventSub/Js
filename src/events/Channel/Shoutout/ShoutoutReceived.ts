import {
  ShoutoutReceivedEvent,
  ShoutoutReceivedSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

export default class ShoutoutReceived extends BaseEvent<ShoutoutReceivedEvent> implements ShoutoutReceivedSubscription {
  readonly type = "channel.shoutout.receive";
  readonly version = "1";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    const permissions = ["moderator:read:shoutouts", "moderator:manage:shoutouts"];
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
        moderator_user_id: args[args.length - 1],
      };
    };
  }
  
  constructor(channel: string, ...args: ((arg: ShoutoutReceivedEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
