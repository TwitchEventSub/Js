import {
  ChannelPointsAutomaticRewardRedemptionEvent,
  ChannelPointsAutomaticRewardRedemptionSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

export default class ChannelPointsAutomaticRewardRedemption extends BaseEvent<ChannelPointsAutomaticRewardRedemptionEvent> implements ChannelPointsAutomaticRewardRedemptionSubscription {
  readonly type = "channel.channel_points_automatic_reward_redemption.add";
  readonly version = "1";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    const permissions = ["channel:read:redemptions", "channel:manage:redemptions"];
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
      };
    };
  }
  
  constructor(channel: string, ...args: ((arg: ChannelPointsAutomaticRewardRedemptionEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
