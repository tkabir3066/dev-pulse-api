import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import type { IUser } from "./auth.interface";
import config from "../../config/env";

const registerUserIntoDB = async (payload: IUser) => {
  const { name, email, password, role } = payload;

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.BCRYPT_SALT_ROUND),
  );

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,COALESCE($4,'contributor'))   RETURNING *
    `,
    [name, email, hashedPassword, role],
  );

  delete result.rows[0].password;

  return result;
};

export const AuthService = {
  registerUserIntoDB,
};
