import { Pool, type PoolConfig } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const isLocal =
  process.env.DATABASE_URL.includes("localhost") ||
  process.env.DATABASE_URL.includes("127.0.0.1");

const config: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
};

if (!isLocal) {
  config.ssl = {
    rejectUnauthorized: false,
  };
}

export const pool = new Pool(config);
