import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setCurrentPage } from "@/state/filtersSlice";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CategoryFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const { category, searchTerm, minPrice, showFavorites } = useSelector(
    (state: RootState) => state.filters,
  );
  const { items, favorites } = useSelector(
    (state: RootState) => state.products,
  );

  const categories = [...new Set(items.map((product) => product.category))];

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

  const handleCategoryChange = (value: string) => {
    dispatch(setCategory(value));
    dispatch(setCurrentPage(1));
  };

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
