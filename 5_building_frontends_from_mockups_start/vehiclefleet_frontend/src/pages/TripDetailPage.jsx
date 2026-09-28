import { useParams } from "react-router-dom";

import BackButton from "../components/BackButton";
import TripMap from "../components/TripMap";
import TripInfo from "../components/TripInfo";

import { useTripDetails } from "../hooks/useTripDetails";

function TripDetailPage() {
  const { id } = useParams();
  const { trip, isLoading, isError, startTrip, completeTrip } =
    useTripDetails(id);

  if (isLoading) return <span className="loading loading-spinner loading-lg" />;
  if (isError || !trip) return <p className="text-error">Trip Not Found.</p>;

  return (
    //Page itself
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <BackButton to="/trips" label="Back to Trips" />
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Trip #{trip.id}</h1>
          {trip.status === "in_progress" && (
            <span className="badge badge-info">In Progress</span>
          )}
        </div>
      </div>

      {/* Map */}
      <TripMap
        startLocation={trip.start_location}
        endLocation={trip.end_location}
      />

      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button className="btn btn-outline">Get Directions</button>
        {trip.status === "in_progress" && (
          <button
            className="btn btn-outline"
            onClick={() => completeTrip.mutate()}
            disabled={completeTrip.isPending}
          >
            {completeTrip.isPending ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              "Complete Trip"
            )}
          </button>
        )}
        <button className="btn btn-outline btn-error">
          Can't Be Delivered
        </button>
      </div>

      {/* Trip Info */}
      <TripInfo trip={trip} />
    </div>
  );
}

export default TripDetailPage;
