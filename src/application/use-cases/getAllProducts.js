// src/application/use-cases/getAllProducts.js
import { searchProducts } from "../../infrastructure/repositories/product.repository.js";

/**
 * Use case : récupérer les produits avec filtres / tri / pagination
 * Doit retourner { total, items }
 */
export async function getAllProductsUseCase(filters) {
  // NE DOIT PAS retourner juste un tableau,
  // mais l'objet complet renvoyé par searchProducts
  return await searchProducts(filters);
}
