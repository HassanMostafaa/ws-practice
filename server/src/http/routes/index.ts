import type { Express } from "express";
import healthCheckRoute from "./health-check";
import serverLocationRouter from "./server-location";
import notesRouter from "./notes";

export const registerRoutes = (app: Express) => {
  app.use(healthCheckRoute);
  app.use(serverLocationRouter);
  app.use(notesRouter);
};
