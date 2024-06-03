import {
  ChannelPointsCustomRewardUpdateEvent,
  ChannelPointsCustomRewardUpdateSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

interface ChannelPointsCustomRewardUpdateCondition {
  channel: string;
  /** track specific event */
  rewardId?: string;
}

// FIXME: alternatively requires channel:manage:redemptions
export default class ChannelPointsCustomRewardUpdate extends BaseEvent<ChannelPointsCustomRewardUpdateEvent> implements ChannelPointsCustomRewardUpdateSubscription {
  readonly type = "channel.channel_points_custom_reward.update";
  readonly version = "1";
  readonly permissions = ["channel:read:redemptions"];

  private _channel: string;
  private _rewardId: string | undefined;

  get channel() {
    return [this._channel];
  }

  get condition() {
    return (...args: string[]) => {
      const condition: Record<string, string> = {
        broadcaster_user_id: args[0],
      };
      if (this._rewardId) {
        condition.reward_id = this._rewardId;
      }
      // always expect arg count to be channel array length + 1
      return condition;
    };
  }
  
  constructor(props: ChannelPointsCustomRewardUpdateCondition, ...args: ((arg: ChannelPointsCustomRewardUpdateEvent) => void)[]) {
    super(args);
    this._channel = props.channel;
    this._rewardId = props.rewardId;
  }
}
