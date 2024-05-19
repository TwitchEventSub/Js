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

interface BaseBroadcaster {
    /** The requested broadcaster ID. */
    broadcaster_user_id: string;
    /** The requested broadcaster login. */
    broadcaster_user_login: string;
    /** The requested broadcaster display name. */
    broadcaster_user_name: string;
}

interface BaseUser {
  /** The user ID in specified channel. */
  user_id: string;
  /** The user login in specified channel. */
  user_login: string;
  /** The user display name in specified channel. */
  user_name: string;
}

interface BaseModerator {
  /** The ID of the moderator. */
  moderator_user_id: string;
  /** TThe moderator’s user name. */
  moderator_user_name: string;
  /** The login of the moderator. */
  moderator_user_login: string;
}

export interface ChannelFollowEvent extends BaseBroadcaster, BaseUser {
    /** RFC3339 timestamp of when the follow occurred. */
    followed_at: string;
}

export type ChannelFollowSubscription = BaseSubscription<ChannelFollowEvent, "channel.follow">;

export type ChannelModeratorRemoveEvent = BaseBroadcaster & BaseUser;

export type ChannelModeratorRemoveSubscription = BaseSubscription<ChannelModeratorRemoveEvent, "channel.moderator.remove">;

interface BaseMessageEvent extends BaseBroadcaster {
  /** A UUID that identifies the message. */
  message_id: string;
}

export interface AutomodMessageHoldEvent extends BaseMessageEvent, BaseUser {
  /** The body of the message. */
  message: {
    /** The contents of the message caught by automod. */
    text: string;
    /** Metadata surrounding the potential inappropriate fragments of the message. */
    fragments: {
      /** Message text in a fragment. */
      text: string;
      /** Metadata pertaining to the emote. */
      emote?: {
        /** An ID that uniquely identifies this emote. */
        id: string;
        /** An ID that identifies the emote set that the emote belongs to. */
        emote_set_id: string;
      }
      /** Metadata pertaining to the cheermote. */
      cheermote?: {
        /**
         * The name portion of the Cheermote string that you use in chat to cheer Bits.
         * The full Cheermote string is the concatenation of {prefix} + {number of Bits}.
         * 
         * For example, if the prefix is “Cheer” and you want to cheer 100 Bits, the full Cheermote string is Cheer100.
         * When the Cheermote string is entered in chat,
         * Twitch converts it to the image associated with the Bits tier that was cheered.
         */
        prefix: string;
        /** The amount of bits cheered. */
        bits: number;
        /** The tier level of the cheermote. */
        tier: number;
      }
    }[];
    /** The category of the message. */
    category: string;
    /** The level of severity. */
    level: 1 | 2 | 3 | 4;
    /** The timestamp of when automod saved the message. */
    held_at: string;
  };
}

export type AutomodMessageHoldSubscription = BaseSubscription<AutomodMessageHoldEvent, "automod.message.hold">;

export interface AutomodMessageHoldUpdateEvent extends AutomodMessageHoldEvent, BaseModerator {
  /** The message’s status. */
  status: "Approved" | "Denied" | "Expired";
}

export type AutomodMessageHoldUpdateSubscription = BaseSubscription<AutomodMessageHoldUpdateEvent, "automod.message.update">;

export type EventItem = ChannelFollowSubscription
| ChannelModeratorRemoveSubscription
| AutomodMessageHoldSubscription
| AutomodMessageHoldUpdateSubscription;
