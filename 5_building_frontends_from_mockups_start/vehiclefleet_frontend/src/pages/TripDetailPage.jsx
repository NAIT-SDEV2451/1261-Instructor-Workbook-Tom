import BackButton from "../components/BackButton";
import TripMap from "../components/TripMap";
import TripInfo from "../components/TripInfo";
import { TRIPS } from "../mockData";

const MOCK_TRIP = TRIPS[0];

function TripDetailPage() {
  const trip = MOCK_TRIP;
  const isInProgress = trip.end_time == null;

  return (
    //Page itself
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <BackButton to="/trips" label="Back to Trips" />
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Trip #{trip.id}</h1>
          {isInProgress && (
            <span className="badge badge-info">In Progress</span>
          )}
        </div>
      </div>

      {/* Map */}

      {/* Buttons */}
      <div></div>

      {/* Trip Info */}
    </div>
  );
}

export default TripDetailPage;
