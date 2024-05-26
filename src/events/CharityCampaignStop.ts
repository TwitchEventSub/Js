import {
  CharityCampaignStopEvent,
  CharityCampaignStopSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";


export default class CharityCampaignStop extends BaseEvent<CharityCampaignStopEvent> implements CharityCampaignStopSubscription {
  readonly type = "channel.charity_campaign.stop";
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
  
  constructor(channel: string, ...args: ((arg: CharityCampaignStopEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}