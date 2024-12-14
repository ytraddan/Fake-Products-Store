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

export const ProductDetailsPage = () => {
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
      <Card className="dark:hover:border-zinc-inherit mx-auto w-full max-w-2xl hover:border-inherit">
        <CardHeader className="pb-2">
          <CardTitle className="flex flex-col items-start justify-between gap-6">
            <div className="flex w-full items-center justify-between gap-4">
              <Link
                to="/products"
                className="inline-block rounded-full p-2 transition-colors hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-700/40"
              >
                <ArrowLeft />
              </Link>
              <span className="text-xl font-bold sm:text-2xl">
                ${product.price}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-center">
            <LoadingImage
              src={product.image}
              alt={product.title}
              className="mb-4 max-h-64 sm:max-h-96"
            />
          </div>
          <span className="text-xl font-bold sm:text-2xl">{product.title}</span>
          <Rating rate={product.rating.rate} count={product.rating.count} />
          <p className="text-sm text-gray-500 first-letter:uppercase sm:text-lg">
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
    <div className="flex items-center gap-2 text-zinc-950 dark:text-zinc-100">
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
      <CardHeader className="pb-2">
        <div className="flex w-full items-center justify-between gap-4">
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-center">
          <Skeleton className="h-64 w-full sm:h-96" />
        </div>
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-24 w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-10" />
        </div>
      </CardContent>
    </Card>
  </div>
);
