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
// CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://ws-practice.vercel.app/",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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
