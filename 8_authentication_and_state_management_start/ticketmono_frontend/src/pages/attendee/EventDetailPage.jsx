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
  console.log(event);
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <EventDetailsHeader />
      <TicketTierList tiers={STATIC_TIERS} />
    </div>
  );
}

export default EventDetailPage;
