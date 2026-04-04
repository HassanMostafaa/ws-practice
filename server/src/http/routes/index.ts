import type { Express } from "express";
import healthCheckRoute from "./health-check";
import serverLocationRouter from "./server-location";

export const registerRoutes = (app: Express) => {
  app.use(healthCheckRoute);
  app.use(serverLocationRouter);
};
