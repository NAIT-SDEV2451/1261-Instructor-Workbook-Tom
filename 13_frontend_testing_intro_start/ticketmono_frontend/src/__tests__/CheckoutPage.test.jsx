import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";

import CheckoutPage from "../pages/attendee/CheckoutPage";
import { CartContext } from "../contexts/CartContext";
import { renderWithProviders } from "../test/renderWithProviders";
import { server } from "../test/server";

const ORDERS_URL = "http://localhost:8000/api/v1/orders/";

describe("CheckoutPage Tests", () => {
  it("sends the correct request to the server when placing an order", async () => {
    // Set up a variable that will capture the body the page POSTs to /orders/
    let requestBody;
    server.use(
      http.post(ORDERS_URL, async ({ request }) => {
        requestBody = await request.json();
        return HttpResponse.json({ id: 99 }, { status: 201 });
      }),
    );

    // Create the items for the cart.
    const cartItems = {
      "1-10": {
        eventId: 1,
        eventName: "Indie Rock Night",
        tierId: 10,
        tierName: "General Admission",
        tierPrice: "50.00",
        quantity: 2,
      },
      "2-20": {
        eventId: 2,
        eventName: "Comedy Open Mic",
        tierId: 20,
        tierName: "Front Row",
        tierPrice: "30.00",
        quantity: 1,
      },
    };

    // Place the items in the cart context and make that available to the CheckoutPage.
    renderWithProviders(
      <CartContext.Provider
        value={{
          items: cartItems,
          updateCart: () => {
            /* NO-OP */
          },
        }}
      >
        <CheckoutPage />
      </CartContext.Provider>,
    );

    // Click the "Place Order" button and wait for the request to be sent.
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Place Order" }));

    await waitFor(() => {
      expect(requestBody).toEqual({
        items: [
          { event_id: 1, ticket_tier_id: 10, quantity: 2 },
          { event_id: 2, ticket_tier_id: 20, quantity: 1 },
        ],
      });
    });
  });
});
