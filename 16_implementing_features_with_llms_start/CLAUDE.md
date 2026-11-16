# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

TicketMono is a course project (NAIT): a Django REST backend and a React frontend for buying event tickets. Solutions should match the level and style of the existing code, not production-grade patterns beyond it.

## Commands

Backend, from `ticketmono_backend/` with the virtual environment active:

- `python manage.py runserver` (port 8000), `python manage.py migrate`
- Sample data: `python manage.py create_organizers` then `python manage.py loaddata event_data.json`. Organizers are `alice_organizer` / `Organizer@100` and `bob_organizer` / `Organizer@101`. There are no orders in the sample data.
- Tests: `python manage.py test`, single test: `python manage.py test event_tickets.tests.EventTicketsTestCase.test_order_total_price`
- Coverage: `coverage run manage.py test`, then `coverage report` or `coverage html` (config in `.coveragerc`)

Frontend, from `ticketmono_frontend/`:

- `npm run dev` (port 5173), `npm run lint`, `npm run build`
- Tests: `npm run test:run`, single file: `npx vitest run src/__tests__/EventCard.test.jsx`, by name: add `-t "<test name>"`

## Architecture

**Backend.** Two apps. `core` owns `CustomUser` (with a `role` field) and the auth endpoints under `/api/v1/auth/` (register, SimpleJWT login and refresh, `me`). `event_tickets` owns Venue, Event, TicketTier, Ticket and Order, exposed through `ModelViewSet`s on a `DefaultRouter` under `/api/v1/`. Views pick a serializer per action with `get_serializer_class`. Auth is JWT bearer only. SQLite database. CORS allows only `http://localhost:5173`.

An order is a set of `Ticket` rows, each pointing at a `TicketTier`, so the order total and tickets sold are derived from tiers (`Order.total_price`), not stored.

**Frontend.** React 19, Vite, Tailwind 4 with daisyUI, TanStack Query, React Router 7. Plain JavaScript, no TypeScript.

- Data flows `src/api/` → `src/hooks/` → `src/pages/`. All network calls go through `apiClient` in `src/api/client.js`, which attaches the bearer token and silently refreshes it on a 401, using callbacks registered by `AuthProvider`.
- Tokens and the stored user live in localStorage via `src/api/tokenStorage.js`.
- `AuthContext` holds the session, `CartContext` holds ticket selections before checkout. Read them through `useAuth` and `useCart`.
- Routes are declared in `App.jsx`. Logged-in-only pages are wrapped in `ProtectedRoute`. Pages are grouped by user type (`pages/attendee`, `pages/auth`).
- The API base URL comes from `VITE_API_URL`, defaulting to `http://localhost:8000/api/v1`.

**Frontend tests.** Vitest with jsdom and globals. MSW mocks the API at the network boundary: handlers and mock data are in `src/test/handlers.js`, started in `src/test/setup.js`. Render components with `renderWithProviders` from `src/test/renderWithProviders.jsx` (fresh QueryClient without retries, plus `MemoryRouter`). It does not wrap `AuthProvider` or `CartProvider`.
