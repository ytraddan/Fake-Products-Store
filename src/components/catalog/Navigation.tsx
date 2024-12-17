import { useDispatch } from "react-redux";
import { AppDispatch } from "@/state/store";
import { setCurrentPage } from "@/state/filtersSlice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface NavigationProps {
  currentPage: number;
  totalPages: number;
}

export default function Navigation({
  currentPage,
  totalPages,
}: NavigationProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Pagination className="fixed bottom-8 left-0 right-0 w-fit rounded-lg bg-zinc-100/80 backdrop-blur-sm transition-colors dark:bg-zinc-900">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => dispatch(setCurrentPage(currentPage - 1))}
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i + 1}>
            <PaginationLink
              onClick={() => dispatch(setCurrentPage(i + 1))}
              isActive={currentPage === i + 1}
              className={"cursor-pointer"}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => dispatch(setCurrentPage(currentPage + 1))}
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
