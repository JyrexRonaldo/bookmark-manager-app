import { Router } from "express";
import authController from "../controllers/authController.ts";
const authRouter = Router();

authRouter
  .route("/signup")
  .post(authController.createUser, authController.signIn);
authRouter.route("/signin").post(authController.signIn);

export default authRouter;
