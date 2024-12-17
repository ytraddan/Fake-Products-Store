import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

interface LoadingSkeletonProps {
  itemsPerPage: number;
}

export default function LoadingSkeleton({ itemsPerPage }: LoadingSkeletonProps) {
  const { viewMode } = useSelector((state: RootState) => state.filters);
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

      {viewMode === "grid" ? (
        <SkeletonGrid itemsPerPage={itemsPerPage} />
      ) : (
        <SkeletonList itemsPerPage={itemsPerPage} />
      )}
    </div>
  );
}

interface SkeletonGridProps {
  itemsPerPage: number;
}

function SkeletonGrid({ itemsPerPage }: SkeletonGridProps) {
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

interface SkeletonListProps {
  itemsPerPage: number;
}

function SkeletonList({ itemsPerPage }: SkeletonListProps) {
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