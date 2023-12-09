const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const prisma = require("../prisma");
// Import your Prisma instance

router.get("/file/download/:shortID", async (req, res) => {
  const shortID = req.params.shortID;

  try {
    // Retrieve the file information from the database based on shortID
    const file = await prisma.file.findUnique({
      where: {
        shortURL: shortID,
      },
    });

    if (!file) {
      return res.status(404).send("File not found");
    }

    // Construct the file path
    const filePath = path.join(__dirname, "..", "uploads", file.filename);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.log(filePath);
      return res.status(404).send("File not found");
    }

    // Determine the Content-Type based on the file extension
    const fileExtension = path.extname(file.filename).slice(1); // Get the file extension without the dot
    const contentType = getContentType(fileExtension);

    // Set the appropriate headers for the response
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.filename}`
    );
    res.setHeader("Content-Type", contentType);

    // Create a read stream from the file path and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/file/pass/download/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Retrieve the file information from the database based on shortID
    const file = await prisma.file.findUnique({
      where: {
        id,
      },
    });

    if (!file) {
      return res.status(404).send("File not found");
    }

    // Construct the file path
    const filePath = path.join(__dirname, "..", "uploads", file.filename);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.log(filePath);
      return res.status(404).send("File not found");
    }

    // Determine the Content-Type based on the file extension
    const fileExtension = path.extname(file.filename).slice(1); // Get the file extension without the dot
    const contentType = getContentType(fileExtension);

    // Set the appropriate headers for the response
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${file.filename}`
    );
    res.setHeader("Content-Type", contentType);

    // Create a read stream from the file path and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Function to get Content-Type based on file extension
function getContentType(fileExtension) {
  switch (fileExtension.toLowerCase()) {
    case "pdf":
      return "application/pdf";
    case "txt":
      return "text/plain";
    // Add more cases as needed for other file types
    default:
      return "application/octet-stream"; // Default to binary data if type is unknown
  }
}

module.exports = router;
