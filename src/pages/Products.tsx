import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/state/productsSlice";
import { Skeleton } from "@/components/ui/skeleton";
import { LikeButton } from "@/components/LikeButton";
import type { RootState, AppDispatch } from "@/state/store";

export const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, loading, favorites } = useSelector(
    (state: RootState) => state.products,
  );
  const [showFavorites, setShowFavorites] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(
      showFavorites
        ? items.filter((product) => favorites.includes(product.id))
        : items,
    );
  }, [items, showFavorites, favorites]);

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container mx-auto p-4">
      <Header
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        navigate={navigate}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center justify-between">
                <span className="max-w-xs truncate">{product.title}</span>
                <span>${product.price}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div
                className="cursor-pointer"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="mx-auto mb-4 h-48 rounded-xl"
                />
                <p className="line-clamp-2 text-sm text-gray-500 first-letter:uppercase">
                  {product.description}
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Button variant="destructive" size="sm" onClick={() => {}}>
                  Delete
                </Button>
                <LikeButton
                  product={product}
                  favorites={favorites}
                  dispatch={dispatch}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Header = ({
  showFavorites,
  setShowFavorites,
  navigate,
}: {
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
  navigate: (path: string) => void;
}) => (
  <div className="mb-6 flex items-center justify-between">
    <h1 className="text-2xl font-bold text-white">Fake Products Store</h1>
    <div className="space-x-4">
      <Button
        variant="secondary"
        onClick={() => setShowFavorites(!showFavorites)}
      >
        {showFavorites ? "Show All" : "Show Favorites"}
      </Button>
      <Button onClick={() => navigate("/create-product")}>
        Create Product
      </Button>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="container mx-auto p-4">
    <div className="mb-5 flex items-center justify-between">
      <Skeleton className="h-8 w-48" />
      <div className="space-x-4">
        <Skeleton className="inline-block h-9 w-28" />
        <Skeleton className="inline-block h-9 w-32" />
      </div>
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-16" />
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <Skeleton className="mb-4 h-48 w-full" />
            <Skeleton className="mb-4 h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="mt-4 flex items-center justify-between">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-9" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
