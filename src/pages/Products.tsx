import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LikeButton } from "@/components/ui/LikeButton";
import type { RootState } from "@/state/store";
import { deleteProduct } from "@/state/productsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { Product } from "@/types/product";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Input } from "@/components/ui/input";

type ProductCardProps = {
  product: Product;
  handleProductClick: (id: number) => void;
  handleDelete: (id: number) => void;
  favorites: number[];
};

type PageHeaderProps = {
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
  navigate: (path: string) => void;
};

export const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { items, loading, favorites } = useSelector(
    (state: RootState) => state.products,
  );

  const filteredProducts = showFavorites
    ? items.filter((product) => favorites.includes(product.id))
    : items;

  const searchFilteredProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container mx-auto p-4">
      <PageHeader
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        navigate={navigate}
      />
      <Input
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => handleChange(e)}
        className="mx-auto my-6 max-w-full"
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {searchFilteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleProductClick={handleProductClick}
            handleDelete={handleDelete}
            favorites={favorites}
          />
        ))}
      </div>
    </div>
  );
};

const PageHeader = ({
  showFavorites,
  setShowFavorites,
  navigate,
}: PageHeaderProps) => (
  <div className="space-y-4">
    <div className="flex items-start justify-between">
      <div className="items-top flex gap-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Fake Products Store
        </h1>
        <ThemeToggle />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
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
  </div>
);

const ProductCard = ({
  product,
  handleProductClick,
  handleDelete,
  favorites,
}: ProductCardProps) => (
  <Card className="overflow-hidden">
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
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleDelete(product.id)}
        >
          Delete
        </Button>
        <LikeButton product={product} favorites={favorites} />
      </div>
    </CardContent>
  </Card>
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
