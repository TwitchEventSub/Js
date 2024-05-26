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

interface MonetaryNotation {
  /** The monetary amount. The amount is specified in the currency’s minor unit.
       * 
       * For example, the minor units for USD is cents, so if the amount is $5.50 USD, value is set to 550.
       */
  value: number;
  /** The number of decimal places used by the currency.
   * 
   * For example, USD uses two decimal places.
   * 
   * example formula:
   * `value / 10^decimal_places`
   */
  decimal_place: number;
  /**
   * The ISO-4217 three-letter currency code that identifies the type of currency in value.
   * 
   * @link https://www.iso.org/iso-4217-currency-codes.html
   */
  currency: string;
}

interface ChannelChatNotificationCharityDonation {
  message_type: "charity_donation";
  /** Information about the charity donation event. */
  charity_donation: {
    /** Name of the charity. */
    charity_name: string;
    /** An object that contains the amount of money that the user paid. */
    amount: MonetaryNotation
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

export interface ChannelUnbanRequestResolveEvent extends BaseBroadcaster, BaseModerator, BaseUser {
  /** The ID of the unban request. */
  id: string;
  /** Resolution text supplied by the mod/broadcaster upon approval/denial of the request. */
  resolution_text?: string;
  /** Dictates whether the unban request was approved or denied. */
  status: "approved" | "canceled" | "denied";
}

export type ChannelUnbanRequestResolveSubscription = BaseSubscription<ChannelUnbanRequestResolveEvent, "channel.unban_request.resolve">;

interface ChannelModerateBan {
  action: "ban";
  ban: BaseUser & {
    /** Reason given for the ban. */
    reason?: string;
  }
}

interface ChannelModerateTimeout {
  action: "timeout";
  /** Metadata associated with the timeout command. */
  timeout: BaseUser & {
    /** The time at which the timeout ends. */
    expires_at: string;
    /** Reason given for the timeout. */
    reason?: string;
  }
}

interface ChannelModerateUnban {
  action: "unban";
  /** Metadata associated with the unban command. */
  unban: BaseUser;
}

interface ChannelModerateUntimeout {
  action: "untimeout";
  /** Metadata associated with the untimeout command. */
  untimeout: BaseUser;
}

interface ChannelModerateFollowers {
  action: "followers";
  /** Metadata associated with the followers command. */
  followers: {
    /** The length of time, in minutes, that the followers must have followed the broadcaster to participate in the chat room. */
    follow_duration_minutes: number;
  }
}

interface ChannelModerateSlow {
  action: "slow";
  /** Metadata associated with the slow command. */
  slow: {
    /** The amount of time, in seconds, that users need to wait between sending messages. */
    wait_time_seconds: number;
  }
}

interface ChannelModerateUnraid {
  action: "unraid";
  /** Metadata associated with the unraid command. */
  unraid: BaseUser;
}

interface ChannelModerateDelete {
  action: "delete";
  /** Metadata associated with the delete command. */
  delete: BaseUser & {
    /** The ID of the message being deleted. */
    message_id: string;
    /** The message body of the message being deleted. */
    message_body: string;
  }
}
type ChannelModerateMainAction = "" | "un";

interface ChannelModerateVipSpec<A extends ChannelModerateMainAction> {
  action: `${A}vip`;
  vip: BaseUser;
}

type ChannelModerateVip = {
  [A in ChannelModerateMainAction]: ChannelModerateVipSpec<A>
}[ChannelModerateMainAction];

interface ChannelModerateRaid {
  action: "raid";
  raid: BaseUser & {
    /** The number of viewers in the raid. */
    viewers: number;
  }
}

type ChannelModerateTermSpecList = "blocked" | "permitted";
type ChannelModerateTermSpecAction = "add" | "remove";

interface BaseChannelModerateTermSpec<A extends ChannelModerateTermSpecAction, L extends ChannelModerateTermSpecList> {
  action: `${A}_${L}_term`;
  automod_terms: {
    action: A;
    list: L;
    terms: string[];
    /** Whether the terms were added due to an Automod message approve/deny action. */
    from_automod: boolean;
  }
}

type ChannelModerateTermSpec = {
  [A in ChannelModerateTermSpecAction]: {
    [L in ChannelModerateTermSpecList]: BaseChannelModerateTermSpec<A, L>
  }[ChannelModerateTermSpecList]
}[ChannelModerateTermSpecAction];

interface ChannelModerateModSpec<A extends ChannelModerateMainAction> {
  action: `${A}mod`;
  [`${A}mod`]: BaseUser;
}

type ChannelModerateSpec = { [A in ChannelModerateMainAction]: ChannelModerateModSpec<A> }[ChannelModerateMainAction];

type ChannelModerateApproval = "approve" | "deny";

interface ChannelModerateUnbanRequestSpec<A extends ChannelModerateApproval> {
  action: `${A}_unban_request`;
  unban_request: BaseUser & {
    /** Whether or not the unban request was approved or denied. */
    is_approved: A extends "approve" ? true : false;
    moderator_message: string;
  }
}

type ChannelModerateUnbanRequest = {
  [A in ChannelModerateApproval]: ChannelModerateUnbanRequestSpec<A>
}[ChannelModerateApproval];

interface ChannelModerateTypeless {
  action: "clear" | "emoteonly" | "emoteonlyoff" | "followersoff" | "uniquechat" | "uniquechatoff" | "slowoff" | "subscribers" | "subscribersoff" | "unraid";
}

type BaseChannelModerateSpec = ChannelModerateBan
| ChannelModerateTimeout
| ChannelModerateUnban
| ChannelModerateUntimeout
| ChannelModerateFollowers
| ChannelModerateSlow
| ChannelModerateUnraid
| ChannelModerateDelete
| ChannelModerateVip
| ChannelModerateRaid
| ChannelModerateTermSpec
| ChannelModerateSpec
| ChannelModerateUnbanRequest
| ChannelModerateTypeless;

export type ChannelModerateEvent = BaseChannelModerateSpec & BaseBroadcaster & BaseModerator;

export type ChannelModerateSubscription = BaseSubscription<ChannelModerateEvent, "channel.moderate">;

export type ChannelModeratorAddEvent = BaseBroadcaster & BaseUser;

export type ChannelModeratorAddSubscription = BaseSubscription<ChannelModeratorAddEvent, "channel.moderator.add">;

// ChannelPointsAutomaticRewardRedemption

interface ChannelPointsAutomaticRewardRedemptionUnlockEmote {
  type: "random_sub_emote_unlock" | "chosen_sub_emote_unlock"
}

interface BaseChannelPointsAutomaticRewardRedemptionEventEmote {
  /** An object that contains the reward information. */
  reward: {
    type: "random_sub_emote_unlock" | "chosen_sub_emote_unlock" | "chosen_modified_sub_emote_unlock";
    /** The reward cost. */ 
    cost: number;
    /** Emote that was unlocked. */
    unlocked_emote: {
      /** The emote ID. */
      id: string;
      /** The human readable emote token. */
      name: string;
    }
  }
}

interface BaseChannelPointsAutomaticRewardRedemptionEventMessage {
  /** An object that contains the reward information. */
  reward: {
    type: "ssingle_message_bypass_sub_mode" | "send_highlighted_message";
    /** The reward cost. */
    cost: number;
    /** An object that contains the user message and emote information needed to recreate the message. */
    message: TwitchMessage;
  }
  /** Optional. A string that the user entered if the reward requires input. */
  user_input: string;
}

type ChannelPointsAutomaticRewardRedemptionEventSpec = BaseChannelPointsAutomaticRewardRedemptionEventEmote | BaseChannelPointsAutomaticRewardRedemptionEventMessage;

interface ChannelPointsAutomaticRewardRedemptionEventCommon {
  /** The ID of the Redemption. */
  id: string;
  /** The UTC date and time (in RFC3339 format) of when the reward was redeemed. */
  redeemed_at: string;
}

export type ChannelPointsAutomaticRewardRedemptionEvent = ChannelPointsAutomaticRewardRedemptionEventCommon & ChannelPointsAutomaticRewardRedemptionEventSpec & BaseBroadcaster & BaseUser;

export type ChannelPointsAutomaticRewardRedemptionSubscription = BaseSubscription<ChannelPointsAutomaticRewardRedemptionEvent, "channel.channel_points_automatic_reward_redemption.add">;

interface TwitchMaxPerStream {
  /** Is the setting enabled. */
  is_enabled: boolean;
  /** The max per stream limit. */
  value: number;
}

interface TwitchMaxPerUserPerStream {
  /** Is the setting enabled. */
  is_enabled: boolean;
  /** The max per user per stream limit. */
  value: number;
}

interface TwitchImage {
  /** URL for the image at 1x size. */
  url_1x: string;
  /** URL for the image at 2x size. */
  url_2x: string;
  /** URL for the image at 4x size. */
  url_4x: string;
}

interface TwitchGlobalCooldown {
  /** Is the setting enabled. */
  is_enabled: boolean;
  /** The cooldown in seconds. */
  seconds: number;
}

export interface ChannelPointsCustomRewardAddEvent extends BaseBroadcaster {
  /** The reward identifier. */
  id: string;
  /** Is the reward currently enabled. If false, the reward won’t show up to viewers. */
  is_enabled: boolean;
  /** Is the reward currently paused. If true, viewers can’t redeem. */
  is_paused: boolean;
  /** Is the reward currently in stock. If false, viewers can’t redeem. */
  is_in_stock: boolean;
  /** The reward title. */
  title: string;
  /** The reward cost. */
  cost: number;
  /** The reward description. */
  prompt: string;
  /** Does the viewer need to enter information when redeeming the reward. */
  is_user_input_required: boolean;
  /** Should redemptions be set to `fulfilled` status immediately when redeemed and skip the request queue instead of the normal `unfulfilled` status. */
  should_redemptions_skip_request_queue: boolean;
  /** Whether a maximum per stream is enabled and what the maximum is. */
  max_per_stream: TwitchMaxPerStream;
   /** Whether a maximum per user per stream is enabled and what the maximum is. */
  max_per_user_per_stream: TwitchMaxPerUserPerStream;
  /** Custom background color for the reward. Format: Hex with # prefix. */
  background_color: `#${string}`;
  /** Set of custom images of 1x, 2x and 4x sizes for the reward. Can be `null` if no images have been uploaded. */
  image: TwitchImage | null;
  /** Set of default images of 1x, 2x and 4x sizes for the reward. */
  default_image: TwitchImage;
  /** Whether a cooldown is enabled and what the cooldown is in seconds. */
  global_cooldown: TwitchGlobalCooldown;
  /** Timestamp of the cooldown expiration. `null` if the reward isn’t on cooldown. */
  cooldown_expires_at: string | null;
  /** The number of redemptions redeemed during the current live stream. Counts against the `max_per_stream` limit. `null` if the broadcasters stream isn’t live or `max_per_stream` isn’t enabled. */
  redemptions_redeemed_current_stream: number | null;
}

export type ChannelPointsCustomRewardAddSubscription = BaseSubscription<ChannelPointsCustomRewardAddEvent, "channel.channel_points_custom_reward.add">;

export type ChannelPointsCustomRewardUpdateEvent = ChannelPointsCustomRewardAddEvent;

export type ChannelPointsCustomRewardUpdateSubscription = BaseSubscription<ChannelPointsCustomRewardUpdateEvent, "channel.channel_points_custom_reward.update">;

export type ChannelPointsCustomRewardRemoveEvent = ChannelPointsCustomRewardAddEvent;

export type ChannelPointsCustomRewardRemoveSubscription = BaseSubscription<ChannelPointsCustomRewardRemoveEvent, "channel.channel_points_custom_reward.remove">;

interface TwitchReward {
  /** The reward identifier. */
  id: string;
  /** The reward name. */
  title: string;
  /** The reward cost. */
  cost: number;
  /** The reward description. */
  promps: string;
}

export interface ChannelPointsCustomRewardRedemptionAddEvent extends BaseBroadcaster, BaseUser {
  /** The user input provided. Empty string if not provided. */
  user_input: string;
  /** Defaults to `unfulfilled`. */
  status: "unknown" | "unfulfilled" | "fulfilled" | "canceled";
  /** Basic information about the reward that was redeemed, at the time it was redeemed. */
  reward: TwitchReward;
  /** RFC3339 timestamp of when the reward was redeemed. */
  redeemed_at: string;
}

export type ChannelPointsCustomRewardRedemptionAddSubscription = BaseSubscription<ChannelPointsCustomRewardRedemptionAddEvent, "channel.channel_points_custom_reward_redemption.add">;

export type ChannelPointsCustomRewardRedemptionUpdateEvent = ChannelPointsCustomRewardRedemptionAddEvent;

export type ChannelPointsCustomRewardRedemptionUpdateSubscription = BaseSubscription<ChannelPointsCustomRewardRedemptionUpdateEvent, "channel.channel_points_custom_reward_redemption.update">;

interface TwitchChoices {
  /** ID for the choice. */
  id: string;
  /** Text displayed for the choice. */
  title: string;
  /** Not used; will be set to 0. */
  bits_votes: never;
  /** Number of votes received via Channel Points. */
  channel_points_votes: number;
  /** Total number of votes received for the choice across all methods of voting. */
  votes: number;
}

interface TwitchBitsVoting {
  is_enabled: boolean;
  amount_per_vote: number;
}

export interface ChannelPollBeginEvent extends BaseBroadcaster {
  /** ID of the poll. */
  id: string;
  /** Question displayed for the poll. */
  title: string;
  /** An array of choices for the poll. */
  choices: TwitchChoices[];
  /** Not supported. use TwitchBitsVoting if ever implemented */
  bits_voting: Record<never, never>;
  /** The time the poll started. */
  started_at: string;
  /** The time the poll will end. */
  ends_at: string;
}

export type ChannelPollBeginSubscription = BaseSubscription<ChannelPollBeginEvent, "channel.poll.begin">;

export type ChannelPollProgressEvent = ChannelPollBeginEvent;

export type ChannelPollProgressSubscription = BaseSubscription<ChannelPollProgressEvent, "channel.poll.progress">;

export interface ChannelPollEndEvent extends Omit<ChannelPollBeginEvent, "ends_at"> {
  /** The status of the poll. */
  status: "completed" | "archived" | "terminated";
  /** The time the poll ended. */
  ended_at: string;
}

export type ChannelPollEndSubscription = BaseSubscription<ChannelPollEndEvent, "channel.poll.end">;

interface TwitchTopPredictors<Ended extends boolean> extends BaseUser {
  /** The number of Channel Points won. */
  channel_points_won: Ended extends true ? number : null;
  /** The number of Channel Points used to participate in the Prediction. */
  channel_points_used: number;
}

interface TwitchOutcomes<Ended extends boolean> {
  /** The outcome ID. */
  id: string;
  /** The outcome title. */
  title: string;
  /** The color for the outcome. */
  color: "pink" | "blue";
  /** The number of users who used Channel Points on this outcome. */
  users: number;
  /** The total number of Channel Points used on this outcome. */
  channel_points: number;
  /** An array of users who used the most Channel Points on this outcome. */
  top_predictors: TwitchTopPredictors<Ended>[];
}

export interface ChannelPredictionBeginEvent<Ended extends boolean = false> extends BaseBroadcaster {
  /** Channel Points Prediction ID. */
  id: string;
  /** Title for the Channel Points Prediction. */
  title: string;
  /** An array of outcomes for the Channel Points Prediction. */
  outcomes: TwitchOutcomes<Ended>[];
  /** The time the Channel Points Prediction started. */
  started_at: string;
  /** The time the Channel Points Prediction will automatically lock. */
  locks_at: string;
}

export type ChannelPredictionBeginSubscription = BaseSubscription<ChannelPredictionBeginEvent, "channel.prediction.begin">;

export type ChannelPredictionProgressEvent = ChannelPredictionBeginEvent;

export type ChannelPredictionProgressSubscription = BaseSubscription<ChannelPredictionProgressEvent, "channel.prediction.progress">;

export interface ChannelPredictionLockEvent extends Omit<ChannelPredictionBeginEvent, "locks_at"> {
  /** The time the Channel Points Prediction was locked. */
  locked_at: string;
}

export type ChannelPredictionLockSubscription = BaseSubscription<ChannelPredictionLockEvent, "channel.prediction.lock">;

export interface ChannelPredictionEndEvent extends ChannelPredictionLockEvent {
  /** ID of the winning outcome. */
  winning_outcome_id: string;
  /** The status of the Channel Points Prediction. */
  status: "resolved" | "canceled";
}

export type ChannelPredictionEndSubscription = BaseSubscription<ChannelPredictionEndEvent, "channel.prediction.end">;

export interface ChannelSuspiciousUserMessageEvent extends BaseBroadcaster, BaseModerator, BaseUser {
  low_trust_status: "none" | "active_monitoring" | "restricted";
}

export type ChannelSuspiciousUserMessageSubscription = BaseSubscription<ChannelSuspiciousUserMessageEvent, "channel.suspicious_user.message">;

export type ChannelSuspiciousUserUpdateEvent = ChannelSuspiciousUserMessageEvent;

export type ChannelSuspiciousUserUpdateSubscription = BaseSubscription<SuspiciousUserUpdateEvent, "channel.suspicious_user.update">;

export type ChannelVipAddEvent = BaseBroadcaster & BaseUser;

export type ChannelVipAddSubscription = BaseSubscription<ChannelVipAddEvent, "channel.vip.add">;

export type ChannelVipRemoveEvent = ChannelVipAddEvent;

export type ChannelVipRemoveSubscription = BaseSubscription<ChannelVipRemoveEvent, "channel.vip.remove">;

interface BaseCharity {
  /** The charity’s name. */
  charity_name: string;
  /** A description of the charity. */
  charity_description: string;
  /** A URL to an image of the charity’s logo. The image’s type is PNG and its size is 100px X 100px. */
  charity_logo: string;
  /** A URL to the charity’s website. */
  charity_website: string;
}

export interface CharityDonationEvent extends BaseBroadcaster, BaseUser, BaseCharity {
  /** An ID that identifies the donation. The ID is unique across campaigns. */
  id: string;
  /** An ID that identifies the charity campaign. */
  campaign_id: string;
  /** An object that contains the amount of money that the user donated. */
  amount: MonetaryNotation;
}

export type CharityDonationSubscription = BaseSubscription<CharityDonationEvent, "channel.charity_campaign.donate">;

export interface CharityCampaignStartEvent extends BaseBroadcaster, BaseCharity {
  /** An ID that identifies the charity campaign. */
  id: string;
  /** An object that contains the current amount of donations that the campaign has received. */
  current_amount: MonetaryNotation;
  /** An object that contains the campaign’s target fundraising goal. */
  target_amount: MonetaryNotation;
  /** The UTC timestamp (in RFC3339 format) of when the broadcaster started the campaign. */
  started_at: string;
}

export type CharityCampaignStartSubscription = BaseSubscription<CharityCampaignStartEvent, "channel.charity_campaign.start">;

export type CharityCampaignProgressEvent = Omit<CharityCampaignStartEvent, "started_at">;

export type CharityCampaignProgressSubscription = BaseSubscription<CharityCampaignProgressEvent, "channel.charity_campaign.progress">;

export interface CharityCampaignStopEvent extends CharityCampaignProgressEvent {
  /** The UTC timestamp (in RFC3339 format) of when the broadcaster stopped the campaign. */
  stopped_at: string;
}

export type CharityCampaignStopSubscription = BaseSubscription<CharityCampaignStopEvent, "channel.charity_campaign.stop">;

interface TwitchBaseProduct {
  /** Product name. */
  name: string;
  /** Unique identifier for the product acquired. */
  sku: string;
}

interface TwitchProductDev {
  /** Flag indicating if the product is in development. */
  in_development: true;
  bits: 0;
}

interface TwitchProductProd {
  /** Flag indicating if the product is in development. */
  in_development: false;
  bits: number;
}

type TwitchProduct = TwitchBaseProduct & (TwitchProductDev | TwitchProductProd);

export interface ExtensionBitsTransactionCreateEvent extends BaseBroadcaster, BaseUser {
  /** Client ID of the extension. */
  extension_client_id: string;
  /** Transaction ID. */
  id: string;
  product: TwitchProduct;
}

export type ExtensionBitsTransactionCreateSubscription = BaseSubscription<ExtensionBitsTransactionCreateEvent, "extension.bits_transaction.create">;

interface BaseGoalEvent extends BaseBroadcaster {
  /** An ID that identifies this event. */
  id: string;
  /**
   * The type of goal.
   * 
   * `follow` – The goal is to increase followers.
   * 
   * `subscription` – The goal is to increase subscriptions. This type shows the net increase or decrease in tier points associated with the subscriptions.
   * 
   * `subscription_count` — The goal is to increase subscriptions. This type shows the net increase or decrease in the number of subscriptions.
   * 
   * `new_subscription` — The goal is to increase subscriptions.
   * This type shows only the net increase in tier points associated with the subscriptions (it does not account for users that unsubscribed since the goal started).
   * 
   * `new_subscription_count` — The goal is to increase subscriptions.
   * This type shows only the net increase in the number of subscriptions (it does not account for users that unsubscribed since the goal started).
   * 
   * `new_bit` — The goal is to increase the amount of Bits used on the channel.
   * 
   * `new_cheerer` — The goal is to increase the number of unique Cheerers to Cheer on the channel.
   */
  type: "follow" | "subscription" | "subscription_count" | "new_subscription" | "new_subscription_count" | "new_bit" | "new_cheerer";
  /** A description of the goal, if specified. The description may contain a maximum of 40 characters. */
  description: string;
  /**
   * The goal’s current value.
   * 
   * The goal’s `type` determines how this value is increased or decreased.
   * 
   * `follow`, this field is set to the broadcaster's current number of followers.
   * This number increases with new followers and decreases when users unfollow the broadcaster.
   * 
   * `subscription`, this field is increased and decreased by the points value associated with the subscription tier.
   * For example, if a tier-two subscription is worth 2 points, this field is increased or decreased by 2, not 1.
   * 
   * `subscription_count`, this field is increased by 1 for each new subscription and decreased by 1 for each user that unsubscribes.
   * 
   * `new_subscription`, this field is increased by the points value associated with the subscription tier.
   * For example, if a tier-two subscription is worth 2 points, this field is increased by 2, not 1.
   * 
   * `new_subscription_count`, this field is increased by 1 for each new subscription.
   */
  current_amount: number;
  /** The goal’s target value. */
  target_amount: number;
  /** The UTC timestamp in RFC 3339 format, which indicates when the broadcaster created the goal. */
  started_at: string;
}

export type GoalBeginEvent = BaseGoalEvent;

export type GoalBeginSubscription = BaseSubscription<GoalBeginEvent, "channel.goal.begin">;

export type GoalProgressEvent = BaseGoalEvent;

export type GoalProgressSubscription = BaseSubscription<GoalProgressEvent, "channel.goal.progress">;

export interface GoalEndEvent extends BaseGoalEvent {
  /** A Boolean value that indicates whether the broadcaster achieved their goal. */
  is_achieved: boolean;
  /** The UTC timestamp in RFC 3339 format, which indicates when the broadcaster ended the goal. */
  ended_at: string;
}

export type GoalEndSubscription = BaseSubscription<GoalEndEvent, "channel.goal.end">;

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
| ChannelUnbanRequestCreateSubscription
| ChannelUnbanRequestResolveSubscription
| ChannelModerateSubscription
| ChannelModeratorAddSubscription
| ChannelPointsAutomaticRewardRedemptionSubscription
| ChannelPointsCustomRewardAddSubscription
| ChannelPointsCustomRewardUpdateSubscription
| ChannelPointsCustomRewardRemoveSubscription
| ChannelPointsCustomRewardRedemptionAddSubscription
| ChannelPointsCustomRewardRedemptionUpdateSubscription
| ChannelPollBeginSubscription
| ChannelPollProgressSubscription
| ChannelPollEndSubscription
| ChannelPredictionBeginSubscription
| ChannelPredictionProgressSubscription
| ChannelPredictionLockSubscription
| ChannelPredictionEndSubscription
| ChannelSuspiciousUserMessageSubscription
| ChannelSuspiciousUserUpdateSubscription
| ChannelVipAddSubscription
| ChannelVipRemoveSubscription
| CharityDonationSubscription
| CharityCampaignStartSubscription
| CharityCampaignProgressSubscription
| CharityCampaignStopSubscription
| ExtensionBitsTransactionCreateSubscription
| GoalBeginSubscription
| GoalProgressSubscription
| GoalEndSubscription;
