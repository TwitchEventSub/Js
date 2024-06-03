import {
  GoalBeginEvent,
  GoalBeginSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";


export default class GoalBegin extends BaseEvent<GoalBeginEvent> implements GoalBeginSubscription {
  readonly type = "channel.goal.begin";
  readonly version = "1";

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
  
  constructor(channel: string, ...args: ((arg: GoalBeginEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
