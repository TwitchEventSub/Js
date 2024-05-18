import { EventSubOutput } from "../types/eventSub";

const outputTypes: EventSubOutput[] = ["debug", "info", "warn", "error", "none"];
let output = outputTypes.indexOf("error");

const setOutput = (selection: EventSubOutput) => {
  output = outputTypes.indexOf(selection);
};

const consoleOutput = (level: EventSubOutput, ...args: unknown[]) => {
  if (level !== "none" && output <= outputTypes.indexOf(level)) {
    const date = new Date();
    console[level](`[${date.toISOString()}][${level}]`,...args);
  }
};

export { setOutput, consoleOutput };
