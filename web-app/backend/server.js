import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";  // Make sure this is correct
import postsRoutes from "./routes/posts.js";
import environmentsRoutes from "./routes/environments.js";
import devicesRoutes from "./routes/device.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  // Ensure this matches the frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use((req, res, next) => {
  console.log(`${req.method} request made to: ${req.url}`);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/users", usersRoutes); 
app.use("/api/posts", postsRoutes);
app.use("/api/environments", environmentsRoutes);
app.use("/api/device", devicesRoutes);


// Root route
app.get("/", (req, res) => {
  console.log("GET / hit");
  res.send("Hello MERN!");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
