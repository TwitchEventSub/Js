import {
  ChannelRaidEvent,
  ChannelRaidSubscription,
} from "../../types/events";
import { PickOne } from "../../types/utilTypes";
import BaseEvent from "../../util/BaseEvent";

interface BaseChannelRaidCondition {
  from: string;
  to: string;
}

export default class ChannelRaid extends BaseEvent<ChannelRaidEvent> implements ChannelRaidSubscription {
  readonly type = "channel.raid";
  readonly version = "1";
  readonly permissions = [];

  private _properties: PickOne<BaseChannelRaidCondition>;

  get channel() {
    const channels = Object.values(this._properties) as (string | undefined)[];
    return channels.filter((value) => value !== undefined) as string[];
  }

  get condition() {
    const property = Object.entries(this._properties)
    .filter(([_, v]) => v !== undefined)
    .map(([k, _]) => k)[0];
    return (...args: string[]) => {
      // always expect arg count to be channel array length + 1
      return {
        [property]: args[0],
      };
    };
  }
  
  constructor(props: PickOne<BaseChannelRaidCondition>, ...args: ((arg: ChannelRaidEvent) => void)[]) {
    super(args);
    this._properties = props;
  }
}
