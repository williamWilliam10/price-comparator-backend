// src/config/env.js
import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  frontendUrl: process.env.FRONTEND_URL || process.env.FRONTEND_URL_NETWORK ,
  databaseUrl: process.env.DATABASE_URL || "",
};
  