const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const request = require("supertest");
const app = require("../../../app");
const Player = require("../../../models/player");
require("../../mongodb_helper");

function createToken(player_id, tokenVersion = 0) {
  return JWT.sign(
    {
      sub: player_id,
      tokenVersion,
      iat: Math.floor(Date.now() / 1000) - 5 * 60,
      exp: Math.floor(Date.now() / 1000) + 10 * 60,
    },
    secret,
  );
}

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
      await request(app).post("/players").send({ playername: "someone" });

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
      const players = await Player.find({ playername: "someone" });
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

  describe("GET, fetch playername and score for results badge", () => {
    test("returns the player once they have submitted their playername & score", async () => {
      const player = await Player.create({
        playername: "nonchalant",
        score: 10,
      });

      const token = createToken(player._id.toString(), player.tokenVersion);

      const response = await request(app)
        .get("/players/me")
        .set("Authorization", `Bearer ${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.playername).toEqual("nonchalant");
      expect(response.body.score).toEqual(10);
    });

    test("response with 401 when no token is provided", async () => {
      const response = await request(app).get("/players/me");

      expect(response.statusCode).toBe(401);
    });
  });

  describe("GET, fetch all players and scores for leaderboard", () => {
    test("returned in order of score value - highest to lowest", async () => {
      const player1 = new Player ({
        playername: "John",
        score: 3,
      });
      const player2 = new Player ({
        playername: "Paul",
        score: 10,
      });
      const player3 = new Player ({
        playername: "Ringo",
        score: 5,
      });

      await player1.save();
      await player2.save();
      await player3.save();

      const response = await request(app).get("/players");

      expect(response.statusCode).toBe(200);

      const data = JSON.parse(response.text);

      expect(data.players[0].playername).toBe("Paul");
      expect(data.players[0].score).toBe(10);
      expect(data.players[1].playername).toBe("Ringo");
      expect(data.players[1].score).toBe(5);
      expect(data.players[2].playername).toBe("John");
      expect(data.players[2].score).toBe(3);
    });
  });
  describe("GET, fetch players errors", () => {
    test("Returns 404 when no players in database", async () => {
      const response = await request(app).get("/players");

      expect(response.status).toBe(404);
      
      const data = response.body;
      
      expect(data.message).toBe("Players not found");
    })
  })
});
