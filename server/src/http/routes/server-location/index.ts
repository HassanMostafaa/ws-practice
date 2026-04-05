import { Router, Request, Response } from "express";
import { ApiResponse } from "@/types/api";

const serverLocationRouter = Router();

serverLocationRouter.get(
  "/server-location",
  (
    req: Request,
    res: Response<
      ApiResponse<{
        location: string;
      }>
    >,
  ) => {
    return res.status(200).json({
      status: "success",
      data: {
        location: "USA, New York",
      },
    });
  },
);

export default serverLocationRouter;
