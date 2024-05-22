import { AddPrefix } from "./utilTypes";

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

interface BaseAutomodMessageHoldFragment {
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
}

export interface AutomodMessageHoldEvent extends BaseMessageEvent, BaseUser {
  /** The body of the message. */
  message: {
    /** The contents of the message caught by automod. */
    text: string;
    /** Metadata surrounding the potential inappropriate fragments of the message. */
    fragments: BaseAutomodMessageHoldFragment[];
    /** The category of the message. */
    category: string;
    /** The level of severity. */
    level: 1 | 2 | 3 | 4;
    /** The timestamp of when automod saved the message. */
    held_at: string;
  }[];
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

interface BaseChatter {
  /** The user ID of the user that sent the message. */
  chatter_user_id: string;
  /** The user name of the user that sent the message. */
  chatter_user_name: string;
  /** The user login of the user that sent the message. */
  chatter_user_login: string;
  /** The color of the user’s name in the chat room. */
  color: "" | `#${string}`;
}

interface ChatterBadge {
  /**An ID that identifies this set of chat badges. For example, Bits or Subscriber. */
  set_id: string;
  /** An ID that identifies this version of the badge. */
  id: string;
  /** Contains metadata related to the chat badges in the badges tag. */
  info: string;
}

export interface ChannelChatMessageEvent extends BaseMessageEvent, BaseChatter {
  /** The structured chat message. */
  message: {
    /** The chat message in plain text. */
    text: string;
    /** Ordered list of chat message fragments. */
    fragments: MessageFragment[];
  },
  /** The type of message. */
  message_type: "text" | "channel_points_highlighted" | "channel_points_sub_only" | "user_intro";
  /** List of chat badges. */
  badges: ChatterBadge[];
  /** Metadata if this message is a cheer. */
  cheer?: {
    /** The amount of Bits the user cheered. */
    bits: number;
  }
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
  channel_points_custom_reward_id?: string;
}

export type ChannelChatMessageSubscription = BaseSubscription<ChannelChatMessageEvent, "channel.chat.message">;

export interface ChannelChatMessageDeleteEvent extends BaseMessageEvent {
  /** The ID of the user whose message was deleted. */
  target_user_id: string;
  /** The user name of the user whose message was deleted. */
  target_user_name: string;
  /** The user login of the user whose message was deleted. */
  target_user_login: string;
}

export type ChannelChatMessageDeleteSubscription = BaseSubscription<ChannelChatMessageDeleteEvent, "channel.chat.message_delete">;

interface BaseChannelChatNotificationEvent extends BaseMessageEvent, BaseChatter {
  /** Whether or not the chatter is anonymous. */
  chatter_is_anonymous: boolean;
  /** List of chat badges. */
  badges: ChatterBadge[];
  /** The message Twitch shows in the chat room for this notice. */
  system_message: string;
  /** The structured chat message. */
  message: {
    /** The chat message in plain text. */
    text: string;
    /** Ordered list of chat message fragments. */
    fragments: MessageFragment[];
  },
}

type SubType = "1000" | "2000" | "3000";

interface BaseChannelChatNotificationSub {
  /** The type of subscription plan being used. */
  sub_tier: SubType;
  /** The number of months the subscription is for. */
  duration_months: number;
}

interface ChannelChatNotificationSub {
  /** The type of notice */
  message_type: "sub";
  /** Information about the sub event. */
  sub: BaseChannelChatNotificationSub & {
    /** Indicates if the subscription was obtained through Amazon Prime. */
    is_prime: boolean;
  }
}

interface ChannelChatNotificationResubSubGift {
  /** Whether or not the resub was a result of a gift. */
  is_gift: true;
  /** Whether or not the gift was anonymous. */
  gifter_is_anonymous: boolean;
  /** The user ID of the subscription gifter. */
  gifter_user_id: string;
  /** The user name of the subscription gifter. */
  gifter_user_name: string;
  /** The user login of the subscription gifter. */
  gifter_user_login: string;
}

type ChannelChatNotificationResubNonSubGift = Omit<{ [K in keyof ChannelChatNotificationResubSubGift]: null }, "is_gift"> & { is_gift: false };

interface ChannelChatNotificationResub {
  message_type: "resub";
  resub: BaseChannelChatNotificationSub
  & ( ChannelChatNotificationResubSubGift | ChannelChatNotificationResubNonSubGift )
  & {
    /** The total number of months the user has subscribed. */
    cumulative_months: number;
    /** The total number of months the user has subscribed. */
    streak_months: number;
    /** Indicates if the subscription was obtained through Amazon Prime. */
    is_prime?: boolean;
  }
}

interface ChannelChatNotificationSubGift {
  message_type: "sub_gift";
  sub_gift: BaseChannelChatNotificationSub
  & {
    /** The amount of gifts the gifter has given in this channel. Null if anonymous. */
    cumulative_total?: number;
    /** The user ID of the subscription gift recipient. */
    recipient_user_id: string;
    /** The user name of the subscription gift recipient. */
    recipient_user_name: string;
    /** The user login of the subscription gift recipient. */
    recipient_user_login: string;
    /** The ID of the associated community gift. Null if not associated with a community gift. */
    community_gift_id?: string;
  }
}

interface ChannelChatNotificationCommunitySubGift {
  message_type: "community_sub_gift";
  community_sub_gift: BaseChannelChatNotificationSub & {
    /** The ID of the associated community gift. */
    id: string;
    /** Number of subscriptions being gifted. */
    total: number;
    /** The amount of gifts the gifter has given in this channel. Null if anonymous. */
    cumulative_total: number;
  }
}

interface ChannelChatNotificationGiftPaidUpgradeNonAnonnymous {
  /** Whether the gift was given anonymously. */
  gifter_is_anonymous: false;
  /** The user ID of the user who gifted the subscription. */
  gifter_user_id: string;
  /** The user name of the user who gifted the subscription. */
  gifter_user_name: string;
  /** The user login of the user who gifted the subscription. */
  gifter_user_login: string;
}

type ChannelChatNotificationGiftPaidUpgradeAnonnymous = Omit<{ [K in keyof ChannelChatNotificationGiftPaidUpgradeNonAnonnymous]: null }, "gifter_is_anonymous"> & { gifter_is_anonymous: true };

interface ChannelChatNotificationGiftPaidUpgrade {
  message_type: "gift_paid_upgrade";
  gift_paid_upgrade: ChannelChatNotificationGiftPaidUpgradeNonAnonnymous | ChannelChatNotificationGiftPaidUpgradeAnonnymous;
}

interface ChannelChatNotificationPrimePaidUpgrade {
  message_type: "prime_paid_upgrade";
  /** Information about the Prime gift paid upgrade event. */
  prime_paid_upgrade: {
    sub_tier: SubType;
  };
}

interface ChannelChatNotificationRaid {
  message_type: "raid";
  /** Information about the raid event. */
  raid: {
    /** The user ID of the broadcaster raiding this channel. */
    user_id: string;
    /** The user name of the broadcaster raiding this channel. */
    user_name: string;
    /** The user login of the broadcaster raiding this channel. */
    user_login: string;
    /** The number of viewers raiding this channel from the broadcaster’s channel. */
    viewer_count: number;
    /** Profile image URL of the broadcaster raiding this channel. */
    profile_image_url: string;
  }
}

interface ChannelChatNotificationUnraid {
  message_type: "unraid";
  /** Returns an empty payload */
  unraid: Record<never, never>;
}

interface ChannelChatNotificationPayItForward {
  message_type: "pay_it_forward";
  /** Information about the pay it forward event. */
  pay_it_forward: ChannelChatNotificationGiftPaidUpgradeNonAnonnymous | ChannelChatNotificationGiftPaidUpgradeAnonnymous;
}

interface ChannelChatNotificationAnnouncement {
  message_type: "announcement";
  /** Information about the announcement event. */
  announcement: {
    /** Color of the announcement. */
    color: string;
  }
}

interface ChannelChatNotificationBitsBadgeTier {
  message_type: "bits_badge_tier";
  /** Information about the bits badge tier event. */
  bits_badge_tier: {
    /** The tier of the Bits badge the user just earned. */
    tier: number;
  }
}

interface ChannelChatNotificationCharityDonation {
  message_type: "charity_donation";
  /** Information about the charity donation event. */
  charity_donation: {
    /** Name of the charity. */
    charity_name: string;
    /** An object that contains the amount of money that the user paid. */
    amount: {
      /** The monetary amount. The amount is specified in the currency’s minor unit.
       * 
       * For example, the minor units for USD is cents, so if the amount is $5.50 USD, value is set to 550.
       */
      value: number;
      /** The number of decimal places used by the currency.
       * 
       * For example, USD uses two decimal places.
       */
      decimal_place: number;
      /**
       * The ISO-4217 three-letter currency code that identifies the type of currency in value.
       * 
       * @link https://www.iso.org/iso-4217-currency-codes.html
       */
      currency: string;
    }
  }

}

export type ChannelChatNotificationEvent = BaseChannelChatNotificationEvent
& (
  ChannelChatNotificationSub
  | ChannelChatNotificationResub
  | ChannelChatNotificationSubGift
  | ChannelChatNotificationCommunitySubGift
  | ChannelChatNotificationGiftPaidUpgrade
  | ChannelChatNotificationPrimePaidUpgrade
  | ChannelChatNotificationRaid
  | ChannelChatNotificationUnraid
  | ChannelChatNotificationPayItForward
  | ChannelChatNotificationAnnouncement
  | ChannelChatNotificationBitsBadgeTier
  | ChannelChatNotificationCharityDonation
);

export type ChannelChatNotificationSubscription = BaseSubscription<ChannelChatNotificationEvent, "channel.chat.notification">;

interface ChannelChatSettingUpdateFollowerMode {
  /** A Boolean value that determines whether the broadcaster restricts the chat room to followers only, based on how long they’ve followed. */
  follower_mode: true;
  /** The length of time, in minutes, that the followers must have followed the broadcaster to participate in the chat room. */
  follower_mode_duration_minutes: number;
}

type ChannelChatSettingUpdateFollowerModeOff = Omit<{ [K in keyof ChannelChatSettingUpdateFollowerMode]: null }, "follower_mode"> & { follower_mode: false };

type ChannelChatSettingUpdateFollower = ChannelChatSettingUpdateFollowerMode | ChannelChatSettingUpdateFollowerModeOff;

interface ChannelChatSettingUpdateSlowMode {
  /** A Boolean value that determines whether the broadcaster limits how often users in the chat room are allowed to send messages. */
  slow_mode: true;
  /** The amount of time, in seconds, that users need to wait between sending messages. */
  slow_mode_wait_time_seconds: number;
}

type ChannelChatSettingUpdateSlowModeOff = Omit<{ [K in keyof ChannelChatSettingUpdateSlowMode]: null }, "slow_mode"> & { slow_mode: false };

type ChannelChatSettingUpdateSlow = ChannelChatSettingUpdateSlowMode | ChannelChatSettingUpdateSlowModeOff;

export interface ChannelChatSettingUpdateEvent extends BaseBroadcaster, ChannelChatSettingUpdateFollower, ChannelChatSettingUpdateSlow {
  /** A Boolean value that determines whether chat messages must contain only emotes. */
  emote_mode: boolean;
  /** A Boolean value that determines whether only users that subscribe to the broadcaster’s channel can talk in the chat room. */
  subscriber_mode: boolean;
  /** A Boolean value that determines whether the broadcaster requires users to post only unique messages in the chat room. */
  unique_chat_mode: boolean;
}

export type ChannelChatSettingUpdateSubscription = BaseSubscription<ChannelChatSettingUpdateEvent, "channel.chat_settings.update">;

export interface ChannelChatUserMessageHoldEvent extends BaseMessageEvent {
  /** The User ID of the message sender. */
  user_id: string;
  /** The message sender’s login. */
  user_login: string;
  /** The message sender’s display name. */
  user_name: string;
  /** The body of the message. */
  message: {
    /** The contents of the message caught by automod. */
    text: string;
    /** Ordered list of chat message fragments. */
    fragments: BaseAutomodMessageHoldFragment[];
  }
}

export type ChannelChatUserMessageHoldSubscription = BaseSubscription<ChannelChatUserMessageHoldEvent, "channel.chat.user_message_hold">;

export interface ChannelChatUserMessageUpdateEvent extends ChannelChatUserMessageHoldEvent {
  /** The message’s status */
  status: "approved" | "denied" | "invalid";
}

export type ChannelChatUserMessageUpdateSubscription = BaseSubscription<ChannelChatUserMessageUpdateEvent, "channel.chat.user_message_update">;

export interface ChannelSubscribeEvent extends BaseBroadcaster, BaseUser {
  /** The tier of the subscription. */
  tier: SubType;
  /** Whether the subscription is a gift. */
  is_gift: boolean;
}

export type ChannelSubscribeSubscription = BaseSubscription<ChannelSubscribeEvent, "channel.subscribe">;

export type ChannelSubscribeEndSubscription = BaseSubscription<ChannelSubscribeEvent, "channel.subscription.end">;

interface BaseChannelSubscriptionGiftEvent extends BaseUser {
  /** Whether the subscription gift was anonymous. */
  is_anonymous: false;
}

type ChannelSubscriptionGiftAnonnymous = Omit<{ [K in keyof BaseChannelSubscriptionGiftEvent]: null }, "is_anonymous"> & { is_anonymous: true };

type ChannelSubscriptionGiftSpec = BaseChannelSubscriptionGiftEvent | ChannelSubscriptionGiftAnonnymous;

export interface ChannelSubscriptionGiftEvent extends ChannelSubscriptionGiftSpec {
  /** The number of subscriptions in the subscription gift. */
  total: number;
  /** The tier of subscriptions in the subscription gift. */
  tier: SubType;
  /** The number of subscriptions gifted by this user in the channel. This value is null for anonymous gifts or if the gifter has opted out of sharing this information. */
  cumulative_total: number | null;
}

export type ChannelSubscriptionGiftSubscription = BaseSubscription<ChannelSubscriptionGiftEvent, "channel.subscription.gift">;

interface TwitchEmote {
  /** The index of where the Emote starts in the text. */
  begin: number;
  /** The index of where the Emote ends in the text. */
  end: number;
  /** The emote ID. */
  id: string;
}

interface TwitchMessage {
  /** The text of the resubscription chat message. */
  text: string;
  /** An array that includes the emote ID and start and end positions for where the emote appears in the text. */
  emotes: TwitchEmote[];
}

export interface ChannelSubscriptionMessageEvent extends BaseBroadcaster, BaseUser {
  /** The tier of the user’s subscription. */
  tier: SubType;
  /** An object that contains the resubscription message and emote information needed to recreate the message. */
  message: TwitchMessage;
  /** The total number of months the user has been subscribed to the channel. */
  cumulative_months: number;
  /** The number of consecutive months the user’s current subscription has been active. This value is `null` if the user has opted out of sharing this information. */
  streak_months: number | null;
  /** The month duration of the subscription. */
  duration_months: number;
}

export type ChannelSubscriptionMessageSubscription = BaseSubscription<ChannelSubscriptionMessageEvent, "channel.subscription.message">;

export interface ChannelCheerEvent extends BaseBroadcaster, ChannelSubscriptionGiftSpec {
  /** The message sent with the cheer. */
  message: string;
  /** The number of bits cheered. */
  bits: number;
}

export type ChannelCheerSubscription = BaseSubscription<ChannelCheerEvent, "channel.cheer">;


export interface ChannelRaidEvent extends AddPrefix<BaseBroadcaster, "from_">, AddPrefix<BaseBroadcaster, "to_"> {
  /** The number of viewers in the raid. */
  viewers: number;
}

export type ChannelRaidSubscription = BaseSubscription<ChannelRaidEvent, "channel.raid">;

interface ChannelBanTimeLimited {
  /** The UTC date and time (in RFC3339 format) of when the timeout ends. */
  ends_at: string;
  is_permanent: false;
}

type ChannelBanPermanent = Omit<{ [K in keyof ChannelBanTimeLimited]: null }, "is_permanent"> & { is_permanent: true };

type ChannelBanPermanence = ChannelBanTimeLimited | ChannelBanPermanent;

export interface ChannelBanEvent extends BaseBroadcaster, BaseModerator, BaseUser, ChannelBanPermanence {
  /** The reason behind the ban. */
  reason: string;
  /** The UTC date and time (in RFC3339 format) of when the user was banned or put in a timeout. */
  banned_at: string;
}

export type ChannelBanSubscription = BaseSubscription<ChannelBanEvent, "channel.ban">;

export type ChannelUnbanEvent = BaseBroadcaster & BaseModerator & BaseUser;

export type ChannelUnbanSubscription = BaseSubscription<ChannelUnbanEvent, "channel.unban">;

export interface ChannelUnbanRequestCreateEvent extends BaseBroadcaster, BaseUser {
  /** The ID of the unban request. */
  id: string;
  /** Message sent in the unban request. */
  text: string;
  /** The UTC timestamp (in RFC3339 format) of when the unban request was created. */
  created_at: string;
}

export type ChannelUnbanRequestCreateSubscription = BaseSubscription<ChannelUnbanRequestCreateEvent, "channel.unban_request.create">;

export type EventItem = ChannelFollowSubscription
| ChannelModeratorRemoveSubscription
| AutomodMessageHoldSubscription
| AutomodMessageHoldUpdateSubscription
| AutomodSettingsUpdateSubscription
| AutomodTermsUpdateSubscription
| ChannelAdBreakBeginSubscription
| ChannelChatClearSubscription
| ChannelChatClearUserMessageSubscription
| ChannelChatMessageSubscription
| ChannelChatMessageDeleteSubscription
| ChannelChatNotificationSubscription
| ChannelChatSettingUpdateSubscription
| ChannelChatUserMessageHoldSubscription
| ChannelChatUserMessageUpdateSubscription
| ChannelSubscribeSubscription
| ChannelSubscribeEndSubscription
| ChannelSubscriptionGiftSubscription
| ChannelSubscriptionMessageSubscription
| ChannelCheerSubscription
| ChannelRaidSubscription
| ChannelBanSubscription
| ChannelUnbanSubscription
| ChannelUnbanRequestCreateSubscription;
