const bcrypt = require("bcrypt");
const prisma = require("../prisma");
const jwt = require("jsonwebtoken");
const shortid = require("short-unique-id");

const cookieOptions = {
  path: "/", // 1 hour in milliseconds
  httpOnly: false, // The cookie is only accessible via HTTP(S) and not JavaScript
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

const generateShortId = () => {
  const uid = new shortid({ length: 6 });
  return uid.rnd();
};

module.exports = {
  enccryptPassword,
  comparePassword,
  generateToken,
  generateShortId,
  cookieOptions,
};
