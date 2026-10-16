import { useParams } from "react-router-dom";

function EventDetailPage() {
  const { id } = useParams();
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold">Event Detail Page</h1>
      <p className="text-base-content/60 mt-2">Event ID: {id}</p>
    </div>
  );
}

export default EventDetailPage;
