import { Router, Request, Response } from "express";
import { ApiResponse } from "@/types/api";

const serverLocationRouter = Router();

interface IServerLocation {
  Country: string;
  City: string;
}

serverLocationRouter.get(
  "/server-location",
  (req: Request, res: Response<ApiResponse<IServerLocation>>) => {
    return res.status(200).json({
      status: "success",
      data: {
        Country: "United States",
        City: "San Francisco",
      },
    });
  },
);

export default serverLocationRouter;
