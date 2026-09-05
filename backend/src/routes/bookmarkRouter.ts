import { Router } from "express";
const bookmarkRouter = Router();
// const bookmarkController
import bookmarkController from "../controllers/bookmarkController.ts";

bookmarkRouter
  .route("/")
  .get(bookmarkController.getAllBookmarks)
  .post(bookmarkController.addBookmark);

bookmarkRouter
  .route("/:id")
  .patch(bookmarkController.editBookmark)
  .delete(bookmarkController.deleteBookmark);

export default bookmarkRouter;
