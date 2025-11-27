// src/presentation/routes/health.routes.js
import { Router } from "express";

const router = Router();

/**
 * GET /health
 * Route de monitoring simple
 * - Ne touche pas la base de données
 * - Utilisée par Render / Uptime Kuma pour vérifier que le backend répond
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Price-comparator backend is running",
  });
});

export default router;
