import { useDispatch, useSelector } from "react-redux";
import { toggleViewMode } from "@/state/filtersSlice";
import { LayoutGrid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RootState } from "@/state/store";

export default function ViewToggle() {
  const dispatch = useDispatch();
  const { viewMode } = useSelector((state: RootState) => state.filters);

  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={viewMode}
      onValueChange={() => dispatch(toggleViewMode())}
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
