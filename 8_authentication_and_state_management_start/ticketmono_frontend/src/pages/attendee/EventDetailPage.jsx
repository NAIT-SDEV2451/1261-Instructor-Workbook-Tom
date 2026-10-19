import { useParams } from "react-router-dom";

import { useEvent } from "../../hooks/useEvent";

import EventDetailsHeader from "../../components/EventDetailsHeader";
import TicketTierList from "../../components/TicketTierList";

const STATIC_TIERS = [
  { id: 1, name: "Floor", price: "150.00" },
  { id: 2, name: "Lower Bowl", price: "85.00" },
  { id: 3, name: "Upper Bowl", price: "45.00" },
];

function EventDetailPage() {
  const { id } = useParams();
  const { data: event, isLoading, isError } = useEvent(id);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="alert alert-error">
          <span>Failed to load event. Please try again later.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <EventDetailsHeader event={event} />
      <TicketTierList tiers={event.ticket_tiers} />
    </div>
  );
}

export default EventDetailPage;
