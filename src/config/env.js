// src/config/env.js
import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 4000,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  databaseUrl: process.env.DATABASE_URL || "",
};
