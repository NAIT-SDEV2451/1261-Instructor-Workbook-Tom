import { useParams } from "react-router-dom";

const MOCK_ORDER = {
  id: 1,
  tickets: [
    {
      id: 1,
      eventName: "Oilers vs Flames Game",
      tierName: "upper balcony",
      quantity: 2,
    },
    {
      id: 1,
      eventName: "Oilers vs Flames Game",
      tierName: "rink side",
      quantity: 2,
    },
  ],
};

function OrderConfirmationPage() {
  const { id } = useParams();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-base-content/60">Order #{id}</p>
      </div>

      {/* Ticket Section */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title text-lg mb-4">Your Tickets</h2>
          {MOCK_ORDER.tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex justify-between items-center py-3 border-b border-base-300 last:border-0"
            >
              <div>
                <p className="font-semibold">{ticket.eventName}</p>
                <p className="text-sm text-base-content/60">
                  {ticket.tierName} × {ticket.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;
