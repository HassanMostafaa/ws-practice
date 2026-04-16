import { Router, Request, Response } from "express";
import { ApiResponse } from "@/types/api";

const healthCheckRouter = Router();

healthCheckRouter.get(
  "/health",
  (req: Request, res: Response<ApiResponse<null>>) => {
    const fail = req.query.fail === "true";

    if (fail) {
      return res.status(500).json({
        message: "Simulated server failure",
        status: "error",
      });
    }

    return res.status(200).json({
      message: "✅ HTTPS Protocol API is running and healthy",
      status: "success",
    });
  },
);

export default healthCheckRouter;
