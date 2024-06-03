import {
  ChannelChatMessageDeleteEvent,
  ChannelChatMessageDeleteSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

interface ChannelChatMessageDeleteCondition {
  channel: string;
  /** The user to read chat as. */
  user: string;
}

/** channel:bot required for app access token */
export default class ChannelChatMessageDelete extends BaseEvent<ChannelChatMessageDeleteEvent> implements ChannelChatMessageDeleteSubscription {
  readonly type = "channel.chat.message_delete";
  readonly version = "1";

  private _channel: string;
  private _user: string;

  get channel() {
    return [this._channel, this._user];
  }

  get permissions() {
    return (tokenPermissions: string[]) => {
      return ["user:read:chat"].filter((permission) => !tokenPermissions.includes(permission));
    };
  }

  get condition() {
    return (...args: string[]) => {
      // always expect arg count to be channel array length + 1
      return {
        broadcaster_user_id: args[0],
        user_id: args[1],
      };
    };
  }
  
  constructor(props: ChannelChatMessageDeleteCondition, ...args: ((arg: ChannelChatMessageDeleteEvent) => void)[]) {
    super(args);
    this._channel = props.channel;
    this._user = props.user;
  }
}
