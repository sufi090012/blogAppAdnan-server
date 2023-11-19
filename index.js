import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan"; // Import morgan for logging
import mongoose from "mongoose";
//components

import Router from "./routes/route.js";
const app = express();
dotenv.config();

app.use(morgan("dev"));
if (process.env.NODE_ENV === "production") {
  // Allow requests from your Netlify frontend domain
  app.use(
    cors({
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // Allow credentials such as cookies
    })
  );

  // Serve static files from the build folder
  app.use(express.static("FrontEnd/build", { maxAge: "1d" }));

  // Handle routes for your frontend app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "FrontEnd", "build", "index.html"));
  });
} else {
  // In development mode, you might want to enable CORS for local testing
  app.use(cors());
}
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", Router);

app.get("/", (req, res) => {
  res.send("Welcome to blogApp ");
});

const port = process.env.PORT || 8000;

mongoose
  .connect(
    "mongodb://sufi0900:sufi0900@ac-s3hligl-shard-00-00.miah2mi.mongodb.net:27017,ac-s3hligl-shard-00-01.miah2mi.mongodb.net:27017,ac-s3hligl-shard-00-02.miah2mi.mongodb.net:27017/BlogApp_1?ssl=true&replicaSet=atlas-397tbw-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
