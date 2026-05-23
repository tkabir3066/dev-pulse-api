import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { IssueService } from "./issue.service";

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
    statusCode: StatusCodes.CREATED,
    message: "Issues retrieved successfully",
    data: result,
  });
});

export const IssueController = {
  createIssue,
  getAllIssues,
};
