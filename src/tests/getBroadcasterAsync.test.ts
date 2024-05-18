import { jest, describe, it, expect, afterAll } from "@jest/globals";
import { RequestInit } from "node-fetch";


const responseObject = {
  id: "id",
  login: "login",
  display_name: "display_name",
  type: "staff",
  broadcaster_type: "",
  description: "description",
  profile_image_url: "profile_image_url",
  offline_image_url: "offline_image_url",
  created_at: "created_at",
};

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
        && data?.headers?.["Client-Id"] === "1"
        ? resolve({ json: () => Promise.resolve(responseObject) })
        : rej(new Error("No Client-Id")));
    }),
  };
});

import getBroadcasterAsync from "../util/getBroadcasterAsync";

describe("getBroadcasterAsync", () => {
  it("should return broadcaster data", async () => {
    const auth = "auth";
    const broadcaster = "broadcaster";
    const clientId = "1";
    const result = await getBroadcasterAsync(auth, broadcaster, clientId);
    expect(result)
    .toEqual(responseObject);
  });

  it("should throw an error straight from fetch", async () => {
    const auth = "auth";
    const broadcaster = "broadcaster";
    const clientId = "2";
    await expect(getBroadcasterAsync(auth, broadcaster, clientId))
    .rejects
    .toThrow(new Error("No Client-Id"));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
