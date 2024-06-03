import {
  UserAuthorizationGrantEvent,
  UserAuthorizationGrantSubscription,
} from "../../types/events";
import BaseEvent from "../../util/BaseEvent";

export default class UserAuthorizationGrant extends BaseEvent<UserAuthorizationGrantEvent> implements UserAuthorizationGrantSubscription {
  readonly type = "user.authorization.grant";
  readonly version = "1";
  readonly permissions = [];

  get channel() {
    return [];
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
