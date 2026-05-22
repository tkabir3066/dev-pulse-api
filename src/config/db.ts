import { Pool } from "pg";
import config from "../config/env";

export const pool = new Pool({
  connectionString: config.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const initDB = async () => {
  try {
    // Drop old tables
    // await pool.query(`
    //   DROP TABLE IF EXISTS issues CASCADE;
    // `);

    // await pool.query(`
    //   DROP TABLE IF EXISTS users CASCADE;
    // `);

    await pool.query(`

            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(25) DEFAULT 'contributor',
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )
            `);
    await pool.query(`

        CREATE TABLE IF NOT EXISTS issues (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150) NOT NULL,

        description TEXT NOT NULL
        CHECK (LENGTH(description) >= 20),

        type VARCHAR(20) NOT NULL
            CHECK (type IN ('bug', 'feature_request')),

        status VARCHAR(20) NOT NULL DEFAULT 'open',

        reporter_id INT NOT NULL,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
      `);

    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};
