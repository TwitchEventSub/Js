import { jest, describe, it, expect, afterAll } from "@jest/globals";
import { RequestInit } from "node-fetch";


const responseObject = {
  client_id: "client_id",
  scopes: [],
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
        && "Authorization" in data.headers
        && data.headers.Authorization === "Bearer auth"
        ? resolve({ json: () => Promise.resolve(responseObject) })
        : rej(new Error("No Authorization")));
    }),
  };
});

import getUserAsync from "../util/getUserAsync";

describe("getUserAsync", () => {
  it("should return validation data", async () => {
    const auth = "auth";
    const result = await getUserAsync(auth);
    expect(result)
    .toEqual(responseObject);
  });

  it("should throw an error straight from fetch", async () => {
    const auth = "";
    await expect(getUserAsync(auth))
    .rejects
    .toThrow(new Error("No Authorization"));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
