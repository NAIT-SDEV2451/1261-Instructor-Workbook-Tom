import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { fetchTrips, createTrip } from "../api/fleet";

export function useTrips(page = 1) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trips", page],
    queryFn: () => fetchTrips(page),
    placeholderData: keepPreviousData,
  });

  return {
    trips: data ?? { results: [], count: 0 },
    isLoading,
    isError,
    error,
  };
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
