import TripCard from "./TripCard";

// This represents a row of stat cards about a trip for use on the trip page
function TripInfo({ trip }) {
  const {
    vehicle_detail,
    driver_detail,
    start_location,
    start_time,
    end_location,
    distance,
  } = trip;

  const formattedStartTime = new Date(start_time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }); // formats a datetime to HH:MM instead of just 2026-02-24 12:52AM UTC

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <TripCard
        title="Vehicle"
        value={vehicle_detail.license_plate}
        description={`${vehicle_detail.year} ${vehicle_detail.make} ${vehicle_detail.model}`}
      />
      <TripCard
        title="Driver"
        value={driver_detail.name}
        description={driver_detail.license_number}
      />
      <TripCard
        title="Route"
        value={`${start_location} -> ${end_location}`}
        description={`${distance ? `${distance} km` : "In Progress"} - Started: ${formattedStartTime}`}
      />
    </div>
  );
}

export default TripInfo;
