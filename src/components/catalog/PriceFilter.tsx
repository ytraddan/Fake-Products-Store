import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMinPrice, setCurrentPage } from "@/state/filtersSlice";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import { RootState } from "@/state/store";

export default function PriceFilter() {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.products);
  const { minPrice } = useSelector((state: RootState) => state.filters);
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
