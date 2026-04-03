import "dotenv/config";
import { createServer } from "node:http";
import express from "express";
import { registerRoutes } from "./http/routes";
import { initWebSocket } from "./websocket";

const PORT = process.env.PORT || 3002;

const app = express();

const server = createServer(app);

// middleware
app.use(express.json());

// routes
registerRoutes(app);

// websocket (attach to same server)
initWebSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
