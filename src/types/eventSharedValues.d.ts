export interface BaseBroadcaster {
  /** The requested broadcaster ID. */
  broadcaster_user_id: string;
  /** The requested broadcaster login. */
  broadcaster_user_login: string;
  /** The requested broadcaster display name. */
  broadcaster_user_name: string;
}

export interface BaseUser {
/** The user ID in specified channel. */
user_id: string;
/** The user login in specified channel. */
user_login: string;
/** The user display name in specified channel. */
user_name: string;
}

export interface BaseModerator {
/** The ID of the moderator. */
moderator_user_id: string;
/** TThe moderator’s user name. */
moderator_user_name: string;
/** The login of the moderator. */
moderator_user_login: string;
}
