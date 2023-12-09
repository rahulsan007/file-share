const express = require("express");
const prisma = require("../prisma");
const {
  enccryptPassword,
  comparePassword,
  generateToken,
  cookieOptions,
} = require("../constant/constant");
const authenticate = require("./Auth");
const router = express.Router();

//Create User
router.post("/user/sign-up", async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username)
    return res.status(400).json({ error: "Please fill all required fields" });

  const emailofUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (emailofUser) {
    return res.status(400).json({ error: "User already exists" });
  }
  const usernameofUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (usernameofUser) {
    return res.status(400).json({ error: "Username already exist" });
  }

  const hashedPassword = await enccryptPassword(password);

  const createUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });

  delete createUser.password;

  const user = createUser;

  // const tokenPayload = { userId: user.id, userEmail: user.email };
  const token = generateToken(user);

  return res
    .cookie("token", token, cookieOptions)
    .status(200)
    .json({ user, token });
});

//Sign In
router.post("/user/sign-in", async (req, res) => {
  console.log("Received login request");
  const { email, password, username } = req.body;
  var emailofUser;
  var usernameofUser;
  if (email) {
    var emailofUser = await prisma.user?.findUnique({
      where: {
        email,
      },
    });
  }

  if (username) {
    var usernameofUser = await prisma.user?.findUnique({
      where: {
        username,
      },
    });
  }

  if (!emailofUser && !usernameofUser)
    return res.status(400).json({ error: "User does not exist" });

  const hashedPassword =
    (await emailofUser?.password) || (await usernameofUser?.password);

  const afterCompare = await comparePassword(password, hashedPassword);

  if (!afterCompare)
    return res.status(400).json({ error: "Invalid credentials" });

  delete emailofUser?.password;
  delete usernameofUser?.password;

  const user = emailofUser || usernameofUser;

  // const tokenPayload = { userId: user.id, userEmail: user.email };
  const token = generateToken(user);

  return res.status(200).json({ user, token });
});

//Sign Out
router.get("/user/sign-out", (req, res) => {
  return res.clearCookie("token").json({ message: "Sign out successfully" });
});

//Get User Deatils
router.get("/user/me", authenticate, async (req, res) => {
  const user = req.user;
  return res.status(200).json(user);
});

//Update User Details
router.put("/user/update", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const { username, email, name } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        username: username || user.username,
        email: email || user.email,
        name: name || user.name,
      },
    });

    delete updatedUser.password;

    // Respond with the updated user
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Update Password
router.put("/user/update-password", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const { password, newPassword } = req.body;

    const getUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    const isPasswordValid = await comparePassword(password, getUser.password);

    if (!isPasswordValid)
      return res.status(400).json({ error: "Invalid credentials" });

    const hashedPassword = await enccryptPassword(newPassword);
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
