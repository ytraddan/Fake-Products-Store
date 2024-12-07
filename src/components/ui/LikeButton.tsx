import { useDispatch } from "react-redux";
import { Product } from "@/types/product";
import { toggleFavorite } from "@/state/productsSlice";
import { AppDispatch } from "@/state/store";
interface LikeButtonProps {
  product: Product;
  favorites: number[];
}

export const LikeButton = ({ product, favorites }: LikeButtonProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isLiked = favorites.includes(product.id);
  return (
    <div
      className="cursor-pointer rounded-lg p-1 hover:bg-zinc-200/40 dark:text-white dark:hover:bg-zinc-700/40"
      onClick={() => dispatch(toggleFavorite(product.id))}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isLiked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>
    </div>
  );
};