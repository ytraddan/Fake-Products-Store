import { useDispatch } from "react-redux";
import { Product } from "@/types/product";
import { toggleFavorite } from "@/state/productsSlice";
import { AppDispatch } from "@/state/store";
import { Heart } from "lucide-react";
interface LikeButtonProps {
  product: Product;
  favorites: number[];
}

export const LikeButton = ({ product, favorites }: LikeButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLiked = favorites.includes(product.id);
  return (
    <div
      className="cursor-pointer rounded-full p-2 transition-colors hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-700/40"
      onClick={() => dispatch(toggleFavorite(product.id))}
    >
      <Heart className="size-6" fill={isLiked ? "currentColor" : "none"} />
    </div>
  );
};
