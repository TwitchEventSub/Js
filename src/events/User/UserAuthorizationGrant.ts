import {
  UserAuthorizationGrantEvent,
  UserAuthorizationGrantSubscription,
} from "../../types/events";
import BaseEvent from "../../util/BaseEvent";

export default class UserAuthorizationGrant extends BaseEvent<UserAuthorizationGrantEvent> implements UserAuthorizationGrantSubscription {
  readonly type = "user.authorization.grant";
  readonly version = "1";

  get channel() {
    return [];
  }

  get permissions() {
    return (_tokenPermissions: string[]) => [];
  }

  get condition() {
    return () => {
      return undefined;
    };
  }
  
  constructor(...args: ((arg: UserAuthorizationGrantEvent) => void)[]) {
    super(args);
  }
}
