const JWT = require("jsonwebtoken");
const Player = require("../models/player");

async function tokenChecker(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    const player = await Player.findById(payload.sub);

    if (!player) {
      return res.status(401).json({ message: "Player not found" });
    }

    if (player.tokenVersion !== payload.tokenVersion) {
      return res
        .status(401)
        .json({ message: "Token expired, please complete today's quiz" });
    }

    req.player_id = player._id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  tokenChecker,
};
