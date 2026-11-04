// This file sets up our mock service worker default response
import { http, HttpResponse } from "msw";

const BASE_URL = "http://localhost:8000/api/v1";

export const mockEvents = [
  {
    id: 1,
    name: "Indie Rock Night",
    date_time: "2026-11-14T19:30:00Z",
    venue: { id: 1, name: "The Aurora Room", address: "221 King St NW" },
  },
  {
    id: 2,
    name: "Comedy Open Mic",
    date_time: "2026-11-20T20:30:00Z",
    venue: { id: 2, name: "The Chuckle Hut", address: "123 Apple St NW" },
  },
];

export const handlers = [
  http.get(`${BASE_URL}/events/`, () => {
    return HttpResponse.json(mockEvents);
  }),
];
