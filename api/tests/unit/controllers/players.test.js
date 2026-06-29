const request = require("supertest");

const app = require("../../../app");
const Player = require("../../../models/player");

require("../../mongodb_helper");

describe("/players", () => {
  beforeEach(async () => {
    await Player.deleteMany({});
  });

  describe("POST, when playername is provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app)
        .post("/players")
        .send({ playername: "someone" });

      expect(response.statusCode).toBe(201);
    });

    test("a player is created", async () => {
      await request(app)
        .post("/players")
        .send({ playername: "someone" });

      const players = await Player.find();
      const newPlayer = players[players.length - 1];
      expect(newPlayer.playername).toEqual("someone");
    });
  });

  describe("POST, when playername already exists", () => {
    test("response code is 400", async () => {
      const response1 = await request(app)
        .post("/players")
        .send({ playername: "someone" });

      expect(response1.statusCode).toBe(201);

      const response2 = await request(app)
        .post("/players")
        .send({ playername: "someone" });

      expect(response2.statusCode).toBe(400);
      const players = await Player.find({playername: "someone"});
      expect(players.length).toBe(1);
    });
  });

  describe("POST, when playername is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/players")
        .send({ playername: " " });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a player", async () => {
      await request(app).post("/players").send({ playername: " " });

      const players = await Player.find();
      expect(players.length).toEqual(0);
    });
  });
});
