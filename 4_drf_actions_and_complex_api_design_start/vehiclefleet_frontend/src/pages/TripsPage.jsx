import TripList from "../components/TripList";
import { useTrips } from "../hooks/useTrips";

import StatCard from "../components/StatCard";
import { useStats } from "../hooks/useStats";
import AverageDistanceChart from "../components/AverageDistanceChart";

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
  const { trips, isLoading } = useTrips();
  const { stats } = useStats();

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ key, label, color }) => (
          <StatCard
            key={key}
            label={label}
            value={stats?.[key]}
            color={color}
          />
        ))}
      </div>

      <AverageDistanceChart data={stats.avg_distance_per_week} />

      <div>
        <h2 className="text-xl font-semibold mb-3">Trips</h2>
        {isLoading ? (
          <span className="loading loading-spinner loading-md" />
        ) : (
          <TripList trips={trips} />
        )}
      </div>
    </div>
  );
}

export default TripsPage;
