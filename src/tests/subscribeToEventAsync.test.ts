import { jest, describe, it, expect, afterAll, beforeAll } from "@jest/globals";
import { RequestInit } from "node-fetch";

jest.mock("../util/fetch", () => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  const originalModule = jest.requireActual("../util/fetch") as typeof import("../util/fetch");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn<(url: string, data?: RequestInit) => Promise<unknown>>()
    .mockImplementation((_url: string, data?: RequestInit) => {
      return new Promise((resolve, rej) => typeof data?.headers === "object"
        && !Array.isArray(data.headers)
        && "Client-Id" in data.headers
        ? data.headers["Client-Id"] === "1"
          ? resolve({ status: 202 })
          : data.headers["Client-Id"] === "2"
            ? resolve({ status: 503, json: () => Promise.resolve({ reason: "test error" }) })
            : rej(new Error("Fail case"))
        : rej(new Error("No Client-Id")));
    }),
  };
});

import subscribeToEventAsync from "../util/subscribeToEventAsync";
import { setOutput } from "../util/consoleOutput";

describe("subscribeToEventAsync", () => {
  beforeAll(() => {
    setOutput("none");
  });

  it("should return true as success", async () => {
    const result = await subscribeToEventAsync({ auth: "", broadcaster: "broadcaster", clientId: "1", event: { type: "type", version: "version" }, session: "session" });
    expect(result)
    .toEqual(true);
  });

  it("should return false when server responds with status code that's not 202", async () => {
    const result = await subscribeToEventAsync({ auth: "", broadcaster: "broadcaster", clientId: "2", event: { type: "type", version: "version" }, session: "session" });
    expect(result)
    .toBe(false);
  });

  it("should return false when request fails and gets caught in `.catch` block", async () => {
    const result = await subscribeToEventAsync({ auth: "", broadcaster: "broadcaster", clientId: "3", event: { type: "type", version: "version" }, session: "session" });
    expect(result)
    .toBe(false);
  });

  afterAll(() => {
    jest.clearAllMocks();
    setOutput("error");
  });
});
