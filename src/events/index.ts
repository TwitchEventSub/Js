import Automod from "./Automod";
import Channel from "./Channel";
import ExtensionBitsTransactionCreate from "./ExtensionBitsTransactionCreate";
import StreamOnline from "./StreamOnline";
import StreamOffline from "./StreamOffline";
import UserAuthorizationGrant from "./UserAuthorizationGrant";
import UserAuthorizationRevoke from "./UserAuthorizationRevoke";
import WhisperReceived from "./WhisperReceived";

export default {
  ...Automod,
  ...Channel,
  ExtensionBitsTransactionCreate,
  StreamOnline,
  StreamOffline,
  UserAuthorizationGrant,
  UserAuthorizationRevoke,
  WhisperReceived,
};
