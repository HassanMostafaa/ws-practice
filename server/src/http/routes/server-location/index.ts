import { Router, Request, Response } from "express";
import { ApiResponse } from "@/types/api";
import { pool } from "@/lib/db";
import { getServerLocationRowFromDB, ServerLocationRow } from "./db";

const serverLocationRouter = Router();

serverLocationRouter.get(
  "/server-location",
  async (req: Request, res: Response<ApiResponse<ServerLocationRow>>) => {
    const data = await getServerLocationRowFromDB();

    if (!data) {
      return res.status(404).json({
        status: "error",
        message: "Server location data not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        id: data?.id,
        location: data?.location,
      },
    });
  },
);

export default serverLocationRouter;
