import { useParams, Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LikeButton } from "@/components/ui/LikeButton";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { EditButton } from "@/components/ui/EditButton";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { Star, ArrowLeft } from "lucide-react";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useProductActions } from "@/hooks/useProductActions";

export const ProductDetails = () => {
  const { id } = useParams();
  const { handleToggleFavorite, handleDelete } = useProductActions();
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
            <div className="flex items-start justify-between gap-6 text-2xl font-bold">
              <div className="flex items-start gap-4">
                <Link
                  to="/products"
                  className="rounded-full p-2 transition-colors hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-700/40"
                >
                  <ArrowLeft />
                </Link>
                <span>{product.title}</span>
              </div>
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
              <DeleteButton onClick={() => handleDelete(product)} />
              <EditButton link={`/products/${product.id}/edit`} />
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
    <div className="mb-4 mt-6 flex items-center gap-2 text-zinc-950 dark:text-zinc-100">
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
