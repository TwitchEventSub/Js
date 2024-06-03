import {
  WhisperReceivedEvent,
  WhisperReceivedSubscription,
} from "../../types/events";
import BaseEvent from "../../util/BaseEvent";

export default class WhisperReceived extends BaseEvent<WhisperReceivedEvent> implements WhisperReceivedSubscription {
  readonly type = "user.whisper.message";
  readonly version = "1";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    const permissions = ["user:read:whispers", "user:manage:whispers"];
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
        user_id: args[0],
      };
    };
  }
  
  constructor(channel: string, ...args: ((arg: WhisperReceivedEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
