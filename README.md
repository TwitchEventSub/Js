# TwitcEventSub
Libary for managing twitch eventsub via websocket

## Usage

```ts
import { EventSub, events } from "twitcheventsub.js";

// creating instance
const sub = new EventSub({
  auth: "YOUR_AUTHENTICATION_KEY",
});

// creating event handler
const followEvent = new events.ChannelFollow("BROADCASTER", (e) => {
  console.log("event listener", e);
});

// push event to EventSub instance
sub.subscribe(followEvent);

try {
  // start your instance
  void sub.startAsync();
} catch (e) {
  console.error(e);
}

// append extra listeners
followEvent.addEventListener(() => {
  console.log("event listener 2");
});
```
