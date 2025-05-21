import express from "express";
// import mongoose, { Mongoose } from "mongoose";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import keyRoutes from "./routes/keys.js";
import authRoutes from "./routes/auth.js";
// import todoRoutes from "./routes/posts.js";
import logger from "./middlewares/logger.js";
import { authorizeKey } from "./middlewares/authorize.js";
import { errorHandler } from "./middlewares/errorHandlers.js";

//consfig
dotenv.config();
const app = express();
const PORT = process.env.PORT;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

//middleware
app.use(express.json());
app.use(cors());
app.use(logger);
app.use(authorizeKey);

//routes
app.use("/api/auth", authRoutes);
app.use("/api/keys", keyRoutes);
// app.use("/api/posts", postRoutes);

//DB EmitsEVENTS
database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Database Connected");
  // start server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

app.use(errorHandler);
