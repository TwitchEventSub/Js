import {
  ChannelChatClearEvent,
  ChannelChatClearSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

interface ChannelChatClearCondition {
  channel: string;
  user: string;
}

export default class ChannelChatClear extends BaseEvent<ChannelChatClearEvent> implements ChannelChatClearSubscription {
  readonly type = "channel.chat.clear";
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
  
  constructor(props: ChannelChatClearCondition, ...args: ((arg: ChannelChatClearEvent) => void)[]) {
    super(args);
    this._channel = props.channel;
    this._user = props.user;
  }
}
