import TripList from "../components/TripList";
import { TRIPS } from "../mockData";

function TripPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Trips</h2>
      <TripList trips={TRIPS} />
    </div>
  );
}

export default TripPage;
