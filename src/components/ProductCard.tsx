import { useNavigate } from "react-router";
import { Product } from "@/types/product";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { LikeButton } from "@/components/ui/LikeButton";
import { DeleteButton } from "@/components/ui/DeleteButton";
import { EditButton } from "@/components/ui/EditButton";
import { useProductActions } from "@/hooks/useProductActions";
import { RootState } from "@/state/store";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

export const ProductCard = ({ product, viewMode }: ProductCardProps) => {
  const navigate = useNavigate();
  const { favorites } = useSelector((state: RootState) => state.products);
  const { handleToggleFavorite, handleDelete } = useProductActions();

  const handleCardClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  const isLiked = favorites.includes(product.id);

  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex h-full flex-col gap-4 p-4 sm:flex-row sm:gap-6 sm:p-6">
          <div
            className="cursor-pointer"
            onClick={() => handleCardClick(product.id)}
          >
            <LoadingImage
              src={product.image}
              alt={product.title}
              className="h-40 w-full rounded-md object-cover sm:h-32 sm:w-32"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div
                className="cursor-pointer"
                onClick={() => handleCardClick(product.id)}
              >
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-500 first-letter:uppercase">
                  {product.description}
                </p>
              </div>
              <span className="text-xl font-semibold">${product.price}</span>
            </div>
            <div className="mt-4 flex items-center justify-between sm:mt-auto">
              <div className="flex items-center gap-2">
                <DeleteButton onClick={() => handleDelete(product)} size="sm" />
                <EditButton link={`/products/${product.id}/edit`} size="sm" />
              </div>
              <LikeButton
                isLiked={isLiked}
                onClick={() => handleToggleFavorite(product.id)}
              />
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="p-4">
        <CardTitle className="flex items-center justify-between">
          <span className="max-w-64 truncate">{product.title}</span>
          <span>${product.price}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-2">
        <div
          className="cursor-pointer"
          onClick={() => handleCardClick(product.id)}
        >
          <LoadingImage
            src={product.image}
            alt={product.title}
            className="mb-4 h-20 sm:h-44"
          />
          <p className="line-clamp-3 text-xs text-gray-500 first-letter:uppercase sm:line-clamp-2 sm:text-sm">
            {product.description}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex gap-1 sm:gap-2">
            <DeleteButton onClick={() => handleDelete(product)} size="sm" />
            <EditButton link={`/products/${product.id}/edit`} size="sm" />
          </div>
          <LikeButton
            isLiked={isLiked}
            onClick={() => handleToggleFavorite(product.id)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
