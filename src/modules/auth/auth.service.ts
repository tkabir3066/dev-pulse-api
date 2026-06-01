import bcrypt from "bcryptjs";
import jwt, { type SignOptions } from "jsonwebtoken";
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

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;

  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  if (userData.rows.length === 0) {
    throw new Error("User does not exist");
  }

  const user = userData.rows[0];

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  console.log(isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new Error("Invalid Credentials");
  }

  //if password matched then generate token
  const jwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.JWT.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: config.JWT.JWT_ACCESS_TOKEN_EXPIRE,
  } as SignOptions);

  delete user.password;
  return { accessToken, user };
};

export const AuthService = {
  registerUserIntoDB,
  loginUserIntoDB,
};
