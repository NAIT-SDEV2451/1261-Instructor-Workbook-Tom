import apiClient from "./client";

export async function fetchEvents() {
  // make the request
  const res = await apiClient("/events/");
  // verify it's ok
  if (!res.ok) throw new Error("Failed to fetch events.");
  // return the json
  return res.json();
}
