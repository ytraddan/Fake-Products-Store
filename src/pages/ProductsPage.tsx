import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LikeButton } from "@/components/ui/LikeButton";
import { Products } from "@/components/Products";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { RootState } from "@/state/store";
import { LayoutGrid, List } from "lucide-react";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const ProductsPage = () => {
  const { items, favorites, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const [showFavorites, setShowFavorites] = useSessionStorage<boolean>(
    "showFavorites",
    false,
  );
  const [searchTerm, setSearchTerm] = useSessionStorage<string>(
    "searchTerm",
    "",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useSessionStorage<string>(
    "priceRange",
    "all",
  );
  const [category, setCategory] = useSessionStorage<string>("category", "all");
  const [viewMode, setViewMode] = useLocalStorage<"grid" | "list">(
    "viewMode",
    "grid",
  );

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

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSearchTermChange = (searchInput: string) => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleToggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    setCurrentPage(1);
  };

  const handleViewModeChange = (value: string) => {
    if (value === "grid" || value === "list") {
      setViewMode(value);
    }
  };

  const handlePriceRangeChange = (value: string) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
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
          <Input
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
          />
          <ViewToggle />
        </div>
        <div className="flex gap-2">
          <PriceFilter />
          <CategoryFilter />
        </div>
      </div>
      <Products products={currentProducts} viewMode={viewMode} />
      {totalPages > 1 && <Navigation />}
    </div>
  );

  function PageHeader() {
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
    return (
      <Select value={priceRange} onValueChange={handlePriceRangeChange}>
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
  }

  function CategoryFilter() {
    return (
      <Select value={category} onValueChange={handleCategoryChange}>
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
  }

  function Navigation() {
    return (
      <Pagination className="fixed bottom-8 left-0 right-0 w-fit rounded-lg bg-zinc-100/80 backdrop-blur-sm dark:bg-zinc-900">
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
};