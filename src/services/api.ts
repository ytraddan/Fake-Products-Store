import { Product } from "@/types/product";

const API_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);
  return res.json();
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`);
  return res.json();
}

export async function createProduct(product: Product): Promise<Product> {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });
  return res.json();
}