import { createContext, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState({});

  // given a new item, clean up the cart accordingly
  function updateCart({
    eventId,
    eventName,
    tierId,
    tierName,
    tierPrice,
    quantity,
  }) {
    // create the key for this one item
    const key = `${eventId}-${tierId}`;
    setItems((prev) => {
      // case 1 - I've deleted the item
      if (quantity === 0) {
        // everything in the previous state that is not keyed with "key", goes into rest
        const { [key]: _, ...rest } = prev;
        return rest;
      }

      // case 2 - I've changed quantity
      return {
        ...prev,
        [key]: { eventId, eventName, tierId, tierName, tierPrice, quantity },
      };
    });
  }

  const value = { items, updateCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
