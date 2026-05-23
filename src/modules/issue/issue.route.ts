import { Router } from "express";
import auth from "../../middlewares/auth";
import { IssueController } from "./issue.controller";

const router = Router();

router.get("/", IssueController.getAllIssues);
router.post(
  "/",
  auth("contributor", "maintainer"),
  IssueController.createIssue,
);

export const IssueRoutes = router;
