// src/presentation/routes/products.routes.js
import { Router } from "express";
import {
  getAllProducts,
  getProductBySlug,
} from "../controllers/products.controller.js";

const router = Router();

/**
 * GET /api/products
 * Liste des produits
 */
router.get("/", getAllProducts);

/**
 * GET /api/products/:slug
 * Détail d'un produit + offres
 */
router.get("/:slug", getProductBySlug);

export default router;
