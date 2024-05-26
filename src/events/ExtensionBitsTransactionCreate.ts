import {
  ExtensionBitsTransactionCreateEvent,
  ExtensionBitsTransactionCreateSubscription,
} from "../types/events";
import BaseEvent from "../util/BaseEvent";


export default class ExtensionBitsTransactionCreate extends BaseEvent<ExtensionBitsTransactionCreateEvent> implements ExtensionBitsTransactionCreateSubscription {
  readonly type = "extension.bits_transaction.create";
  readonly version = "1";
  readonly permissions = [];

  private extensionClientId: string;

  get channel() {
    return [];
  }

  get condition() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (..._args: string[]) => {
      // always expect arg count to be channel array length + 1
      return {
        extension_client_id: this.extensionClientId,
      };
    };
  }
  
  constructor(extensionClientId: string, ...args: ((arg: ExtensionBitsTransactionCreateEvent) => void)[]) {
    super(args);
    this.extensionClientId = extensionClientId;
  }
}
