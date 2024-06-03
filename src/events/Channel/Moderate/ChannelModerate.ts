import {
  ChannelModerateEvent,
  ChannelModerateSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

export default class ChannelModerate extends BaseEvent<ChannelModerateEvent> implements ChannelModerateSubscription {
  readonly type = "channel.moderate";
  readonly version = "1";

  private _channel: string;

  get channel() {
    return [this._channel];
  }

  get permissions() {
    const blockedTerms = ["moderator:read:blocked_terms", "moderator:manage:blocked_terms"];
    const chatSettings = ["moderator:read:chat_settings", "moderator:manage:chat_settings"];
    const bannedUsers = ["moderator:read:banned_users", "moderator:manage:banned_users"];
    const chatMessages = ["moderator:read:chat_messages", "moderator:manage:chat_messages"];
    return (tokenPermissions: string[]) => {
      let hasBlockedTerms = false;
      let hasChatSettings = false;
      let hasBannedUsers = false;
      let hasChatMessages = false;
      let hasModerators = false;
      let hasVips = false;

      for (const permission of tokenPermissions) {
        if (blockedTerms.includes(permission)) {
          hasBlockedTerms = true;
        }

        if (chatSettings.includes(permission)) {
          hasChatSettings = true;
        }

        if (bannedUsers.includes(permission)) {
          hasBannedUsers = true;
        }

        if (chatMessages.includes(permission)) {
          hasChatMessages = true;
        }

        if (permission === "moderator:read:moderators") {
          hasModerators = true;
        }

        if (permission === "moderator:read:vips") {
          hasVips = true;
        }
      }

      const missingPermissions = [];

      if (!hasBlockedTerms) {
        missingPermissions.push(blockedTerms[0]);
      }

      if (!hasChatSettings) {
        missingPermissions.push(chatSettings[0]);
      }

      if (!hasBannedUsers) {
        missingPermissions.push(bannedUsers[0]);
      }

      if (!hasChatMessages) {
        missingPermissions.push(chatMessages[0]);
      }

      if (!hasModerators) {
        missingPermissions.push("moderator:read:moderators");
      }

      if (!hasVips) {
        missingPermissions.push("moderator:read:vips");
      }

      return missingPermissions;
    };
  }

  get condition() {
    return (...args: string[]) => {
      // always expect arg count to be channel array length + 1
      return {
        broadcaster_user_id: args[0],
      };
    };
  }
  
  constructor(channel: string, ...args: ((arg: ChannelModerateEvent) => void)[]) {
    super(args);
    this._channel = channel;
  }
}
