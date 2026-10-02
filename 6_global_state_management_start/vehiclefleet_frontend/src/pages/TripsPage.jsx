import TripList from "../components/TripList";
import StatCard from "../components/StatCard";
import AverageDistanceChart from "../components/AverageDistanceChart";
import { useTrips } from "../hooks/useTrips";
import { useStats } from "../hooks/useStats";
import { useState } from "react";

const STAT_CARDS = [
  {
    key: "total_vehicles",
    label: "Total Vehicles",
    color: "bg-primary text-primary-content",
  },
  {
    key: "total_drivers",
    label: "Total Drivers",
    color: "bg-secondary text-secondary-content",
  },
  {
    key: "total_trips",
    label: "Total Trips",
    color: "bg-accent text-accent-content",
  },
  {
    key: "avg_trip_distance",
    label: "Average Trip Distance",
    color: "bg-neutral text-neutral-content",
  },
];

function TripsPage() {
  const [page, setPage] = useState(1);
  const { trips, isLoading } = useTrips(page);
  const { stats } = useStats();

  const hasPrevious = page > 1;
  const hasNext = !!trips.next;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ key, label, color }) => (
          <StatCard
            key={key}
            label={label}
            value={stats?.[key]}
            color={color}
          />
        ))}
      </div>

      {stats?.avg_distance_per_week?.length > 0 && (
        <AverageDistanceChart data={stats.avg_distance_per_week} />
      )}

      <div>
        <h2 className="text-xl font-semibold mb-3">Trips</h2>
        {isLoading ? (
          <span className="loading loading-spinner loading-md" />
        ) : (
          <TripList trips={trips.results} />
        )}
        <div className="flex items-center gap-3 mt-4">
          <button
            className="btn btn-sm btn-outline"
            disabled={!hasPrevious}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </button>
          <span>{trips.count} trips total</span>
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripsPage;
