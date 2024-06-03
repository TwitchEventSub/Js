import {
  CharityCampaignStartEvent,
  CharityCampaignStartSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";


export default class CharityCampaignStart extends BaseEvent<CharityCampaignStartEvent> implements CharityCampaignStartSubscription {
  readonly type = "channel.charity_campaign.start";
  readonly version = "1";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    return (tokenPermissions: string[]) => {
      return ["channel:read:charity"].filter((permission) => !tokenPermissions.includes(permission));
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
  
  constructor(channel: string, ...args: ((arg: CharityCampaignStartEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
