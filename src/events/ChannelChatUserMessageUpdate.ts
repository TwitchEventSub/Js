import {
  ChannelChatUserMessageUpdateEvent,
  ChannelChatUserMessageUpdateSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";

interface ChannelChatUserMessageUpdateCondition {
  channel: string;
  /** The user to read chat as. */
  user: string;
}

/** channel:bot required for app access token */
export default class ChannelChatUserMessageUpdate extends BaseEvent<ChannelChatUserMessageUpdateEvent> implements ChannelChatUserMessageUpdateSubscription {
  readonly type = "channel.chat.user_message_update";
  readonly version = "1";
  readonly permissions = ["user:read:chat"];

  private _channel: string;
  private _user: string;

  get channel() {
    return [this._channel, this._user];
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
  
  constructor(props: ChannelChatUserMessageUpdateCondition, ...args: ((arg: ChannelChatUserMessageUpdateEvent) => void)[]) {
    super(args);
    this._channel = props.channel;
    this._user = props.user;
  }
}
