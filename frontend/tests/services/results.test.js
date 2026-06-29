import createFetchMock from "vitest-fetch-mock";
import { createPlayer } from "../../src/services/results";
import { describe, vi } from "vitest";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

createFetchMock(vi).enableMocks();

describe("results service", () => {
  describe("createPlayer", () => {
    test("it creates a player", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          playername: "testPlayer",
          score: "testScore",
        }),
        {
          status: 200,
        },
      );
      await createPlayer("testPlayer", "testScore");
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/players`);
      expect(options.method).toEqual("POST");
      expect(options.body).toBeInstanceOf(FormData);
    });

    test("it throws an error if the request failed", async () => {
      expect.assertions(1);
      fetch.mockResponseOnce(
        JSON.stringify({
          message: "Unable to create player and record score",
        }),
        {
          status: 400,
        },
      );
      try {
        await createPlayer("testPlayer", "testScore");
      } catch (err) {
        expect(err.message).toEqual("Unable to create player and record score");
      }
    });
  });
});
