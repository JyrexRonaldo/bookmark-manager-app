import resetPasswordController from "../controllers/resetPasswordController.ts";
import { Router } from "express";
const resetPasswordRouter = Router();

resetPasswordRouter.route("/").post(resetPasswordController.sendResetLink);
resetPasswordRouter.route("/:token").post(resetPasswordController.changePassword);

export default resetPasswordRouter;
