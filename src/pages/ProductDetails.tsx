import { useParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";
import { LikeButton } from "@/components/ui/LikeButton";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteProduct } from "@/state/productsSlice";
import { AppDispatch } from "@/state/store";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, favorites } = useSelector(
    (state: RootState) => state.products,
  );
  const product = items.find((prod) => prod.id === Number(id));

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
    navigate("/products");
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!product) {
    return <NotFoundMessage />;
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center p-4">
      <Card className="mx-auto w-full max-w-2xl">
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
          <p className="mb-4 text-gray-500 first-letter:uppercase">
            {product.description}
          </p>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="default" onClick={() => navigate("/products")}>
                Back to Products
              </Button>
              <Button
                variant="outline"
                className="p-2 sm:p-3"
                onClick={() => navigate(`/products/${product.id}/edit`)}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                className="p-2 sm:p-3"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </Button>
            </div>
            <LikeButton product={product} favorites={favorites} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Rating = ({ product }: { product: Product }) => {
  return (
    <div className="my-4 flex items-center gap-2 text-zinc-950 dark:text-zinc-100">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            fill={i < Math.floor(product.rating.rate) ? "currentColor" : "none"}
          />
        ))}
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        ({product.rating.count} reviews)
      </span>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="container mx-auto flex min-h-screen items-center p-4">
    <Card className="mx-auto w-full max-w-2xl">
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
  <div className="container mx-auto flex min-h-screen items-center p-4">
    <Card className="mx-auto w-full max-w-2xl">
      <CardContent className="p-6 text-2xl font-bold">
        <p className="text-center">Product not found</p>
      </CardContent>
    </Card>
  </div>
);
