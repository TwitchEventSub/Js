export interface TwitchMaxPerStream {
  /** Is the setting enabled. */
  is_enabled: boolean;
  /** The max per stream limit. */
  value: number;
}

export interface TwitchMaxPerUserPerStream {
  /** Is the setting enabled. */
  is_enabled: boolean;
  /** The max per user per stream limit. */
  value: number;
}

export interface TwitchImage {
  /** URL for the image at 1x size. */
  url_1x: string;
  /** URL for the image at 2x size. */
  url_2x: string;
  /** URL for the image at 4x size. */
  url_4x: string;
}

export interface TwitchGlobalCooldown {
  /** Is the setting enabled. */
  is_enabled: boolean;
  /** The cooldown in seconds. */
  seconds: number;
}

export interface TwitchReward {
  /** The reward identifier. */
  id: string;
  /** The reward name. */
  title: string;
  /** The reward cost. */
  cost: number;
  /** The reward description. */
  promps: string;
}

export interface TwitchChoices {
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

export interface TwitchBitsVoting {
  is_enabled: boolean;
  amount_per_vote: number;
}

export interface TwitchTopPredictors<Ended extends boolean> extends BaseUser {
  /** The number of Channel Points won. */
  channel_points_won: Ended extends true ? number : null;
  /** The number of Channel Points used to participate in the Prediction. */
  channel_points_used: number;
}

export interface TwitchOutcomes<Ended extends boolean> {
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

export interface TwitchEmote {
  /** The index of where the Emote starts in the text. */
  begin: number;
  /** The index of where the Emote ends in the text. */
  end: number;
  /** The emote ID. */
  id: string;
}

export interface TwitchMessage {
  /** The text of the resubscription chat message. */
  text: string;
  /** An array that includes the emote ID and start and end positions for where the emote appears in the text. */
  emotes: TwitchEmote[];
}

export interface TwitchContribution extends BaseUser {
  /** The contribution method used. */
  type: "bits" | "subscription" | "other";
  /** The total amount contributed.
   * If `type` is `bits`, `total` represents the amount of Bits used.
   * If type is `subscription`, total is 500, 1000, or 2500 to represent tier 1, 2, or 3 subscriptions, respectively.
   */
  total: number;
}

export type SubType = "1000" | "2000" | "3000";
