import WS from "ws";

const socket = typeof window !== "undefined" ? WebSocket : WS;

export default socket;
