export type EventSubOutput = "debug" | "info" | "warn" | "error" | "none";

export interface EventSubConstructor {
  auth: string;
  broadcaster: string;
  /** default: error */
  output?: EventSubOutput;
}
