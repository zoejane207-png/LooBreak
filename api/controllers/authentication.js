const User = require("../models/user");
const { generateToken } = require("../lib/token");

async function createToken(req, res) {
  const username = req.body.username;

  const user = await User.findOne({ username: username });
  if (!user) {
    console.log("Auth Error: User not found");
    res.status(401).json({ message: "User not found" });
  } else {
    const token = generateToken(user.id);
    res.status(201).json({ token: token, message: "OK" });
  }
}

const AuthenticationController = {
  createToken: createToken,
};

module.exports = AuthenticationController;
