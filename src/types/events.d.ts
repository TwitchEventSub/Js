interface SubscriptionType {
  readonly type: string;
  readonly version: string;
  readonly permissions: string[];
}

export type EventIndex = number;

export interface BaseEventManagement<T> {
  addEventListener: (arg: (arg: T) => void) => EventIndex;
  removeEventListener: (arg: EventIndex | ((arg: T) => void)) => void;
  dispatchEvent: (arg: T) => void;
}

export type  BaseSubscription<E, T extends string> = BaseEventManagement<E>
  & Omit<SubscriptionType, "type">
  & { readonly type: T };

