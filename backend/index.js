import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./route/user.route.js";
import promtRoutes from "./route/promt.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;
const MONGO_URL = process.env.MONGODB_URI;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
// enable credentials

app.use(cors(
  {
      origin: 'http://localhost:5173',
    credentials: true, 
  }
));

// Root route
app.get("/", (req, res) => {
  res.send("✅ DeepSeek AI Backend is Running");
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB Connection Error: ", error));

// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/prompts", promtRoutes);


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
