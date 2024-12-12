import { cn } from "@/lib/utils";
import { useState } from "react";
import { Skeleton } from "./skeleton";

interface LoadingImageProps {
  className: string;
  src: string;
  alt: string;
}

const loadedImages = new Set<string>();

export const LoadingImage = ({ className, src, alt }: LoadingImageProps) => {
  const [isLoading, setIsLoading] = useState(() => !loadedImages.has(src));

  return (
    <div className={cn("relative", className)}>
      {isLoading && (
        <Skeleton className="absolute inset-0 mx-auto h-full w-2/3 rounded-xl" />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "mx-auto h-full rounded-xl transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
        )}
        onLoad={() => {
          setIsLoading(false);
          loadedImages.add(src);
        }}
      />
    </div>
  );
};
