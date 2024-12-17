import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setCurrentPage, setShowFavorites } from "@/state/filtersSlice";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LikeButton } from "@/components/ui/LikeButton";

export default function PageHeader() {
  const dispatch = useDispatch();
  const { showFavorites } = useSelector((state: RootState) => state.filters);

  const handleToggleShowFavorites = () => {
    dispatch(setShowFavorites(!showFavorites));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="flex items-start justify-between">
      <h1 className="text-2xl font-bold dark:text-white">
        Fake Products Store
      </h1>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <LikeButton
          isLiked={showFavorites}
          onClick={handleToggleShowFavorites}
        />
        <Button asChild>
          <Link to="/create-product">Create Product</Link>
        </Button>
      </div>
    </div>
  );
}
