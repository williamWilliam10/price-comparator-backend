// src/presentation/routes/collections.routes.js
import express from "express";
import {
  getCollectionBySlug,
  getProductsByCollectionSlug,
} from "../../infrastructure/repositories/collection.repository.js";

const router = express.Router();

/**
 * GET /api/collections/:slug/products
 * Exemple: /api/collections/trending/products?limit=8
 */
router.get("/:slug/products", async (req, res) => {
  try {
    const { slug } = req.params;
    const limit = req.query.limit ? Number(req.query.limit) : undefined;

    if (limit && Number.isNaN(limit)) {
      return res
        .status(400)
        .json({ error: "Le paramètre 'limit' doit être un nombre." });
    }

    const result = await getProductsByCollectionSlug({ slug, limit });

    if (!result.collection) {
      return res.status(404).json({
        error: `Collection '${slug}' introuvable`,
      });
    }

    return res.json({
      collection: result.collection,
      items: result.items,
    });
  } catch (err) {
    console.error("Erreur GET /api/collections/:slug/products", err);
    return res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération des produits." });
  }
});

export default router;
