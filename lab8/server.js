const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const courseRouter = require("./routes/courseRouter");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Course Management API is running...");
});

// Course routes
app.use("/api/courses", courseRouter);

// 404 route
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// Connect to MongoDB then start server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.log(error.message);
  });
