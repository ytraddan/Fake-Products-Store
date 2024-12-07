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
import { Heart } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductCardProps = {
  product: Product;
  handleProductClick: (id: number) => void;
  handleDelete: (id: number) => void;
  favorites: number[];
};

type PageHeaderProps = {
  showFavorites: boolean;
  handleShowFavorites: () => void;
  navigate: (path: string) => void;
};

type NavigationProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

export const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { items, loading, favorites } = useSelector(
    (state: RootState) => state.products,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [priceRange, setPriceRange] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");

  const categories = [...new Set(items.map((item) => item.category))];

  const applyFilters = (products: Product[]) => {
    return products
      .filter((product) =>
        showFavorites
          ? favorites.includes(product.id)
          : items.includes(product),
      )
      .filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .filter((product) => {
        if (category === "all") return true;
        return product.category === category;
      })
      .filter((product) => {
        switch (priceRange) {
          case "0-49":
            return product.price <= 49;
          case "50-99":
            return product.price >= 50 && product.price <= 99;
          case "100+":
            return product.price >= 100;
          default:
            return true;
        }
      });
  };

  const searchFilteredProducts = applyFilters(items);

  const totalPages = Math.ceil(searchFilteredProducts.length / itemsPerPage);
  const currentProducts = searchFilteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleProductClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    setCurrentPage(1);
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="container mx-auto p-4">
      <PageHeader
        showFavorites={showFavorites}
        handleShowFavorites={handleShowFavorites}
        navigate={navigate}
      />

      <div className="my-6 flex flex-col gap-4 sm:flex-row">
        <Input
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => handleChange(e)}
        />
        <div className="flex gap-2">
          <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />
          <CategoryFilter
            category={category}
            categories={categories}
            setCategory={setCategory}
          />
        </div>
      </div>
      <div className="sm:mb-18 mb-20 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleProductClick={handleProductClick}
            handleDelete={handleDelete}
            favorites={favorites}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Navigation
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

const CategoryFilter = ({
  category,
  categories,
  setCategory,
}: {
  category: string;
  categories: string[];
  setCategory: (value: string) => void;
}) => (
  <Select value={category} onValueChange={setCategory}>
    <SelectTrigger className="w-40">
      <SelectValue placeholder="Category" />
    </SelectTrigger>
    <SelectContent className="relative" position="popper">
      <SelectItem value="all">All Categories</SelectItem>
      {categories.map((category) => (
        <SelectItem key={category} value={category}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const PriceFilter = ({
  priceRange,
  setPriceRange,
}: {
  priceRange: string;
  setPriceRange: (value: string) => void;
}) => (
  <Select value={priceRange} onValueChange={setPriceRange}>
    <SelectTrigger className="w-32">
      <SelectValue placeholder="Price Range" />
    </SelectTrigger>
    <SelectContent className="relative" position="popper">
      <SelectItem value="all">All Prices</SelectItem>
      <SelectItem value="0-49">$0 - $49</SelectItem>
      <SelectItem value="50-99">$50 - $99</SelectItem>
      <SelectItem value="100+">$100+</SelectItem>
    </SelectContent>
  </Select>
);

const PageHeader = ({
  showFavorites,
  handleShowFavorites,
  navigate,
}: PageHeaderProps) => (
  <div className="flex items-start justify-between">
    <div className="items-top flex gap-4">
      <h1 className="text-2xl font-bold dark:text-white">
        Fake Products Store
      </h1>
      <ThemeToggle />
    </div>
    <div className="flex gap-2">
      <div
        className="cursor-pointer rounded-full p-2 transition-colors hover:bg-zinc-200 dark:text-white dark:hover:bg-zinc-700/40"
        onClick={handleShowFavorites}
      >
        <Heart
          className="size-6"
          fill={showFavorites ? "currentColor" : "none"}
        />
      </div>
      <Button onClick={() => navigate("/create-product")}>
        Create Product
      </Button>
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
        <span className="max-w-64 truncate">{product.title}</span>
        <span>${product.price}</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="px-4 pb-4 pt-2">
      <div
        className="cursor-pointer"
        onClick={() => handleProductClick(product.id)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="mx-auto mb-4 h-32 rounded-xl sm:h-44"
        />
        <p className="line-clamp-2 text-sm text-gray-500 first-letter:uppercase">
          {product.description}
        </p>
      </div>
      <div className="mt-2 flex items-center justify-between">
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

const Navigation = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: NavigationProps) => (
  <Pagination className="fixed bottom-8 left-0 right-0 w-fit rounded-lg bg-zinc-100/80 backdrop-blur-sm dark:bg-zinc-900">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          className={
            currentPage === 1
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
      {[...Array(totalPages)].map((_, i) => (
        <PaginationItem key={i + 1}>
          <PaginationLink
            onClick={() => setCurrentPage(i + 1)}
            isActive={currentPage === i + 1}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          className={
            currentPage === totalPages
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);

const LoadingSkeleton = () => (
  <div className="container mx-auto p-4">
    <div className="flex items-start justify-between">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-8 w-32" />
    </div>

    <div className="my-6 flex flex-col gap-4 sm:flex-row">
      <Skeleton className="h-10 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-16" />
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 pt-2">
            <Skeleton className="mx-auto mb-4 h-32 w-full rounded-xl sm:h-44" />
            <Skeleton className="mb-2 h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="mt-2 flex items-center justify-between">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
