import {
  UserAuthorizationRevokeEvent,
  UserAuthorizationRevokeSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";

export default class UserAuthorizationRevoke extends BaseEvent<UserAuthorizationRevokeEvent> implements UserAuthorizationRevokeSubscription {
  readonly type = "user.authorization.revoke";
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
  
  constructor(...args: ((arg: UserAuthorizationRevokeEvent) => void)[]) {
    super(args);
  }
}
