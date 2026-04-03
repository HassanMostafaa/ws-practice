import "dotenv/config";
import { createServer } from "node:http";
import express from "express";
import { registerRoutes } from "./http/routes";

const PORT = process.env.PORT || 3002;

const app = express();

const server = createServer(app);

registerRoutes(app);
app.use(express.json());

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
