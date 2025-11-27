// src/presentation/controllers/products.controller.js
import { getAllProductsUseCase } from "../../application/use-cases/getAllProducts.js";
import { getProductBySlugUseCase } from "../../application/use-cases/getProductBySlug.js";

export async function getAllProducts(req, res) {
  try {
    const { search, category, minPrice, maxPrice, sort, page, limit } =
      req.query;

    let min = null;
    let max = null;
    let pageNum = 1;
    let limitNum = 12;

    if (minPrice !== undefined) {
      const n = Number(minPrice);
      if (!Number.isNaN(n)) min = n;
    }

    if (maxPrice !== undefined) {
      const n = Number(maxPrice);
      if (!Number.isNaN(n)) max = n;
    }

    if (page !== undefined) {
      const n = Number(page);
      if (!Number.isNaN(n) && n > 0) pageNum = n;
    }

    if (limit !== undefined) {
      const n = Number(limit);
      if (!Number.isNaN(n) && n > 0) limitNum = n;
    }

    const filters = {
      search: search || null,
      category: category || null,
      minPrice: min,
      maxPrice: max,
      sort: sort || null,
      page: pageNum,
      limit: limitNum,
    };

    const { total, items } = await getAllProductsUseCase(filters);

    const totalPages = total > 0 ? Math.ceil(total / limitNum) : 1;

    res.json({
      total,
      items,
      page: pageNum,
      limit: limitNum,
      totalPages,
    });
  } catch (err) {
    console.error("Erreur getAllProducts:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

export async function getProductBySlug(req, res) {
  const { slug } = req.params;

  try {
    const product = await getProductBySlugUseCase(slug);

    if (!product) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }

    res.json(product);
  } catch (err) {
    console.error("Erreur getProductBySlug:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
}
