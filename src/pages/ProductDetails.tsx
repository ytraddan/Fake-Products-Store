import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProduct } from "@/services/api";
import { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import { LikeButton } from "@/components/LikeButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.products.favorites);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(Number(id));
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
    return <LoadingSkeleton />;
  }

  if (!product) {
    return <NotFoundMessage />;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>
            <div className="items-top flex justify-between text-2xl font-bold">
              <span>{product.title}</span>
              <span>${product.price}</span>
            </div>
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
          <Rating product={product} />
          <p className="mb-4 text-gray-500">{product.description}</p>
          <div className="flex justify-between">
            <Button variant="default" onClick={() => navigate("/products")}>
              Back to Products
            </Button>
            <LikeButton
              product={product}
              favorites={favorites}
              dispatch={dispatch}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Rating = ({ product }: { product: Product }) => (
  <div className="my-4 flex items-center gap-2">
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
);

const LoadingSkeleton = () => (
  <div className="container mx-auto p-4">
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="mx-auto h-72 w-full" />
        <Skeleton className="my-4 h-4 w-24" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="my-4 h-4 w-3/4" />
        <Skeleton className="h-10 w-32" />
      </CardContent>
    </Card>
  </div>
);

const NotFoundMessage = () => (
  <div className="container mx-auto max-w-2xl p-4">
    <Card>
      <CardContent className="p-6 text-2xl font-bold">
        <p className="text-center">Product not found</p>
      </CardContent>
    </Card>
  </div>
);
