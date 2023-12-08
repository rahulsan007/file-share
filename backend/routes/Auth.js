const express = require("express");
const jwt = require("jsonwebtoken");
const { cookieOptions } = require("../constant/constant");
const prisma = require("../prisma");

async function authenticate(req, res, next) {
  const getToken = req.cookies.token;
  if (!getToken) return res.status(401).json({ error: "Unauthenticated" });
  const decoded = jwt.verify(getToken, process.env.JWT_SECRET);
  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!user) return res.status(401).json({ error: "Unauthenticated" });

  delete user.password;

  req.user = user;

  next();
}

module.exports = authenticate;
