import { Router, Request, Response } from "express";
import { ApiResponse } from "@/types/api";
import { deleteNotesByIdsFromDB, getAllNotesFromDB } from "./db";
import { INotes } from "./utils/types";

const notesRouter = Router();

notesRouter.get(
  "/notes",
  async (req: Request, res: Response<ApiResponse<INotes>>) => {
    try {
      const pageNumber = Number(req.query.pageNumber ?? 1);
      const pageSize = Number(req.query.pageSize ?? 5);

      // WE CAN KEEP PATINATION OPTIONAL FOR NOW.
      // if (!pageNumber || !pageSize) {
      //   return res.status(400).json({
      //     status: "error",
      //     message: "Pagination params are required",
      //   });
      // }

      const data = await getAllNotesFromDB({ pageNumber, pageSize });

      return res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      console.error("Failed to fetch notes:", error);

      return res.status(500).json({
        status: "error",
        message: "Failed to fetch notes",
      });
    }
  },
);

notesRouter.delete(
  "/notes",
  async (req: Request, res: Response<ApiResponse<INotes["notes"]>>) => {
    const ids = req.body?.ids;

    // check if ids are passed
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid notes ids, notes Ids are required",
      });
    }

    // check if passed ids are valid number
    const resolvedIds: number[] = ids.filter(
      (id) => typeof id === "number" && Number.isInteger(id) && id > 0,
    );

    if (resolvedIds.length !== ids.length) {
      return res.status(400).json({
        status: "error",
        message: "All ids must be positive integers",
      });
    }

    const data = await deleteNotesByIdsFromDB(resolvedIds);

    if (data?.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Notes Ids not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Notes deleted successfully",
      data,
    });
  },
);

export default notesRouter;
