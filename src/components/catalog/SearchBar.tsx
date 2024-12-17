import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "@/state/filtersSlice";
import { Input } from "@/components/ui/input";
import { ClearButton } from "@/components/ui/ClearButton";

export default function SearchBar() {
  const { searchTerm } = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="relative flex-1">
      <Input
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      {searchTerm && (
        <ClearButton onClick={() => dispatch(setSearchTerm(""))} />
      )}
    </div>
  );
}
