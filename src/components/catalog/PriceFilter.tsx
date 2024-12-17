import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { AppDispatch } from "@/state/store";
import { setMinPrice } from "@/state/filtersSlice";
import { Slider } from "@/components/ui/slider";
import { ClearButton } from "@/components/ui/ClearButton";

export default function PriceFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.products);
  const { minPrice } = useSelector((state: RootState) => state.filters);

  const maxPrice = Math.max(...items.map((item) => item.price));
  const step = Math.ceil(maxPrice / 50);

  return (
    <div className="flex w-48 flex-col gap-2">
      <div className="relative flex items-center justify-between text-zinc-900 dark:text-white">
        <span className="text-sm">Price: ${minPrice}+</span>
        {minPrice > 0 && (
          <ClearButton onClick={() => dispatch(setMinPrice(0))} />
        )}
      </div>
      <Slider
        value={[minPrice]}
        max={maxPrice}
        step={step}
        onValueChange={(value) => dispatch(setMinPrice(value[0]))}
      />
    </div>
  );
}
