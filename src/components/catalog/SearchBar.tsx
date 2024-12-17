import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "@/state/filtersSlice";

export default function SearchBar() {
  const { searchTerm } = useSelector(
    (state: RootState) => state.filters,
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleSearchTermChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return (
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
  );
}
