// src/application/use-cases/getProductBySlug.js
import { findProductBySlug } from "../../infrastructure/repositories/product.repository.js";

export async function getProductBySlugUseCase(slug) {
  const product = await findProductBySlug(slug);
  return product;
}
