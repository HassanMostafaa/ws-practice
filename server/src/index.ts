import "dotenv/config";
import { createServer } from "node:http";
import express from "express";
import { registerRoutes } from "./http/routes";
import { initWebSocket } from "./websocket";
import cors from "cors";

const PORT = process.env.PORT || 3002;

const app = express();

const server = createServer(app);

// middlewares
app.use(express.json());
// CORS (place BEFORE routes)
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

// routes
registerRoutes(app);

// websocket (attach to same server)
initWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
