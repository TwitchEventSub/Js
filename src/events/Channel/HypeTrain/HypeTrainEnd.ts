import {
  HypeTrainEndEvent,
  HypeTrainEndSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";


export default class HypeTrainEnd extends BaseEvent<HypeTrainEndEvent> implements HypeTrainEndSubscription {
  readonly type = "channel.hype_train.end";
  readonly version = "1";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    return (tokenPermissions: string[]) => {
      return ["channel:read:hype_train"].filter((permission) => !tokenPermissions.includes(permission));
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
  
  constructor(channel: string, ...args: ((arg: HypeTrainEndEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
