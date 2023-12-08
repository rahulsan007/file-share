const express = require("express");
const prisma = require("../prisma");
const authenticate = require("./Auth");
const router = express.Router();
const multer = require("multer");
const { generateShortId } = require("../constant/constant");
const { Visibility } = require("@prisma/client");
const fs = require("fs").promises; // Import the fs module with promises support
const path = require("path");

//upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueName = generateShortId();
    cb(null, `${uniqueName}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//Upload file

router.post(
  "/file/upload",
  authenticate,
  upload.single("file"),
  async (req, res) => {
    const user = req.user;
    try {
      const { filename, visibility, password } = req.file;
      if (!filename || !req.file) {
        return res
          .status(400)
          .json({ error: "Please provide a filename and file to upload" });
      }
      const shortURL = generateShortId();

      const filePath = req.file.path;

      const uploadedFile = await prisma.file.create({
        data: {
          filename,
          path: filePath,
          visibility: visibility,
          shortURL,
          password: password || null,
          userId: user.id,
        },
      });

      res.status(200).json(uploadedFile);
    } catch (error) {
      throw new Error(error);
    }
  }
);
//get all personal files
router.get("/file/all", authenticate, async (req, res) => {
  try {
    const user = req.user;

    // Retrieve all files associated with the logged-in user
    const userFiles = await prisma.file.findMany({
      where: {
        userId: user.id,
      },
    });

    res.status(200).json(userFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Check file visibility by shortURL
router.get("/file/check-visibility/:shortURL", async (req, res) => {
  try {
    const { shortURL } = req.params;

    // Retrieve the file by shortURL
    const file = await prisma.file.findUnique({
      where: {
        shortURL,
      },
    });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Determine file visibility
    let fileVisibility;
    if (file.visibility === Visibility.PUBLIC) {
      fileVisibility = "public";
    } else if (file.visibility === Visibility.PASSWORD_PROTECTED) {
      fileVisibility = "password_protected";
    } else {
      fileVisibility = "private";
    }

    res.status(200).json({ visibility: fileVisibility });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get public file
router.get("/file/public/:shortURL", async (req, res) => {
  try {
    const { shortURL } = req.params;

    // Retrieve the file by shortURL
    const file = await prisma.file.findUnique({
      where: {
        shortURL,
      },
    });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    if (file.visibility === Visibility.PRIVATE) {
      return res.status(403).json({ error: "Private file access forbidden" });
    }

    if (file.visibility === Visibility.PASSWORD_PROTECTED) {
      return res.status(403).json({ error: "Password file access forbidden" });
    }

    // For PASSWORD_PROTECTED files, do not disclose any information (additional password handling may be required)

    // Respond with the file information (excluding sensitive details like password)
    const { id, filename, path, visibility, shortURL: publicShortURL } = file;
    const publicFile = {
      id,
      filename,
      path,
      visibility,
      shortURL: publicShortURL,
    };

    res.status(200).json(publicFile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get private file
router.post("/file/access-password-protected/:shortURL", async (req, res) => {
  try {
    const { shortURL } = req.params;
    const { password } = req.body;

    // Retrieve the file by shortURL
    const file = await prisma.file.findUnique({
      where: {
        shortURL,
      },
    });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Check if the file is password-protected
    if (file.visibility !== Visibility.PASSWORD_PROTECTED) {
      return res.status(400).json({ error: "File is not password-protected" });
    }

    // Check if the provided password is correct
    if (file.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Respond with the file information (excluding sensitive details like password)
    const { id, filename, path, visibility, shortURL: publicShortURL } = file;
    const publicFile = {
      id,
      filename,
      path,
      visibility,
      shortURL: publicShortURL,
    };

    res.status(200).json(publicFile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//update visibity & passowrd
router.put(
  "/file/update-visibility/:shortURL",
  authenticate,
  async (req, res) => {
    try {
      const user = req.user;
      const { shortURL } = req.params;
      const { visibility, password } = req.body;

      // Retrieve the file by shortURL
      const file = await prisma.file.findUnique({
        where: {
          shortURL,
        },
      });

      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }

      // Check if the user is the owner of the file
      if (file.userId !== user.id) {
        return res
          .status(403)
          .json({ error: "You do not have permission to update this file" });
      }

      // Update file visibility
      await prisma.file.update({
        where: {
          shortURL,
        },
        data: {
          visibility,
          password: password || null,
        },
      });

      res.status(200).json({ message: "File visibility updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//change password only

//delete file
router.delete("/file/delete/:shortURL", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const { shortURL } = req.params;

    // Retrieve the file by shortURL
    const file = await prisma.file.findUnique({
      where: {
        shortURL,
      },
    });

    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Check if the user is the owner of the file
    if (file.userId !== user.id) {
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this file" });
    }

    // Delete the file from the filesystem
    const filePath = path.join(__dirname, "..", "uploads", file.filename);
    await fs.unlink(filePath);

    // Delete the file from the database
    await prisma.file.delete({
      where: {
        shortURL,
      },
    });

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
