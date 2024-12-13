import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LikeButton } from "@/components/ui/LikeButton";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Pencil, Star, Trash } from "lucide-react";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useProductActions } from "@/hooks/useProductActions";

export const ProductDetails = () => {
  const { id } = useParams();
  const { handleDelete, handleToggleFavorite } = useProductActions();
  const { items, loading, favorites } = useSelector(
    (state: RootState) => state.products,
  );

  const product = items.find((prod) => prod.id === Number(id));
  const isLiked = favorites.includes(Number(id));

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!product) {
    return <ErrorMessage title="Error" message="Product not found" />;
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
            <LoadingImage
              src={product.image}
              alt={product.title}
              className="max-h-96"
            />
          </div>
          <Rating rate={product.rating.rate} count={product.rating.count} />
          <p className="mb-4 text-gray-500 first-letter:uppercase">
            {product.description}
          </p>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="default" asChild>
                <Link to="/products">Go back</Link>
              </Button>
              <Button variant="outline" className="p-2 sm:p-3" asChild>
                <Link to={`/products/${product.id}/edit`}>
                  <span className="hidden sm:inline">Edit</span>
                  <Pencil className="sm:hidden" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="p-3"
                onClick={() => handleDelete(product)}
              >
                <span className="hidden sm:inline">Delete</span>
                <Trash className="sm:hidden" />
              </Button>
            </div>
            <LikeButton
              isLiked={isLiked}
              onClick={() => handleToggleFavorite(product.id)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Rating = ({ rate, count }: { rate: number; count: number }) => {
  return (
    <div className="my-4 flex items-center gap-2 text-zinc-950 dark:text-zinc-100">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} fill={i < Math.floor(rate) ? "currentColor" : "none"} />
        ))}
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        ({count} reviews)
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
