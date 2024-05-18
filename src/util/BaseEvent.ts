import type { BaseEventManagement, EventIndex } from "../types/events";

export default class BaseEvent<T> implements BaseEventManagement<T> {
  private index: EventIndex = 0;
  protected listeners: Record<EventIndex, ((arg: T) => void)> = {};

  constructor(arg?: ((arg: T) => void)[]) {
    if (arg) {
      this.index = arg.length;
      this.listeners = { ...arg };
    }
  }

  addEventListener(listener: (arg: T) => void) {
    const index = this.index;
    this.index += 1;
    this.listeners[index] = listener;
    return index;
  }

  removeEventListener(listenerIndex: EventIndex | ((arg: T) => void)) {
    let index = typeof listenerIndex === "number" ? listenerIndex : -1;
    if (index === -1) {
      for (const key in this.listeners) {
        if (this.listeners[key] === listenerIndex) {
          index = +key;
          break;
        }
      }

      if (index === -1) {
        return;
      }
    }

    delete this.listeners[index];
  }

  dispatchEvent(arg: T) {
    for (const key in this.listeners) {
      this.listeners[key](arg);
    }
  }
}
