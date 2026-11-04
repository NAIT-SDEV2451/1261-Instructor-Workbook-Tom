import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../test/renderWithProviders";
import { mockEvents } from "../test/handlers";

import EventCard from "../components/EventCard";

describe("EventCard Tests", () => {
  const event = mockEvents[0];

  it("renders the event name", () => {
    renderWithProviders(<EventCard event={event} />);

    expect(screen.getByText(event.name)).toBeInTheDocument();
  });

  it("renders with venue name and address", () => {
    renderWithProviders(<EventCard event={event} />);

    expect(screen.getByText(event.venue.name)).toBeInTheDocument();
    expect(screen.getByText(event.venue.address)).toBeInTheDocument();
  });

  it("links to the event detail page", () => {
    renderWithProviders(<EventCard event={event} />);

    const link = screen.getByRole("link", { name: "Get Tickets" });
    expect(link).toHaveAttribute("href", `/events/${event.id}`);
  });
});
