import { StatusCodes } from "http-status-codes";
import { pool } from "../../config/db";
import ApiError from "../../errors/apiError";
import type { TIssue } from "./issue.interface";

const createIssueIntoDB = async (payload: TIssue, reporterId: number) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `
    INSERT INTO issues(title, description, type, reporter_id)
    VALUES($1, $2, $3, $4)
    RETURNING *;
  `,
    [title, description, type, reporterId],
  );
  return result.rows[0];
};

const getAllIssuesFromDB = async (query: Record<string, string>) => {
  const { sort = "newest", type, status } = query;

  let sql = `SELECT * FROM issues`;
  const conditions: string[] = [];
  const values: string[] = [];

  // filtering
  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  // add WHERE condition
  if (conditions.length > 0) {
    sql += ` WHERE ` + conditions.join(" AND ");
  }

  // sorting
  if (sort === "oldest") {
    sql += ` ORDER BY created_at ASC`;
  } else {
    sql += ` ORDER BY created_at DESC`;
  }

  // get issues
  const issuesResult = await pool.query(sql, values);

  const issues = issuesResult.rows;

  // collect reporter ids
  const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];

  let reportersMap: Record<number, any> = {};

  if (reporterIds.length > 0) {
    const reportersResult = await pool.query(
      `
      SELECT id, name, role
      FROM users
      WHERE id = ANY($1)
      `,
      [reporterIds],
    );

    reportersMap = reportersResult.rows.reduce(
      (acc, reporter) => {
        acc[reporter.id] = reporter;
        return acc;
      },
      {} as Record<number, any>,
    );
  }

  const formattedIssues = issues.map((issue) => ({
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,

    reporter: reportersMap[issue.reporter_id] || null,

    created_at: issue.created_at,
    updated_at: issue.updated_at,
  }));

  return formattedIssues;
};

const getSingleIssueFromDB = async (issueId: number) => {
  const issueResult = await pool.query(
    `
    SELECT *
    FROM issues
    WHERE id = $1
    `,
    [issueId],
  );

  const issue = issueResult.rows[0];

  // issue not found
  if (!issue) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Issue not found");
  }

  const reporterResult = await pool.query(
    `
    SELECT id, name, role
    FROM users
    WHERE id = $1
    `,
    [issue.reporter_id],
  );

  const reporter = reporterResult.rows[0] || null;

  const formattedIssue = {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,

    reporter,

    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };

  return formattedIssue;
};

export const IssueService = {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
};
