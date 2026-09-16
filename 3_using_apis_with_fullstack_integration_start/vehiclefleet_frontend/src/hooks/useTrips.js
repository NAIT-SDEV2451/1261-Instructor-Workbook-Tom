import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { createTrip, fetchTrips } from "../api/fleet";

export function useTrips() {
  const {
    data: trips = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: fetchTrips,
  });
  return { trips, isLoading, isError, error };
}

export function useCreateTrip() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
    },
  });
}
