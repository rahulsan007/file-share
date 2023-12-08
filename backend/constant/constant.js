const bcrypt = require("bcrypt");
const prisma = require("../prisma");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  maxAge: 3600000, // 1 hour in milliseconds
  httpOnly: true, // The cookie is only accessible via HTTP(S) and not JavaScript
};

const enccryptPassword = async (password) => {
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const generateToken = (payload) => {
  const secretKey = process.env.JWT_SECRET;
  const expiresIn = "1h";
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

module.exports = {
  enccryptPassword,
  comparePassword,
  generateToken,
  cookieOptions,
};
