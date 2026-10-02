import { usePagination } from "../hooks/usePagination";

function TripsPagination() {
  const {
    hasNext,
    hasPrevious,
    goToNext,
    goToPrevious,
    page,
    totalCount,
    totalPages,
  } = usePagination();

  return (
    <div className="flex items-center gap-3 mt-4">
      <button
        className="btn btn-sm btn-outline"
        disabled={!hasPrevious}
        onClick={goToPrevious}
      >
        Previous
      </button>
      <span>
        {page} page of {totalPages} - {totalCount} trips total
      </span>
      <button
        className="btn btn-sm btn-outline"
        onClick={goToNext}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
}

export default TripsPagination;
