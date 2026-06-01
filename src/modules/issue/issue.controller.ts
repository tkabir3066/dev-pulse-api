import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { IssueService } from "./issue.service";
import type { JwtPayload } from "jsonwebtoken";

const createIssue = catchAsync(async (req: Request, res: Response) => {
  const reporterId = req.user?.id;

  const result = await IssueService.createIssueIntoDB(req.body, reporterId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Issue created successfully",
    data: result,
  });
});
const getAllIssues = catchAsync(async (req: Request, res: Response) => {
  const result = await IssueService.getAllIssuesFromDB(
    req.query as Record<string, string>,
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Issues retrieved successfully",
    data: result,
  });
});
const getSingleIssue = catchAsync(async (req: Request, res: Response) => {
  const issueId = Number(req.params.id);

  const result = await IssueService.getSingleIssueFromDB(issueId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Issue retrieved successfully",
    data: result,
  });
});
const updateIssue = catchAsync(async (req: Request, res: Response) => {
  const issueId = Number(req.params.id);

  const user = req.user;

  const result = await IssueService.updateIssueIntoDB(
    issueId,
    req.body,
    user as JwtPayload,
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Issue updated successfully",
    data: result,
  });
});
const deleteIssue = catchAsync(async (req: Request, res: Response) => {
  await IssueService.deleteIssueFromDB(Number(req.params.id));

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Issue Deleted successfully",
    data: null,
  });
});

export const IssueController = {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
