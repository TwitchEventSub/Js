interface SubscriptionType {
  readonly type: string;
  readonly version: string;
  readonly permissions: string[];
}

export type EventIndex = number;

export interface BaseEventManagement<T> {
  addEventListener: (arg: (arg: T) => void) => EventIndex;
  removeEventListener: (arg: EventIndex | ((arg: T) => void)) => void;
  dispatchEvent: (arg: T) => void;
}

export type  BaseSubscription<E, T extends string> = BaseEventManagement<E>
  & Omit<SubscriptionType, "type">
  & { readonly type: T };


export interface ChannelFollowEvent {
    /** The user ID for the user now following the specified channel. */
    user_id: string;
    /** The user login for the user now following the specified channel. */
    user_login: string;
    /** The user display name for the user now following the specified channel. */
    user_name: string;
    /** The requested broadcaster ID. */
    broadcaster_user_id: string;
    /** The requested broadcaster login. */
    broadcaster_user_login: string;
    /** The requested broadcaster display name. */
    broadcaster_user_name: string;
    /** RFC3339 timestamp of when the follow occurred. */
    followed_at: string;
}

export type ChannelFollowSubscription = BaseSubscription<ChannelFollowEvent, "channel.follow">;

export interface ChannelModeratorRemoveEvent {
  /** The requested broadcaster ID. */
  broadcaster_user_id: string;
  /** The requested broadcaster login. */
  broadcaster_user_login: string;
  /** The requested broadcaster display name. */
  broadcaster_user_name: string;
  /** The user ID of the removed moderator. */
  user_id: string;
  /** The user login of the removed moderator. */
  user_login: string;
  /** The display name of the removed moderator. */
  user_name: string;
}

export type ChannelModeratorRemoveSubscription = BaseSubscription<ChannelModeratorRemoveEvent, "channel.moderator.remove">;

export type EventItem = ChannelFollowSubscription
| ChannelModeratorRemoveSubscription;
