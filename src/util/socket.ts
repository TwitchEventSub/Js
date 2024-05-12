import WS from "ws";

const socket = window !== undefined ? WebSocket : WS;

export default socket;
