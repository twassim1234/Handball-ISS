const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const { connectDb } = require("./database/connectDB");
const routes = require("./routes");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

// Multer storage settings
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store images in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

connectDb();

// Make uploads folder publicly accessible
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  setHeaders: (res) => {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  },
}));


app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
