import { Pool } from "pg";
import config from "../config/env";
import { SqlQueries } from "../sqlQuery/queries";

export const pool = new Pool({
  connectionString: config.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const initDB = async () => {
  try {
    await SqlQueries.userQuery();
    await SqlQueries.issueQuery();

    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};
