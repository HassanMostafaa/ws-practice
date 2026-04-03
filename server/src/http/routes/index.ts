import healthCheckRoute from "./health-check";
import type { Express } from "express";

export const registerRoutes = (app: Express) => {
  app.use(healthCheckRoute);
};
