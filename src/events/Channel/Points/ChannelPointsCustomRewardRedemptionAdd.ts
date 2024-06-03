import {
  ChannelPointsCustomRewardRedemptionAddEvent,
  ChannelPointsCustomRewardRedemptionAddSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

// FIXME: alternatively requires channel:manage:redemptions
export default class ChannelPointsCustomRewardRedemptionAdd extends BaseEvent<ChannelPointsCustomRewardRedemptionAddEvent> implements ChannelPointsCustomRewardRedemptionAddSubscription {
  readonly type = "channel.channel_points_custom_reward_redemption.add";
  readonly version = "1";
  readonly permissions = ["channel:read:redemptions"];

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
  
  constructor(channel: string, ...args: ((arg: ChannelPointsCustomRewardRedemptionAddEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
