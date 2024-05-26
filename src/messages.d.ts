import {
  AutomodMessageHoldEvent,
  AutomodSettingsUpdateEvent,
  AutomodTermsUpdateEvent,
  ChannelAdBreakBeginEvent,
  ChannelBanEvent,
  ChannelChatClearEvent,
  ChannelChatClearUserMessageEvent,
  ChannelChatMessageDeleteEvent,
  ChannelChatMessageEvent,
  ChannelChatNotificationEvent,
  ChannelChatSettingUpdateEvent,
  ChannelChatUserMessageHoldEvent,
  ChannelChatUserMessageUpdateEvent,
  ChannelCheerEvent,
  ChannelFollowEvent,
  ChannelFollowSubscription,
  ChannelModerateEvent,
  ChannelModeratorAddEvent,
  ChannelModeratorRemoveEvent,
  ChannelPointsAutomaticRewardRedemptionEvent,
  ChannelPointsCustomRewardAddEvent,
  ChannelPointsCustomRewardRedemptionAddEvent,
  ChannelPointsCustomRewardRedemptionUpdateEvent,
  ChannelPointsCustomRewardRemoveEvent,
  ChannelPointsCustomRewardUpdateEvent,
  ChannelPollBeginEvent,
  ChannelPollEndEvent,
  ChannelPollProgressEvent,
  ChannelPredictionBeginEvent,
  ChannelPredictionEndEvent,
  ChannelPredictionLockEvent,
  ChannelPredictionProgressEvent,
  ChannelRaidEvent,
  ChannelSubscribeEvent,
  ChannelSubscriptionGiftEvent,
  ChannelSubscriptionMessageEvent,
  ChannelSuspiciousUserMessageEvent,
  ChannelSuspiciousUserUpdateEvent,
  ChannelUnbanEvent,
  ChannelUnbanRequestCreateEvent,
  ChannelUnbanRequestResolveEvent,
  ChannelUpdateEvent,
  ChannelVipAddEvent,
  ChannelVipRemoveEvent,
  CharityCampaignProgressEvent,
  CharityCampaignStartEvent,
  CharityCampaignStopEvent,
  CharityDonationEvent,
  ExtensionBitsTransactionCreateEvent,
  GoalBeginEvent,
  GoalEndEvent,
  GoalProgressEvent,
  HypeTrainBeginEvent,
} from "./types/events";
import ChannelModeratorRemove from "./events/ChannelModeratorRemove";
import AutomodMessageHold from "./events/AutomodMessageHold";
import AutomodMessageHoldUpdate from "./events/AutomodMessageHoldUpdate";
import AutomodSettingsUpdate from "./events/AutomodSettingsUpdate";
import AutomodTermsUpdate from "./events/AutomodTermsUpdate";
import ChannelUpdate from "./events/ChannelUpdate";
import ChannelAdBreakBegin from "./events/ChannelAdBreakBegin";
import ChannelChatClear from "./events/ChannelChatClear";
import ChannelChatClearUserMessage from "./events/ChannelChatClearUserMessage";
import ChannelChatMessage from "./events/ChannelChatMessage";
import ChannelChatMessageDelete from "./events/ChannelChatMessageDelete";
import ChannelChatNotification from "./events/ChannelChatNotification";
import ChannelChatSettingsUpdate from "./events/ChannelChatSettingsUpdate";
import ChannelChatUserMessageHold from "./events/ChannelChatUserMessageHold";
import ChannelChatUserMessageUpdate from "./events/ChannelChatUserMessageUpdate";
import ChannelSubscribe from "./events/ChannelSubscribe";
import ChannelSubscriptionEnd from "./events/ChannelSubscriptionEnd";
import ChannelSubscriptionGift from "./events/ChannelSubscriptionGift";
import ChannelSubscriptionMessage from "./events/ChannelSubscriptionMessage";
import ChannelCheer from "./events/ChannelCheer";
import ChannelRaid from "./events/ChannelRaid";
import ChannelBan from "./events/ChannelBan";
import ChannelUnban from "./events/ChannelUnban";
import ChannelUnbanRequestCreate from "./events/ChannelUnbanRequestCreate";
import ChannelUnbanRequestResolve from "./events/ChannelUnbanRequestResolve";
import ChannelModerate from "./events/ChannelModerate";
import ChannelModeratorAdd from "./events/ChannelModeratorAdd";
import ChannelPointsAutomaticRewardRedemption from "./events/ChannelPointsAutomaticRewardRedemption";
import ChannelPointsCustomRewardAdd from "./events/ChannelPointsCustomRewardAdd";
import ChannelPointsCustomRewardUpdate from "./events/ChannelPointsCustomRewardUpdate";
import ChannelPointsCustomRewardRemove from "./events/ChannelPointsCustomRewardRemove";
import ChannelPointsCustomRewardRedemptionAdd from "./events/ChannelPointsCustomRewardRedemptionAdd";
import ChannelPointsCustomRewardRedemptionUpdate from "./events/ChannelPointsCustomRewardRedemptionUpdate";
import ChannelPollBegin from "./events/ChannelPollBegin";
import ChannelPollProgress from "./events/ChannelPollProgress";
import ChannelPollEnd from "./events/ChannelPollEnd";
import ChannelPredictionBegin from "./events/ChannelPredictionBegin";
import ChannelPredictionProgress from "./events/ChannelPredictionProgress";
import ChannelPredictionLock from "./events/ChannelPredictionLock";
import ChannelSuspiciousUserMessage from "./events/ChannelSuspiciousUserMessage";
import ChannelSuspiciousUserUpdate from "./events/ChannelSuspiciousUserUpdate";
import ChannelVipAdd from "./events/ChannelVipAdd";
import ChannelVipRemove from "./events/ChannelVipRemove";
import CharityDonation from "./events/CharityDonation";
import CharityCampaignStart from "./events/CharityCampaignStart";
import CharityCampaignProgress from "./events/CharityCampaignProgress";
import CharityCampaignStop from "./events/CharityCampaignStop";
import ExtensionBitsTransactionCreate from "./events/ExtensionBitsTransactionCreate";
import GoalBegin from "./events/GoalBegin";
import GoalProgress from "./events/GoalProgress";
import GoalEnd from "./events/GoalEnd";
import HypeTrainBegin from "./events/HypeTrainBegin";


type EventSubMetaType = "session_welcome" | "session_keepalive" | "notification" | "session_reconnect" | "revocation";

interface EventSubMetaData<T extends EventSubMetaType> {
  message_id: string;
  message_type: T;
  message_timestamp: string;
}

interface BaseEventSubMessage<T extends EventSubMetaType, P> {
  metadata: EventSubMetaData<T>;
  payload: P;
}

interface BaseESConnectionPayload {
  id: string;
  /** UTC date and time */
  connected_at: string;
}

interface ESWelcomeMessagePayload {
  session: BaseESConnectionPayload & {
    status: "connected";
    keepalive_timeout_seconds: number;
    reconnect_url: null;
  };
}

type ESWelcomeMessage = BaseEventSubMessage<"session_welcome", ESWelcomeMessagePayload>;

interface ESReconnectMessagePayload {
  session: BaseESConnectionPayload & {
    status: "reconnected";
    keepalive_timeout_seconds: number;
    reconnect_url: string;
  };
}

type ESReconnectMessage = BaseEventSubMessage<"session_reconnect", ESReconnectMessagePayload>;

// exact response of the keep alive message is empty object
type ESKeepAliveMessage = BaseEventSubMessage<"session_keepalive", Record<never, never>>;

interface BaseEventSubNotificationPayload<T extends string, E> {
  subscription: {
    id: string;
    status: "enabled";
    type: T;
    version: string;
    /** set as unknown as its not used */
    condition: Record<string, unknown>;
    transport: {
      method: "websocket";
      session_id: string;
    };
    created_at: string;
  };
  event: E;
}

export type NotificationFollowMessage = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelFollowSubscription["type"], ChannelFollowEvent>>;

export type NotificationChannelModeratorRemoved = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelModeratorRemove["type"], ChannelModeratorRemoveEvent>>;

export type NotificationAutomodMessageHold = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<AutomodMessageHold["type"], AutomodMessageHoldEvent>>;

export type NotificationAutomodMessageHoldUpdate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<AutomodMessageHoldUpdate["type"], AutomodMessageHoldEvent>>;

export type NotificationAutomodSettingsUpdate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<AutomodSettingsUpdate["type"], AutomodSettingsUpdateEvent>>;

export type NotificationAutomodTermsUpdate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<AutomodTermsUpdate["type"], AutomodTermsUpdateEvent>>;

export type NotificationChannelUpdate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelUpdate["type"], ChannelUpdateEvent>>;

export type NotificationChannelAdBreakBegin = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelAdBreakBegin["type"], ChannelAdBreakBeginEvent>>;

export type NotificationChannelChatClear = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelChatClear["type"], ChannelChatClearEvent>>;

export type NotificationChannelChatClearUserMessage = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelChatClearUserMessage["type"], ChannelChatClearUserMessageEvent>>;

export type NotificationChannelChatMessage = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelChatMessage["type"], ChannelChatMessageEvent>>;

export type NotificationChannelChatMessageDelete = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelChatMessageDelete["type"], ChannelChatMessageDeleteEvent>>;

export type NotificationChannelChatNotification = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelChatNotification["type"], ChannelChatNotificationEvent>>;

export type NotificationChannelChatSettingsUpdate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelChatSettingsUpdate["type"], ChannelChatSettingUpdateEvent>>;

export type NotificationChannelChatUserMessageHold = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelChatUserMessageHold["type"], ChannelChatUserMessageHoldEvent>>;

export type NotificationChannelChatUserMessageUpdate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelChatUserMessageUpdate["type"], ChannelChatUserMessageUpdateEvent>>;

export type NotificationChannelSubscribe = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelSubscribe["type"], ChannelSubscribeEvent>>;

export type NotificationChannelSubscriptionEnd = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelSubscriptionEnd["type"], ChannelSubscribeEvent>>;

export type NotificationChannelSubscriptionGift = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelSubscriptionGift["type"], ChannelSubscriptionGiftEvent>>;

export type NotificationChannelSubscriptionMessage = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelSubscriptionMessage["type"], ChannelSubscriptionMessageEvent>>;

export type NotificationChannelCheer = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelCheer["type"], ChannelCheerEvent>>;

export type NotificationChannelRaid = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelRaid["type"], ChannelRaidEvent>>;

export type NotificationChannelBan = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelBan["type"], ChannelBanEvent>>;

export type NotificationChannelUnban = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelUnban["type"], ChannelUnbanEvent>>;

export type NotificationChannelUnbanRequestCreate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelUnbanRequestCreate["type"], ChannelUnbanRequestCreateEvent>>;

export type NotificationChannelUnbanRequestResolve = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelUnbanRequestResolve["type"], ChannelUnbanRequestResolveEvent>>;

export type NotificationChannelModerate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelModerate["type"], ChannelModerateEvent>>;

export type NotificationChannelModeratorAdd = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelModeratorAdd["type"], ChannelModeratorAddEvent>>;

export type NotificationChannelPointsAutomaticRewardRedemption = BaseEventSubMessage<
  "notification",
  BaseEventSubNotificationPayload<ChannelPointsAutomaticRewardRedemption["type"], ChannelPointsAutomaticRewardRedemptionEvent>
>;

export type NotificationChannelPointsCustomRewardAdd = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelPointsCustomRewardAdd["type"], ChannelPointsCustomRewardAddEvent>>;

export type NotificationChannelPointsCustomRewardUpdate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelPointsCustomRewardUpdate["type"], ChannelPointsCustomRewardUpdateEvent>>;

export type NotificationChannelPointsCustomRewardRemove = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelPointsCustomRewardRemove["type"], ChannelPointsCustomRewardRemoveEvent>>;

export type NotificationChannelPointsCustomRewardRedemptionAdd = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelPointsCustomRewardRedemptionAdd["type"], ChannelPointsCustomRewardRedemptionAddEvent>>;

export type NotificationChannelPointsCustomRewardRedemptionUpdate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelPointsCustomRewardRedemptionUpdate["type"], ChannelPointsCustomRewardRedemptionUpdateEvent>>;

export type NotificationChannelPollBegin = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelPollBegin["type"], ChannelPollBeginEvent>>;

export type NotificationChannelPollProgress = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelPollProgress["type"], ChannelPollProgressEvent>>;

export type NotificationChannelPollEnd = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelPollEnd["type"], ChannelPollEndEvent>>;

export type NotificationChannelPredictionBegin = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelPredictionBegin["type"], ChannelPredictionBeginEvent>>;

export type NotificationChannelPredictionProgress = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelPredictionProgress["type"], ChannelPredictionProgressEvent>>;

export type NotificationChannelPredictionLock = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelPredictionLock["type"], ChannelPredictionLockEvent>>;

export type NotificationChannelPredictionEnd = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelPredictionEnd["type"], ChannelPredictionEndEvent>>;

export type NotificationChannelSuspiciousUserMessage = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelSuspiciousUserMessage["type"], ChannelSuspiciousUserMessageEvent>>;

export type NotificationChannelSuspiciousUserUpdate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelSuspiciousUserUpdate["type"], ChannelSuspiciousUserUpdateEvent>>;

export type NotificationChannelVipAdd = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelVipAdd["type"], ChannelVipAddEvent>>;

export type NotificationChannelVipRemove = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ChannelVipRemove["type"], ChannelVipRemoveEvent>>;

export type NotificationCharityDonation = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<CharityDonation["type"], CharityDonationEvent>>;

export type NotificationCharityCampaignStart = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<CharityCampaignStart["type"], CharityCampaignStartEvent>>;

export type NotificationCharityCampaignProgress = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<CharityCampaignProgress["type"], CharityCampaignProgressEvent>>;

export type NotificationCharityCampaignStop = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<CharityCampaignStop["type"], CharityCampaignStopEvent>>;

export type NotificationExtensionBitsTransactionCreate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ExtensionBitsTransactionCreate["type"], ExtensionBitsTransactionCreateEvent>>;

export type NotificationGoalBegin = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<GoalBegin["type"], GoalBeginEvent>>;

export type NotificationGoalProgress = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<GoalProgress["type"], GoalProgressEvent>>;

export type NotificationGoalEnd = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<GoalEnd["type"], GoalEndEvent>>;

export type NotificationHypeTrainBegin = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<HypeTrainBegin["type"], HypeTrainBeginEvent>>;

export type NotificationMessage = NotificationFollowMessage
| NotificationChannelModeratorRemoved
| NotificationAutomodMessageHold
| NotificationAutomodMessageHoldUpdate
| NotificationAutomodSettingsUpdate
| NotificationAutomodTermsUpdate
| NotificationChannelUpdate
| NotificationChannelAdBreakBegin
| NotificationChannelChatClear
| NotificationChannelChatClearUserMessage
| NotificationChannelChatMessage
| NotificationChannelChatMessageDelete
| NotificationChannelChatNotification
| NotificationChannelChatSettingsUpdate
| NotificationChannelChatUserMessageHold
| NotificationChannelChatUserMessageUpdate
| NotificationChannelSubscribe
| NotificationChannelSubscriptionEnd
| NotificationChannelSubscriptionGift
| NotificationChannelSubscriptionMessage
| NotificationChannelCheer
| NotificationChannelBan
| NotificationChannelUnban
| NotificationChannelUnbanRequestCreate
| NotificationChannelUnbanRequestResolve
| NotificationChannelModerate
| NotificationChannelModeratorAdd
| NotificationChannelPointsAutomaticRewardRedemption
| NotificationChannelPointsCustomRewardAdd
| NotificationChannelPointsCustomRewardUpdate
| NotificationChannelPointsCustomRewardRemove
| NotificationChannelPointsCustomRewardRedemptionAdd
| NotificationChannelPointsCustomRewardRedemptionUpdate
| NotificationChannelPollBegin
| NotificationChannelPollProgress
| NotificationChannelPollEnd
| NotificationChannelPredictionBegin
| NotificationChannelPredictionProgress
| NotificationChannelPredictionLock
| NotificationChannelPredictionEnd
| NotificationChannelSuspiciousUserMessage
| NotificationChannelSuspiciousUserUpdate
| NotificationChannelVipAdd
| NotificationChannelVipRemove
| NotificationCharityDonation
| NotificationCharityCampaignStart
| NotificationCharityCampaignProgress
| NotificationCharityCampaignStop
| NotificationExtensionBitsTransactionCreate
| NotificationGoalBegin
| NotificationGoalProgress
| NotificationGoalEnd
| NotificationHypeTrainBegin;

export interface PingMessage {
  type: "PING";
}

export type EventSubMessage = PingMessage
| ESWelcomeMessage
| ESReconnectMessage
| ESKeepAliveMessage
| NotificationMessage;
