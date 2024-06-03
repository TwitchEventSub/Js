import {
  ChannelChatUserMessageHoldEvent,
  ChannelChatUserMessageHoldSubscription,
} from "../../../types/events";
import BaseEvent from "../../../util/BaseEvent";

interface ChannelChatUserMessageHoldCondition {
  channel: string;
  /** The user to read chat as. */
  user: string;
}

/** channel:bot required for app access token */
export default class ChannelChatUserMessageHold extends BaseEvent<ChannelChatUserMessageHoldEvent> implements ChannelChatUserMessageHoldSubscription {
  readonly type = "channel.chat.user_message_hold";
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
  
  constructor(props: ChannelChatUserMessageHoldCondition, ...args: ((arg: ChannelChatUserMessageHoldEvent) => void)[]) {
    super(args);
    this._channel = props.channel;
    this._user = props.user;
  }
}
