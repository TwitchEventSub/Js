import Automod from "./Automod";
import Channel from "./Channel";
import Stream from "./Stream";
import ExtensionBitsTransactionCreate from "./ExtensionBitsTransactionCreate";
import UserAuthorizationGrant from "./UserAuthorizationGrant";
import UserAuthorizationRevoke from "./UserAuthorizationRevoke";
import WhisperReceived from "./WhisperReceived";

export default {
  ...Automod,
  ...Channel,
  ...Stream,
  ExtensionBitsTransactionCreate,
  UserAuthorizationGrant,
  UserAuthorizationRevoke,
  WhisperReceived,
};
