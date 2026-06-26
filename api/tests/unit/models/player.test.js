require("../../mongodb_helper");
const Player = require("../../models/player");

describe("Player model", () => {
  beforeEach(async () => {
    await Player.deleteMany({});
  });

  it("has a playername", () => {
    const player = new Player({
      playername: "someone",
      score: 0,
    });
    expect(player.playername).toEqual("someone");
  });

  it("has a score", () => {
    const player = new Player({
      playername: "someone",
      score: 0,
    });
    expect(player.score).toEqual(0);
  });

  it("can list all players", async () => {
    const players = await Player.find();
    expect(players).toEqual([]);
  });

  it("can save a player", async () => {
    const player = new Player({
      playername: "someone",
      score: 0,
    });

    await player.save();
    const players = await Player.find();

    expect(players[0].playername).toEqual("someone");
    expect(players[0].score).toEqual(0);
  });
});
