import { Product } from "@/types/product";

const API_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`);

    if (!res.ok) {
      throw new Error(`HTTP error status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Unknown error");
  }
}

// export async function AddProduct(
//   product: Omit<Product, "id">,
// ): Promise<number> {
//   const res = await fetch(`${API_URL}/products`, {
//     method: "POST",
//     body: JSON.stringify(product),
//   });
//   if (!res.ok) {
//     throw new Error("Failed to create product");
//   }
//   return res.json();
// }

// export async function deleteProduct(id: number): Promise<Product> {
//   const res = await fetch(`${API_URL}/products/${id}`, {
//     method: "DELETE",
//   });
//   if (!res.ok) {
//     throw new Error("Failed to delete product");
//   }
//   return res.json();
// }
