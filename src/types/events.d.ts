interface SubscriptionType {
  readonly type: string;
  readonly version: string;
  readonly permissions: string[];
  readonly broadcasterOnly?: true;
}

interface SubscriptionProperties {
  get channel(): string[];
  get condition(): ((...args: string[]) => Record<string, string>);
}

export type EventIndex = number;

export interface BaseEventManagement<T> {
  addEventListener: (arg: (arg: T) => void) => EventIndex;
  removeEventListener: (arg: EventIndex | ((arg: T) => void)) => void;
  dispatchEvent: (arg: T) => void;
}

export type  BaseSubscription<E, T extends string> = BaseEventManagement<E>
  & Omit<SubscriptionType, "type">
  & SubscriptionProperties
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

export interface AutomodSettingsUpdateEvent extends BaseBroadcaster, BaseModerator {
  /** The Automod level for hostility involving name calling or insults. */
  bullying: number;
  /** The default AutoMod level for the broadcaster. This field is null if the broadcaster has set one or more of the individual settings. */
  overall_level: number | null;
  /** The Automod level for discrimination against disability. */
  disability: number;
  /** The Automod level for racial discrimination. */
  race_ethnicity_or_religion: number;
  /** The Automod level for discrimination against women. */
  misogyny: number;
  /** The AutoMod level for discrimination based on sexuality, sex, or gender. */
  sexuality_sex_or_gender: number;
  /** The Automod level for hostility involving aggression. */
  aggression: number;
  /** The Automod level for sexual content. */
  sex_based_terms: number;
  /** The Automod level for profanity. */
  swearing: number;
}

export type AutomodSettingsUpdateSubscription = BaseSubscription<AutomodSettingsUpdateEvent, "automod.settings.update">;

export interface AutomodTermsUpdateEvent extends BaseBroadcaster, BaseModerator {
  /** The status change applied to the terms. */
  action: "add_permitted" | "add_blocked" | "remove_permitted" | "remove_blocked";
  /** Indicates whether this term was added due to an Automod message approve/deny action. */
  from_automod: boolean;
  /** The list of terms that had a status change. */
  terms: string[];
}

export type AutomodTermsUpdateSubscription = BaseSubscription<AutomodTermsUpdateEvent, "automod.terms.update">;

export interface ChannelUpdateEvent extends BaseBroadcaster {
  /** The channel’s stream title. */
  title: string;
  /** The channel’s broadcast language. */
  language: string;
  /** The channel’s category ID. */
  category_id: string;
  /** The category name. */
  category_name: string;
  /**
   * Array of content classification label IDs currently applied on the Channel.
   * To retrieve a list of all possible IDs, use the Get Content Classification Labels API endpoint.
   * @link https://dev.twitch.tv/docs/api/reference/#get-content-classification-labels
   */
  content_classification_labels: string[];
}

export type ChannelUpdateSubscription = BaseSubscription<ChannelUpdateEvent, "channel.update">;

export interface ChannelAdBreakBeginEvent extends BaseBroadcaster {
  /** Length in seconds of the mid-roll ad break requested */
  duration_seconds: number;
  /** The UTC timestamp of when the ad break began, in RFC3339 format. */
  started_at: string;
  /** Indicates if the ad was automatically scheduled via Ads Manager */
  is_automatic: boolean;
  /** The ID of the user that requested the ad. For automatic ads, this will be the ID of the broadcaster. */
  requester_user_id: string;
  /** The login of the user that requested the ad. */
  requester_user_login: string;
  /** The display name of the user that requested the ad. */
  requester_user_name: string;
}

export type ChannelAdBreakBeginSubscription = BaseSubscription<ChannelAdBreakBeginEvent, "channel.ad_break.begin">;

export type ChannelChatClearEvent = BaseBroadcaster;

export type ChannelChatClearSubscription = BaseSubscription<ChannelChatClearEvent, "channel.chat.clear">;

export interface ChannelChatClearUserMessageEvent extends BaseBroadcaster {
  /** The ID of the user that was banned or put in a timeout. All of their messages are deleted. */
  target_user_id: string;
  /** The user name of the user that was banned or put in a timeout. */
  target_user_name: string;
  /** The user login of the user that was banned or put in a timeout. */
  target_user_login: string;
}

export type ChannelChatClearUserMessageSubscription = BaseSubscription<ChannelChatClearUserMessageEvent, "channel.chat.clear_user_messages">;

interface BaseMessageFragment {
  /** Message text in fragment. */
  text: string;
}

export interface TextMessageFragment extends BaseMessageFragment {
  type: "text";
}

export interface CheermoteMessageFragment extends BaseMessageFragment {
  type: "cheermote";
  cheermote: {
    /** The name portion of the Cheermote string that you use in chat to cheer Bits.  */
    prefix: string;
    /** The amount of bits cheered. */
    bits: number;
    /** The tier level of the cheermote. */
    tier: number;
  }
}

export interface EmoteMessageFragment extends BaseMessageFragment {
  type: "emote";
  emote: {
    /** An ID that uniquely identifies this emote. */
    id: string;
    /** An ID that identifies the emote set that the emote belongs to. */
    emote_set_id: string;
    /** The ID of the broadcaster who owns the emote. */
    owner_id: string;
    /** The formats that the emote is available in.  */
    format: "animated" | "static";
  }
}

export interface MentionMessageFragment extends BaseMessageFragment {
  type: "mention";
  mention: {
    /** The user ID of the mentioned user. */
    user_id: string;
    /** The user name of the mentioned user. */
    user_name: string;
    /** The user login of the mentioned user. */
    user_login: string;
  }
}

export type MessageFragment = TextMessageFragment | CheermoteMessageFragment | EmoteMessageFragment | MentionMessageFragment;

export interface ChannelChatMessageEvent extends BaseMessageEvent {
  /** The user ID of the user that sent the message. */
  chatter_user_id: string;
  /** The user name of the user that sent the message. */
  chatter_user_name: string;
  /** The user login of the user that sent the message. */
  chatter_user_login: string;
  /** The structured chat message. */
  message: MessageFragment[],
  /** The type of message. */
  message_type: "text" | "channel_points_highlighted" | "channel_points_sub_only" | "user_intro";
  /** List of chat badges. */
  badges: {
    /**An ID that identifies this set of chat badges. For example, Bits or Subscriber. */
    set_id: string;
    /** An ID that identifies this version of the badge. */
    id: string;
    /** Contains metadata related to the chat badges in the badges tag. */
    info: string;
  }[];
  /** Metadata if this message is a cheer. */
  cheer?: {
    /** The amount of Bits the user cheered. */
    bits: number;
  }
  /** The color of the user’s name in the chat room. */
  color: "" | `#${string}`;
  /** Metadata if this message is a reply. */
  reply?: {
    /** An ID that uniquely identifies the parent message that this message is replying to. */
    parent_message_id: string;
    /** The message body of the parent message. */
    parent_message_body: string;
    /** User ID of the sender of the parent message. */
    parent_user_id: string;
    /** User name of the sender of the parent message. */
    parent_user_name: string;
    /** User login of the sender of the parent message. */
    parent_user_login: string;
    /** An ID that identifies the parent message of the reply thread. */
    thread_message_id: string;
    /** User ID of the sender of the thread’s parent message. */
    thread_user_id: string;
    /** User name of the sender of the thread’s parent message. */
    thread_user_name: string;
    /** User login of the sender of the thread’s parent message. */
    thread_user_login: string;
  }
  /** The ID of a channel points custom reward that was redeemed. */
  channel_points_custom_reward_id: string;
}

export type ChannelChatMessageSubscription = BaseSubscription<ChannelChatMessageEvent, "channel.chat.message">;

export type EventItem = ChannelFollowSubscription
| ChannelModeratorRemoveSubscription
| AutomodMessageHoldSubscription
| AutomodMessageHoldUpdateSubscription
| AutomodSettingsUpdateSubscription
| AutomodTermsUpdateSubscription
| ChannelAdBreakBeginSubscription
| ChannelChatClearSubscription
| ChannelChatClearUserMessageSubscription
| ChannelChatMessageSubscription;
