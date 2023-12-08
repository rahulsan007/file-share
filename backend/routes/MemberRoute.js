//Pay and Membership
const express = require("express");
const prisma = require("../prisma");
const authenticate = require("./Auth");
const router = express.Router();

// Upgrade user membership after successful payment
router.post("/user/upgrade-membership", authenticate, async (req, res) => {
  try {
    const user = req.user;

    // Check if the user is already a member
    if (user.member) {
      return res.status(400).json({ error: "User is already a member" });
    }

    // Perform your payment processing logic here
    // For demonstration purposes, let's assume the payment is successful

    // Update user membership and increase maxUpload
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        member: true,
        maxUpload: 999,
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

module.exports = router;
