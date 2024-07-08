import {} from "dotenv/config";
import express from "express";
import { connectDB } from "./db/connection.js";
import cors from "cors";
import fileupload from "express-fileupload";
// import routes
import devitRoutes from "./routes/devit.route.js";
import userRoutes from "./routes/user.route.js";
import apiRoutes from "./routes/api.route.js";
import imageRoutes from "./routes/image.route.js";
import botRoutes from "./routes/bots.route.js";

import path from "path";
// require("dotenv").config({ silent: process.env.NODE_ENV === "production" });

const app = express();

app.use(express.json()); // handle json data
app.use(cors()); //allow cors
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
connectDB(); // connect to db
app.use(fileupload()); // file upload
app.use("/uploads", express.static("uploads")); // for serving static files

// define routes
app.use("/api/devit", devitRoutes);
app.use("/api/user", userRoutes);
app.use("/api", apiRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/bot", botRoutes);

// if (process.env.NODE_ENV === "production") {
//   //Set static folder
//   app.use(express.static("../client/public"));
//   app.get("*", (req, res) => {
//     res.sendFile("/root/CodersCircle/client/public/index.html"); // absolute path configured for server
//   });
// }
const __dirname = path.resolve();
console.log(__dirname);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is Runn....");
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on port 8000");
});
