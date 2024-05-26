import {
  CharityDonationEvent,
  CharityDonationSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";


export default class CharityCampaignStart extends BaseEvent<CharityDonationEvent> implements CharityDonationSubscription {
  readonly type = "channel.charity_campaign.donate";
  readonly version = "1";
  readonly permissions = ["channel:read:charity"];

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
  
  constructor(channel: string, ...args: ((arg: CharityDonationEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
