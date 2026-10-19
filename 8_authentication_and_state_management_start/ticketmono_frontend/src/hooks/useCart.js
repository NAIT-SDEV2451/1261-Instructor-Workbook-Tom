import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be called inside of a CartProvider");
  }
  return context;
}
