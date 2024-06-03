import Automod from "./Automod";
import Channel from "./Channel";
import Stream from "./Stream";
import User from "./User";

export default {
  ...Automod,
  ...Channel,
  ...Stream,
  ...User,
};
