import { consoleOutput } from "./consoleOutput";
import fetch from "./fetch";

interface TypeDefinedItem {
  type: string;
  version: string;
}

interface SubscriptionProps<T extends TypeDefinedItem> {
  event: T;
  clientId: string;
  auth: string;
  session: string;
  condition: Record<string, string>;
  broadcaster: string;
}

export default async function subscribeToEventAsync<T extends TypeDefinedItem>(props: SubscriptionProps<T>) {
  let error: Error | null = null;
  consoleOutput("debug", "Subscribing to event:", props.event.type, "version:", props.event.version);
  
  const response = await fetch(
    "https://api.twitch.tv/helix/eventsub/subscriptions",
    {
      method: "POST",
      headers: {
        "Client-Id": props.clientId,
        Authorization: `Bearer ${props.auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: props.event.type,
        version: props.event.version,
        condition: props.condition,
        transport: {
          method: "websocket",
          session_id: props.session,
        },
      }),
    },
  )
  .catch((e: Error) => {
    error = e;
  });

  if (response) {
    if (response.status > 299) {
      const body = await response.json() as unknown;
      consoleOutput("error", "Subscription failed", response.status, body);
      error = new Error("subscription failed");
    }
  }

  return !error;
}
