import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import ProductList from "@/components/catalog/ProductList";
import SearchBar from "@/components/catalog/SearchBar";
import PageHeader from "@/components/catalog/PageHeader";
import ViewToggle from "@/components/catalog/ViewToggle";
import PriceFilter from "@/components/catalog/PriceFilter";
import CategoryFilter from "@/components/catalog/CategoryFilter";
import Navigation from "@/components/catalog/Navigation";
import LoadingSkeleton from "@/components/catalog/LoadingSkeleton";

export default function CatalogPage() {
  const { items, favorites, loading, error } = useSelector(
    (state: RootState) => state.products,
  );
  const { showFavorites, searchTerm, currentPage, minPrice, category } =
    useSelector((state: RootState) => state.filters);

  const isLg = useMediaQuery("(min-width: 1024px)");
  const isMd = useMediaQuery("(min-width: 768px)");

  const itemsPerPage = isLg ? 8 : isMd ? 6 : 4;

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

  if (loading) {
    return <LoadingSkeleton itemsPerPage={itemsPerPage} />;
  }

  if (error) {
    return <ErrorMessage title="Failed to load products" message={error} />;
  }

  return (
    <div className="container mx-auto p-4">
      <PageHeader />
      <div className="my-6 flex flex-col gap-2 sm:flex-row">
        <div className="flex w-full items-center gap-2">
          <SearchBar />
          <ViewToggle />
        </div>
        <div className="flex gap-2">
          <CategoryFilter />
          <PriceFilter />
        </div>
      </div>
      <ProductList products={currentProducts} />
      {totalPages > 1 && (
        <Navigation currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
