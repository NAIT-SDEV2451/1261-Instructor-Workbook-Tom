import { useContext } from "react";
import { PaginationContext } from "../contexts/PaginationContext";

export function usePagination() {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error(
      "usePagination must be called inside of a PaginationProvider",
    );
  }
  return {
    page: context.page,
    totalCount: context.totalCount,
    totalPages: context.totalPages,
    hasNext: context.page < context.totalCount,
    hasPrevious: context.page > 1,
    setTotalCount: context.setTotalCount,
    goToNext: context.goToNext,
    goToPrevious: context.goToPrevious,
    goToPage: context.goToPage,
  };
}
