import { useQuery } from "@tanstack/react-query";
import { getOrder } from "../api/orders";

export function useOrder(id) {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => getOrder(id),
  });
}
