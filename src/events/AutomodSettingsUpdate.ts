import {
  AutomodSettingsUpdateEvent,
  AutomodSettingsUpdateSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";


export default class AutomodSettingsUpdate extends BaseEvent<AutomodSettingsUpdateEvent> implements AutomodSettingsUpdateSubscription {
  readonly type = "automod.settings.update";
  readonly version = "1";
  readonly permissions = ["moderator:read:automod_settings"];
  
  constructor(...args: ((arg: AutomodSettingsUpdateEvent) => void)[]) {
    super(args);
  }
}
