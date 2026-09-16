import resetPasswordController from "../controllers/resetPasswordController.ts";
import { Router } from "express";
const resetPasswordRouter = Router();

resetPasswordRouter.route("/").post(resetPasswordController.sendResetLink);


export default resetPasswordRouter;
