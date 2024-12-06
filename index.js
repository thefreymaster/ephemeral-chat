import express from "express";
import cors from "cors";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express  ------------------------------------------------------------
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Update this to match your client URL in production
    methods: ["GET", "POST"],
  },
});

// Middlewares -------------------------------------------------------------
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "dist")));

app.post("/v1/session/create", async (req, res) => {
  console.log({ endpoint: "/v1/session/create" });
  const sessionId = Math.random().toString(36).substr(2, 4); // Generate 4-character session ID
  res.json({ sessionId });
});

io.on("connection", (socket) => {
  socket.on("joinSession", (sessionId) => {
    console.log(`User ${socket.id} joined session ${sessionId}`);
    socket.join(sessionId); // Add the user to the room
  });

  socket.on("send", ({ message, sessionId }) => {
    console.log("message received");
    io.in(sessionId).emit("sendBroadcast", {
      message,
      messageAuthor: socket.id,
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 6001;
server.listen(PORT, () => {
  console.log(`Ephemeral Chat API is running on http://localhost:${PORT}/api`);
});
