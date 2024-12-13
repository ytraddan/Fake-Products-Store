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

export const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const { favorites } = useSelector((state: RootState) => state.products);
  const { handleToggleFavorite, handleDelete } = useProductActions();

  const handleCardClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  const isLiked = favorites.includes(product.id);

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
