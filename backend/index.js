const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const categoryRoute = require("./routes/categories");
const postRoute = require("./routes/posts");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

var corsOptions = {
    origin: "*",
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
  

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log("Connected to MDB"))
    .catch((err) => console.log("Error: ",err));

//Uploading a file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });

  const upload = multer({ storage });
    app.post("/backend/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded!");
  });

app.use("/backend/categories", categoryRoute);
app.use("/backend/posts", postRoute);
app.use("/backend/users", userRoute);
app.use("/backend/auth", authRoute);

app.listen("5000", () => {
    console.log("Backend is running");
});
