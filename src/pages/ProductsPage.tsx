import { useState } from "react";
import { Link } from "react-router";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  setShowFavorites,
  setSearchTerm,
  setCurrentPage,
  setMinPrice,
  setCategory,
  setViewMode,
} from "@/state/filtersSlice";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LikeButton } from "@/components/ui/LikeButton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { LayoutGrid, List, X } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Products from "@/components/Products";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, favorites, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const {
    showFavorites,
    searchTerm,
    currentPage,
    minPrice,
    category,
    viewMode,
  } = useSelector((state: RootState) => state.filters);

  const isLg = useMediaQuery("(min-width: 1024px)");
  const isMd = useMediaQuery("(min-width: 768px)");

  const itemsPerPage = isLg ? 8 : isMd ? 6 : 4;

  const categories = [...new Set(items.map((item) => item.category))];

  const filteredProducts = items
    .filter((product) =>
      showFavorites ? favorites.includes(product.id) : true,
    )
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((product) => {
      if (category === "all") return true;
      return product.category === category;
    })
    .filter((product) => {
      return product.price >= minPrice;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSearchTermChange = (searchInput: string) => {
    dispatch(setSearchTerm(searchInput));
    dispatch(setCurrentPage(1));
  };

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage title="Failed to load products" message={error} />;
  }

  return (
    <div className="container mx-auto p-4">
      <PageHeader />

      <div className="my-6 flex flex-col gap-2 sm:flex-row">
        <div className="flex w-full items-center gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => handleSearchTermChange(e.target.value)}
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 h-6 -translate-y-1/2 px-1 text-zinc-900 dark:text-white"
                onClick={() => handleSearchTermChange("")}
              >
                <X fill="currentColor" />
              </Button>
            )}
          </div>
          <ViewToggle />
        </div>
        <div className="flex gap-2">
          <CategoryFilter />
          <PriceFilter />
        </div>
      </div>
      <Products products={currentProducts} viewMode={viewMode} />
      {totalPages > 1 && <Navigation />}
    </div>
  );

  function PageHeader() {
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

  function ViewToggle() {
    const handleViewModeChange = (value: string) => {
      if (value === "grid" || value === "list") {
        dispatch(setViewMode(value));
      }
    };

    return (
      <ToggleGroup
        type="single"
        variant="outline"
        value={viewMode}
        onValueChange={(value) => handleViewModeChange(value)}
        className="text-zinc-900 dark:text-white"
      >
        <ToggleGroupItem value="grid">
          <LayoutGrid fill="currentColor" />
        </ToggleGroupItem>
        <ToggleGroupItem value="list">
          <List fill="currentColor" />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  }

  function PriceFilter() {
    const [localMinPrice, setLocalMinPrice] = useState(minPrice);
    const maxPrice = Math.max(...items.map((item) => item.price));
    const step = Math.ceil(maxPrice / 50);

    const handleMinPriceChange = (value: number) => {
      dispatch(setMinPrice(value));
      dispatch(setCurrentPage(1));
    };

    const handleClearPrice = () => {
      setLocalMinPrice(0);
      dispatch(setMinPrice(0));
      dispatch(setCurrentPage(1));
    };

    return (
      <div className="flex w-48 flex-col gap-2">
        <div className="relative flex items-center justify-between text-zinc-900 dark:text-white">
          <span className="text-sm">Price: ${localMinPrice}+</span>

          {localMinPrice > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-6 px-1"
              onClick={handleClearPrice}
            >
              <X fill="currentColor" />
            </Button>
          )}
        </div>
        <Slider
          value={[localMinPrice]}
          max={maxPrice}
          step={step}
          onValueChange={(value) => setLocalMinPrice(value[0])}
          onValueCommit={(value) => handleMinPriceChange(value[0])}
        />
      </div>
    );
  }

  function CategoryFilter() {
    const handleCategoryChange = (value: string) => {
      dispatch(setCategory(value));
      dispatch(setCurrentPage(1));
    };

    const products = items
      .filter((product) =>
        showFavorites ? favorites.includes(product.id) : true,
      )
      .filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      .filter((product) => {
        return product.price >= minPrice;
      });

    const getCategoryCount = (categoryName: string) => {
      return products.filter((product) => product.category === categoryName)
        .length;
    };

    return (
      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent className="relative" position="popper">
          <SelectItem value="all">
            All Categories{" "}
            <span className="text-gray-500">({products.length})</span>
          </SelectItem>
          <SelectSeparator />
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
              <span className="text-gray-500">
                ({getCategoryCount(category)})
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  function Navigation() {
    const handlePageChange = (newPage: number) => {
      dispatch(setCurrentPage(newPage));
    };

    return (
      <Pagination className="fixed bottom-8 left-0 right-0 w-fit rounded-lg bg-zinc-100/80 backdrop-blur-sm transition-colors dark:bg-zinc-900">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (currentPage > 1) {
                  handlePageChange(currentPage - 1);
                }
              }}
              className={
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                onClick={() => handlePageChange(i + 1)}
                isActive={currentPage === i + 1}
                className={"cursor-pointer"}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (currentPage < totalPages) {
                  handlePageChange(currentPage + 1);
                }
              }}
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
  }

  function LoadingSkeleton() {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-start justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 w-32" />
        </div>

        <div className="my-7 flex flex-col gap-4 sm:flex-row">
          <Skeleton className="h-10 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-40" />
          </div>
        </div>

        {viewMode === "grid" ? <SkeletonGrid /> : <SkeletonList />}
      </div>
    );
  }

  function SkeletonGrid() {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(itemsPerPage)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="p-4">
              <Skeleton className="h-5 w-full" />
            </CardHeader>
            <CardContent className="px-4 pb-4 pt-2">
              <Skeleton className="mx-auto mb-4 h-20 w-full rounded-xl sm:h-44" />
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
    );
  }

  function SkeletonList() {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(itemsPerPage)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="flex h-full flex-col gap-4 p-4 sm:flex-row sm:gap-6 sm:p-6">
              <Skeleton className="h-40 w-full rounded-md sm:h-32 sm:w-32" />
              <div className="flex flex-1 flex-col">
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="w-full space-y-2">
                    <Skeleton className="mb-4 h-6 w-48 sm:w-72" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-2/4" />
                  </div>
                  <Skeleton className="h-7 w-20" />
                </div>
                <div className="mt-4 flex items-center justify-between sm:mt-auto">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
}
