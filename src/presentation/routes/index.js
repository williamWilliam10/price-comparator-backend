// src/presentation/routes/index.js
import { Router } from "express";
import healthRouter from "./health.routes.js";
import productsRouter from "./products.routes.js";
import collectionsRouter from "./collections.routes.js"; // ✅ NEW

const router = Router();

// Routes publiques
router.use(healthRouter);
router.use("/api/products", productsRouter);
router.use("/api/collections", collectionsRouter); // ✅ NEW

export default router;
