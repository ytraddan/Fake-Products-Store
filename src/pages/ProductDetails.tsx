import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/services/api";
import { Product } from "@/types/product";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProduct(Number(id));
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="w-32 h-4 bg-zinc-700 rounded animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="w-full h-48 bg-zinc-700 rounded animate-pulse" />
              <div className="w-3/4 h-4 bg-zinc-700 rounded animate-pulse" />
              <div className="w-1/2 h-4 bg-zinc-700 rounded animate-pulse" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-center">Product not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex text-2xl font-bold justify-between items-center">
            <span>{product.title}</span>
            <span>${product.price}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-72 rounded-lg"
            />
          </div>
          <div className="flex my-4 items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={i < Math.floor(product.rating.rate) ? "white" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.rating.count} reviews)
            </span>
          </div>
          <p className="text-gray-500 mb-4">{product.description}</p>
          <Button variant="secondary" onClick={() => navigate("/products")}>
            Back to Products
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
