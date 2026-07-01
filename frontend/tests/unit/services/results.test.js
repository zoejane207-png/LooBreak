import createFetchMock from "vitest-fetch-mock";
import { createPlayer, getPlayers } from "../../../src/services/results";
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
      const result = await createPlayer({
        playername: "testPlayer",
        score: "testScore",
      });
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/players`);
      expect(options.method).toEqual("POST");
      expect(options.headers["Content-Type"]).toEqual("application/json");
      expect(JSON.parse(options.body)).toEqual({
        playername: "testPlayer",
        score: "testScore",
      });
      expect(result).toEqual({ playername: "testPlayer", score: "testScore" });
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
        await createPlayer({ playername: "testPlayer", score: "testScore" });
      } catch (err) {
        expect(err.message).toEqual("Unable to create player and record score");
      }
    });

    test("network fetch failure", async () => {
      expect.assertions(1);
      fetch.mockRejectOnce(new Error("Network error"));
      try {
        await createPlayer({ playername: "testPlayer", score: "testScore" });
      } catch (err) {
        expect(err.message).toEqual("Network error");
      }
    });
  });

  describe("getPlayers", () => {
    test("it gets all players and returns 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({
          requests: [],
        }),
        {
          status: 200,
        },
      );
      const result = await getPlayers();
      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/players`);
      expect(options.method).toEqual("GET");
      expect(result).toEqual({ requests: [] });
    });

    test("it throws an error if status is not 200", async () => {
      expect.assertions(1);
      fetch.mockResponseOnce(
        JSON.stringify({
          message: "Unable to fetch players and their scores",
        }),
        {
          status: 400,
        },
      );
      try {
        await getPlayers();
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch players and their scores");
      }
    });

    test("network fetch failure", async () => {
      expect.assertions(1);
      fetch.mockRejectOnce(new Error("Network error"));
      try {
        await getPlayers();
      } catch (err) {
        expect(err.message).toEqual("Network error");
      }
    });
  });
});
