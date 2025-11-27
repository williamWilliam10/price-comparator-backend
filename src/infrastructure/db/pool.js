// src/infrastructure/db/pool.js
import pkg from "pg";
import { env } from "../../config/env.js";

const { Pool } = pkg;

/**
 * Pool de connexion PostgreSQL (Neon)
 * - Utilise DATABASE_URL depuis .env
 * - SSL activé pour Neon
 */
export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: { rejectUnauthorized: false },
});
