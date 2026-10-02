import { createContext, useState } from "react";

export const PaginationContext = createContext(null);

export function PaginationProvider({ pageSize = 5, children }) {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <PaginationContext.Provider
      value={{
        page,
        totalCount,
        totalPages,
        setTotalCount,
        goToNext: () => setPage((p) => Math.min(p + 1, totalPages)),
        goToPrevious: () => setPage((p) => Math.max(p - 1, 1)),
        goToPage: (n) => setPage(Math.max(1, Math.min(n, totalPages))),
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
}
