// src/infrastructure/repositories/product.repository.js
import { pool } from "../db/pool.js";

/**
 * Recherche de produits avec filtres, tri et pagination.
 * Filtres : search, category, minPrice, maxPrice
 * Tri : price_asc | price_desc | newest | rating_desc
 * Pagination : page, limit
 */
export async function searchProducts({
  search,
  category,
  minPrice,
  maxPrice,
  sort,
  page,
  limit,
}) {
  const values = [];
  let idx = 1;
  const conditions = [];

  let query = `
    WITH products_with_meta AS (
      SELECT
        p.id,
        p.slug,
        p.name,
        p.description,
        p.image_url,
        p.category,
        p.created_at,
        (SELECT MIN(o.price) FROM product_offers o WHERE o.product_id = p.id) AS min_price,
        (SELECT MAX(o.rating) FROM product_offers o WHERE o.product_id = p.id) AS max_rating
      FROM products p
    )
    SELECT
      id,
      slug,
      name,
      description,
      image_url AS "imageUrl",
      category,
      created_at,
      min_price AS "minPrice",
      max_rating AS "maxRating",
      COUNT(*) OVER() AS total_count
    FROM products_with_meta
  `;

  // Filtres
  if (category) {
    conditions.push(`category = $${idx}`);
    values.push(category);
    idx++;
  }

  if (search) {
    const term = `%${search.toLowerCase()}%`;
    conditions.push(
      `(LOWER(name) LIKE $${idx} OR LOWER(description) LIKE $${idx})`
    );
    values.push(term);
    idx++;
  }

  if (minPrice != null) {
    conditions.push(`min_price >= $${idx}`);
    values.push(minPrice);
    idx++;
  }

  if (maxPrice != null) {
    conditions.push(`min_price <= $${idx}`);
    values.push(maxPrice);
    idx++;
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  // Tri
  let orderBy = "created_at DESC";
  switch (sort) {
    case "price_asc":
      orderBy = "min_price ASC NULLS LAST";
      break;
    case "price_desc":
      orderBy = "min_price DESC NULLS LAST";
      break;
    case "rating_desc":
      orderBy = "max_rating DESC NULLS LAST";
      break;
    case "newest":
      orderBy = "created_at DESC";
      break;
    default:
      orderBy = "created_at DESC";
  }

  query += ` ORDER BY ${orderBy}`;

  // Pagination
  const safeLimit = Math.min(limit || 12, 100);
  const safePage = Math.max(page || 1, 1);
  const offset = (safePage - 1) * safeLimit;

  query += ` LIMIT $${idx} OFFSET $${idx + 1};`;
  values.push(safeLimit, offset);

  const { rows } = await pool.query(query, values);

  const total = rows.length > 0 ? Number(rows[0].total_count) : 0;
  const items = rows.map((row) => {
    const { total_count, ...prod } = row;
    return prod;
  });

  return {
    total,
    items,
  };
}


/**
 * Produit individuel + offres
 */
export async function findProductBySlug(slug) {
  const productQuery = `
    SELECT
      id,
      slug,
      name,
      description,
      image_url AS "imageUrl",
      category,
      created_at
    FROM products
    WHERE slug = $1
    LIMIT 1;
  `;
  const productResult = await pool.query(productQuery, [slug]);

  if (productResult.rowCount === 0) return null;

  const product = productResult.rows[0];

  const offersQuery = `
    SELECT
      o.id,
      v.name AS vendor,
      v.website_url AS "websiteUrl",
      o.price,
      o.rating,
      o.affiliate_url AS "affiliateUrl",
      o.currency,
      o.last_checked AS "lastChecked"
    FROM product_offers o
    JOIN vendors v ON v.id = o.vendor_id
    WHERE o.product_id = $1
    ORDER BY o.price ASC;
  `;
  const offersResult = await pool.query(offersQuery, [product.id]);

  product.offers = offersResult.rows;
  return product;
}
