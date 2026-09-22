const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const storyRoutes = require("./routes/storyRoutes");

dotenv.config();

const app = express();
const rootDir = path.resolve(__dirname, "..");
const requestedPort = Number(process.env.PORT || 3001);

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", storyRoutes);

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    service: "story-web-backend",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

app.use(express.static(rootDir));

app.get("/", (req, res) => {
  res.sendFile(path.join(rootDir, "index.html"));
});

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "Route not found"
  });
});

function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Story backend is running at http://localhost:${port}`);
    console.log(`Static frontend served from: ${rootDir}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.warn(`Port ${port} is busy. Trying ${port + 1} instead...`);
      startServer(port + 1);
      return;
    }

    console.error("Server startup error:", error);
    process.exit(1);
  });
}

startServer(requestedPort);
