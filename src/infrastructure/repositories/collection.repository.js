// src/infrastructure/repositories/collection.repository.js
import { pool } from "../db/pool.js";


/**
 * Récupère une collection par son slug
 */
export async function getCollectionBySlug(slug) {
  const query = `
    SELECT id, slug, name, description, position, is_active
    FROM collections
    WHERE slug = $1
      AND is_active = TRUE
    LIMIT 1;
  `;

  const { rows } = await pool.query(query, [slug]);
  return rows[0] || null;
}

/**
 * Récupère les produits d'une collection
 */
export async function getProductsByCollectionSlug({ slug, limit }) {
  const collection = await getCollectionBySlug(slug);
  if (!collection) {
    return { collection: null, items: [] };
  }

  const values = [collection.id];
  let limitClause = "";

  if (typeof limit === "number" && limit > 0) {
    values.push(limit);
    limitClause = `LIMIT $2`;
  }

    const query = `
    SELECT
      p.id,
      p.slug,
      p.name,
      p.description,
      p.category,
      p.brand,
      p.image_url      AS "imageUrl",
      p.original_price AS "originalPrice",
      p.current_price  AS "currentPrice",
      p.rating,
      p.review_count   AS "reviewCount",
      p.affiliate_url  AS "affiliateUrl",
      p.external_source AS "externalSource",
      p.external_id     AS "externalId"
    FROM collection_products cp
    JOIN products p ON p.id = cp.product_id
    WHERE cp.collection_id = $1
    ORDER BY cp.highlight_order ASC, p.id DESC
    ${limitClause};
  `;


  const { rows } = await pool.query(query, values);

  return {
    collection,
    items: rows,
  };
}
