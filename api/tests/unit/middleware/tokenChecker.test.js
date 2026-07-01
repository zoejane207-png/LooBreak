const JWT = require("jsonwebtoken");
const Player = require("../../../models/player");
const { tokenChecker} = require("../../../middleware/tokenChecker");

jest.mock("../../../models/player", () => ({
  findById: jest.fn(),
}));
jest.mock("jsonwebtoken");

describe("tokenChecker", () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("rejects requests with no token", async () => {
    await tokenChecker(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "No token provided" });
    expect(next).not.toHaveBeenCalled();
  });

  test("rejects an invalid/unverifiable token", async () => {
    req.headers.authorization = "Bearer badtoken";
    JWT.verify.mockImplementation(() => {
      throw new Error("invalid signature");
    });

    await tokenChecker(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" });
    expect(next).not.toHaveBeenCalled();
  });

  test("rejects if the player no longer exists", async () => {
    req.headers.authorization = "Bearer sometoken";
    JWT.verify.mockReturnValue({ sub: "player123", tokenVersion: 0 });
    Player.findById.mockResolvedValueOnce(null);

    await tokenChecker(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Player not found" });
    expect(next).not.toHaveBeenCalled();
  });

  test("rejects a stale token (tokenVersion mismatch)", async () => {
    req.headers.authorization = "Bearer sometoken";
    JWT.verify.mockReturnValue({ sub: "player123", tokenVersion: 0 });
    Player.findById.mockResolvedValueOnce({
      _id: "player123",
      tokenVersion: 1,
    });

    await tokenChecker(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Token expired, please complete today's quiz",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("calls next() and sets req.player_id for a valid, current token", async () => {
    req.headers.authorization = "Bearer sometoken";
    JWT.verify.mockReturnValue({ sub: "player123", tokenVersion: 1 });
    Player.findById.mockResolvedValueOnce({
      _id: "player123",
      tokenVersion: 1,
    });

    await tokenChecker(req, res, next);

    expect(req.player_id).toBe("player123");
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
