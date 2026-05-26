// import parseNewDiaryEntry from "../utils.ts";
import {
  // express,
  type Request,
  type Response,
  //   type NextFunction,
} from "express";
// import diaryService from "../services/diaryService.ts";
// import {
//   NewEntrySchema,
//   type NonSensitiveDiaryEntry,
//   NewDiaryEntry,
//   DiaryEntry,
// } from "../types.ts";
// import { z } from "zod";

// const router = express.Router();

// import { z } from "zod"
// import { NewBookmarkEntrySchema } from "../types.ts";
import db from '../../config/drizzle.ts';
import { bookmarksTable } from "../db/schema.ts";

// const getTodosByUserId = async (req: Request, res: Response) => {
//   const { userId } = req.body;
//   const result = await db
//     .select()
//     .from(todosTable)
//     .where(eq(userId, todosTable.userId));
//   res.json(result);
// };

const getAllBookmarks = async (_req: Request, _res: Response) => {
  //   const data = NewBookmarkEntrySchema.parse(req.body);
//   const data = NewBookmarkEntrySchema.parse(req.body);
const allBookmarks = await db.select().from(bookmarksTable);
  console.log(allBookmarks);
};

export default { getAllBookmarks };
