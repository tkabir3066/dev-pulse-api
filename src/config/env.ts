import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  PORT: process.env.PORT as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
};

export default config;
