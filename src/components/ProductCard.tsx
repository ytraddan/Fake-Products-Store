import { Link, useNavigate } from "react-router";
import { Product } from "@/types/product";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "@/state/productsSlice";
import { RootState } from "@/state/store";
import { deleteProduct } from "@/state/productsSlice";
import { AppDispatch } from "@/state/store";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingImage } from "@/components/ui/LoadingImage";
import { LikeButton } from "@/components/ui/LikeButton";

export const ProductCard = ({ product }: { product: Product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { favorites } = useSelector((state: RootState) => state.products);

  const handleCardClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
    navigate("/products");
  };

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  const isLiked = (id: number) => {
    return favorites.includes(id);
  };

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
          <p className="line-clamp-2 text-sm text-gray-500 first-letter:uppercase">
            {product.description}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex gap-1 sm:gap-2">
            <Button variant="outline" size="sm" className="p-2 sm:p-3" asChild>
              <Link to={`/products/${product.id}/edit`}>Edit</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 sm:p-3"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </Button>
          </div>
          <LikeButton
            isLiked={isLiked(product.id)}
            onClick={() => handleToggleFavorite(product.id)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
