import { Product } from "@/types/product";

const API_URL = "https://fakestoreapi.com";

export const api = {
  getProducts: () => fetch(`${API_URL}/products`).then((res) => res.json()),

  getProduct: (id: number) =>
    fetch(`${API_URL}/products/${id}`).then((res) => res.json()),

  createProduct: (product: Omit<Product, "id">) =>
    fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }).then((res) => res.json()),

  deleteProduct: (id: number) =>
    fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    }).then((res) => res.json()),
};
