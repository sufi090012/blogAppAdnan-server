import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan"; // Import morgan for logging

//components
import Connection from "./database/db.js";
import Router from "./routes/route.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // Use morgan for logging before defining routes
app.use("/", Router);

app.get("/", (req, res) => {
  res.send("Welcome to blogApp ");
});

const PORT = 8000;

Connection();

app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);
