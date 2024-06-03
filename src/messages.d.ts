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
  HypeTrainEndEvent,
  HypeTrainProgressEvent,
  ShieldModeBeginEvent,
  ShieldModeEndEvent,
  ShoutoutCreateEvent,
  ShoutoutReceivedEvent,
  StreamOfflineEvent,
  StreamOnlineEvent,
  UserAuthorizationGrantEvent,
  UserAuthorizationRevokeEvent,
  WhisperReceivedEvent,
} from "./types/events";
import ChannelModeratorRemove from "./events/Channel/Moderate/ChannelModeratorRemove";
import AutomodMessageHold from "./events/Automod/AutomodMessageHold";
import AutomodMessageHoldUpdate from "./events/Automod/AutomodMessageHoldUpdate";
import AutomodSettingsUpdate from "./events/Automod/AutomodSettingsUpdate";
import AutomodTermsUpdate from "./events/Automod/AutomodTermsUpdate";
import ChannelUpdate from "./events/Channel/ChannelUpdate";
import ChannelAdBreakBegin from "./events/ChannelAdBreakBegin";
import ChannelChatClear from "./events/Channel/Chat/ChannelChatClear";
import ChannelChatClearUserMessage from "./events/Channel/Chat/ChannelChatClearUserMessage";
import ChannelChatMessage from "./events/Channel/Chat/ChannelChatMessage";
import ChannelChatMessageDelete from "./events/Channel/Chat/ChannelChatMessageDelete";
import ChannelChatNotification from "./events/Channel/Chat/ChannelChatNotification";
import ChannelChatSettingsUpdate from "./events/Channel/Chat/ChannelChatSettingsUpdate";
import ChannelChatUserMessageHold from "./events/Channel/Chat/ChannelChatUserMessageHold";
import ChannelChatUserMessageUpdate from "./events/Channel/Chat/ChannelChatUserMessageUpdate";
import ChannelSubscribe from "./events/Channel/Subscription/ChannelSubscribe";
import ChannelSubscriptionEnd from "./events/Channel/Subscription/ChannelSubscriptionEnd";
import ChannelSubscriptionGift from "./events/Channel/Subscription/ChannelSubscriptionGift";
import ChannelSubscriptionMessage from "./events/Channel/Subscription/ChannelSubscriptionMessage";
import ChannelCheer from "./events/ChannelCheer";
import ChannelRaid from "./events/Channel/ChannelRaid";
import ChannelBan from "./events/Channel/Ban/ChannelBan";
import ChannelUnban from "./events/Channel/Ban/ChannelUnban";
import ChannelUnbanRequestCreate from "./events/Channel/Ban/ChannelUnbanRequestCreate";
import ChannelUnbanRequestResolve from "./events/Channel/Ban/ChannelUnbanRequestResolve";
import ChannelModerate from "./events/Channel/Moderate/ChannelModerate";
import ChannelModeratorAdd from "./events/Channel/Moderate/ChannelModeratorAdd";
import ChannelPointsAutomaticRewardRedemption from "./events/Channel/Points/ChannelPointsAutomaticRewardRedemption";
import ChannelPointsCustomRewardAdd from "./events/Channel/Points/ChannelPointsCustomRewardAdd";
import ChannelPointsCustomRewardUpdate from "./events/Channel/Points/ChannelPointsCustomRewardUpdate";
import ChannelPointsCustomRewardRemove from "./events/Channel/Points/ChannelPointsCustomRewardRemove";
import ChannelPointsCustomRewardRedemptionAdd from "./events/Channel/Points/ChannelPointsCustomRewardRedemptionAdd";
import ChannelPointsCustomRewardRedemptionUpdate from "./events/Channel/Points/ChannelPointsCustomRewardRedemptionUpdate";
import ChannelPollBegin from "./events/Channel/Poll/ChannelPollBegin";
import ChannelPollProgress from "./events/Channel/Poll/ChannelPollProgress";
import ChannelPollEnd from "./events/Channel/Poll/ChannelPollEnd";
import ChannelPredictionBegin from "./events/Channel/Prediction/ChannelPredictionBegin";
import ChannelPredictionProgress from "./events/Channel/Prediction/ChannelPredictionProgress";
import ChannelPredictionLock from "./events/Channel/Prediction/ChannelPredictionLock";
import ChannelSuspiciousUserMessage from "./events/Channel/SuspiciousUser/ChannelSuspiciousUserMessage";
import ChannelSuspiciousUserUpdate from "./events/Channel/SuspiciousUser/ChannelSuspiciousUserUpdate";
import ChannelVipAdd from "./events/Channel/Vip/ChannelVipAdd";
import ChannelVipRemove from "./events/Channel/Vip/ChannelVipRemove";
import CharityDonation from "./events/Channel/Charity/CharityDonation";
import CharityCampaignStart from "./events/Channel/Charity/CharityCampaignStart";
import CharityCampaignProgress from "./events/Channel/Charity/CharityCampaignProgress";
import CharityCampaignStop from "./events/Channel/Charity/CharityCampaignStop";
import ExtensionBitsTransactionCreate from "./events/ExtensionBitsTransactionCreate";
import GoalBegin from "./events/GoalBegin";
import GoalProgress from "./events/GoalProgress";
import GoalEnd from "./events/GoalEnd";
import HypeTrainBegin from "./events/Channel/HypeTrain/HypeTrainBegin";
import HypeTrainProgress from "./events/Channel/HypeTrain/HypeTrainProgress";
import HypeTrainEnd from "./events/Channel/HypeTrain/HypeTrainEnd";
import ShieldModeBegin from "./events/Channel/ShieldMode/ShieldModeBegin";
import ShieldModeEnd from "./events/Channel/ShieldMode/ShieldModeEnd";
import ShoutoutCreate from "./events/Channel/Shoutout/ShoutoutCreate";
import ShoutoutReceived from "./events/Channel/Shoutout/ShoutoutReceived";
import StreamOnline from "./events/StreamOnline";
import StreamOffline from "./events/StreamOffline";
import UserAuthorizationGrant from "./events/UserAuthorizationGrant";
import UserAuthorizationRevoke from "./events/UserAuthorizationRevoke";
import WhisperReceived from "./events/WhisperReceived";


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

export type NotificationHypeTrainProgress = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<HypeTrainProgress["type"], HypeTrainProgressEvent>>;

export type NotificationHypeTrainEnd = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<HypeTrainEnd["type"], HypeTrainEndEvent>>;

export type NotificationShieldModeBegin = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ShieldModeBegin["type"], ShieldModeBeginEvent>>;

export type NotificationShieldModeEnd = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ShieldModeEnd["type"], ShieldModeEndEvent>>;

export type NotificationShoutoutCreate = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ShoutoutCreate["type"], ShoutoutCreateEvent>>;

export type NotificationShoutoutReceived = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<ShoutoutReceived["type"], ShoutoutReceivedEvent>>;

export type NotificationStreamOnline = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<StreamOnline["type"], StreamOnlineEvent>>;

export type NotificationStreamOffline = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<StreamOffline["type"], StreamOfflineEvent>>;

export type NotificationUserAuthorizationGrant = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<UserAuthorizationGrant["type"], UserAuthorizationGrantEvent>>;

export type NotificationUserAuthorizationRevoke = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<UserAuthorizationRevoke["type"], UserAuthorizationRevokeEvent>>;

export type NotificationWhisperReceived = BaseEventSubMessage<"notification", BaseEventSubNotificationPayload<WhisperReceived["type"], WhisperReceivedEvent>>;

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
| NotificationHypeTrainBegin
| NotificationHypeTrainProgress
| NotificationHypeTrainEnd
| NotificationShieldModeBegin
| NotificationShieldModeEnd
| NotificationShoutoutCreate
| NotificationShoutoutReceived
| NotificationStreamOnline
| NotificationStreamOffline
| NotificationUserAuthorizationGrant
| NotificationUserAuthorizationRevoke
| NotificationWhisperReceived;

export interface PingMessage {
  type: "PING";
}

export type EventSubMessage = PingMessage
| ESWelcomeMessage
| ESReconnectMessage
| ESKeepAliveMessage
| NotificationMessage;
