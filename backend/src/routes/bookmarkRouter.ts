import { Router } from "express";
const bookmarkRouter = Router();
// const bookmarkController
import bookmarkController from "../controllers/bookmarkController.ts";

bookmarkRouter.route("/").get(bookmarkController.getAllBookmarks);

export default bookmarkRouter;