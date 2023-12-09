const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", require("./routes/UserRoute.js"));
app.use("/api", require("./routes/FileRoute.js"));
app.use("/api", require("./routes/MemberRoute.js"));
app.use("/api", require("./routes/DownloadRoute.js"));

async function serverStart() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

serverStart();
