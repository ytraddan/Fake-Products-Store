import { Heart } from "lucide-react";

export const LikeButton = ({
  isLiked,
  onClick,
}: {
  isLiked: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className="cursor-pointer rounded-full p-2 transition-colors hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-700/40"
      onClick={onClick}
    >
      <Heart className="size-6" fill={isLiked ? "currentColor" : "none"} />
    </div>
  );
};
