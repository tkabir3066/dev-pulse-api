import { Router } from "express";
import auth from "../../middlewares/auth";
import { IssueController } from "./issue.controller";

const router = Router();

router.get("/", IssueController.getAllIssues);
router.get("/:id", IssueController.getSingleIssue);

router.post(
  "/",
  auth("contributor", "maintainer"),
  IssueController.createIssue,
);

router.patch(
  "/:id",
  auth("contributor", "maintainer"),
  IssueController.updateIssue,
);
router.delete("/:id", auth("maintainer"), IssueController.deleteIssue);

export const IssueRoutes = router;
