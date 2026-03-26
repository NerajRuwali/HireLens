import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analysisRoutes from "./routes/analysis.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api", analysisRoutes);

app.get("/", (req, res) => {
  res.send("🚀 HireLens AI API is active");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ error: "Something went wrong on our end" });
});

// Server Startup
const start = (port) => {
  app.listen(port, () => {
    console.log(`✅ Production server live at http://localhost:${port}`);
  }).on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.log(`⚠️ Port ${port} occupied, shifting to ${Number(port) + 1}`);
      start(Number(port) + 1);
    }
  });
};

start(PORT);