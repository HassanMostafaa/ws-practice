import { Router, Request, Response } from "express";
import { ApiResponse } from "@/types/api";
import {
  createNoteInDB,
  deleteNotesByIdsFromDB,
  getAllNotesFromDB,
  getNoteByIdFromDB,
  updateNoteInDB,
} from "./db";
import { INote, INotes } from "./utils/types";

const notesRouter = Router();

// GET ALL
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

// BULK DELETE
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

// GET BY ID
notesRouter.get(
  "/note/:id",
  async (req: Request, res: Response<ApiResponse<INote>>) => {
    try {
      const requestedId = req?.params?.id;
      const resolvedRequestedId = Number(requestedId);

      if (!requestedId) {
        return res.status(400).json({
          status: "error",
          message: "The requested note ID is required",
        });
      }

      if (
        typeof resolvedRequestedId !== "number" ||
        !Number.isInteger(resolvedRequestedId) ||
        resolvedRequestedId < 0
      ) {
        return res.status(400).json({
          status: "error",
          message: "The requested note ID must be a valid integer",
        });
      }

      const result = await getNoteByIdFromDB(resolvedRequestedId);

      if (!result) {
        return res.status(404).json({
          status: "error",
          message: "Note does not exist, please try again later.",
        });
      }

      return res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).json({
        status: "error",
        message: "Requesting a note by id failed.",
        data: error,
      });
    }
  },
);

// CREATE NOTE
notesRouter.post(
  "/notes",
  async (req: Request, res: Response<ApiResponse<INote | null>>) => {
    try {
      const { title, content, username } = req.body;

      // title validation
      if (typeof title !== "string" || title.trim().length === 0) {
        return res.status(400).json({
          status: "error",
          message: "Title is required and must be a non-empty string",
        });
      }

      // username validation
      if (typeof username !== "string" || username.trim().length <= 3) {
        return res.status(400).json({
          status: "error",
          message: "Username is required and must be longer than 3 characters",
        });
      }

      // content validation
      if (
        content !== undefined &&
        content !== null &&
        typeof content !== "string"
      ) {
        return res.status(400).json({
          status: "error",
          message: "Content must be a string or null",
        });
      }

      const result = await createNoteInDB({
        title: title.trim(),
        username: username.trim(),
        content:
          content === undefined || content === null ? null : content.trim(),
      });

      if (!result) {
        return res.status(500).json({
          status: "error",
          message: "Creating note failed",
        });
      }

      return res.status(201).json({
        status: "success",
        message: "Note created successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Creating note failed",
      });
    }
  },
);

// UPDATE NOTE BY ID
notesRouter.patch(
  "/note/:id",
  async (req: Request, res: Response<ApiResponse<INote | null>>) => {
    try {
      const rawId = req.params.id;
      const noteId = Number(rawId);

      if (!rawId) {
        return res.status(400).json({
          status: "error",
          message: "The requested note ID is required",
        });
      }

      if (!Number.isInteger(noteId) || noteId <= 0) {
        return res.status(400).json({
          status: "error",
          message: "The requested note ID must be a valid positive integer",
        });
      }

      const { title, content, username } = req.body;

      // nothing sent
      if (
        title === undefined &&
        content === undefined &&
        username === undefined
      ) {
        return res.status(400).json({
          status: "error",
          message: "At least one field is required to update the note",
        });
      }

      // validate only passed fields
      if (title !== undefined) {
        if (typeof title !== "string" || title.trim().length === 0) {
          return res.status(400).json({
            status: "error",
            message: "Title must be a non-empty string",
          });
        }
      }

      if (username !== undefined) {
        if (typeof username !== "string" || username.trim().length <= 3) {
          return res.status(400).json({
            status: "error",
            message: "Username must be longer than 3 characters",
          });
        }
      }

      if (content !== undefined) {
        if (content !== null && typeof content !== "string") {
          return res.status(400).json({
            status: "error",
            message: "Content must be a string or null",
          });
        }
      }

      const result = await updateNoteInDB(noteId, {
        ...(title !== undefined ? { title: title.trim() } : {}),
        ...(username !== undefined ? { username: username.trim() } : {}),
        ...(content !== undefined
          ? { content: typeof content === "string" ? content.trim() : null }
          : {}),
      });

      if (!result) {
        return res.status(404).json({
          status: "error",
          message: "Note does not exist",
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Note updated successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Updating note failed.",
      });
    }
  },
);

export default notesRouter;
