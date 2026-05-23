import { Router } from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/signup",
  //   auth("contributor", "maintainer"),
  AuthController.registerUser,
);
router.post("/login", AuthController.login);

export const AuthRoutes = router;
