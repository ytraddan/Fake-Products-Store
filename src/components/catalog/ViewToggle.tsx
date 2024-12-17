import { useDispatch, useSelector } from "react-redux";
import { setViewMode } from "@/state/filtersSlice";
import { LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RootState } from "@/state/store";

export default function ViewToggle() {
  const dispatch = useDispatch();
  const { viewMode } = useSelector((state: RootState) => state.filters);

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
