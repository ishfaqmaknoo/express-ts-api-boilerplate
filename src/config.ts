import dotenv from "dotenv";
import { DEFAULT_PORT, DEFAULT_NODE_ENV } from "./constants/common.js";
import path from "path";

// Resolve the appropriate env file
const envFile = `.env.${process.env.NODE_ENV || DEFAULT_NODE_ENV}`;
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// fallback to default .env file if the specific one is not found
dotenv.config();

const config = {
  port: process.env.PORT || DEFAULT_PORT,
  nodeEnv: process.env.NODE_ENV || DEFAULT_NODE_ENV,
};

export default config;
