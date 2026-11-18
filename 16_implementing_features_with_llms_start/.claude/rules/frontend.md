---
paths:
  - "ticketmono_frontend/src/**"
---

# Frontend

- Style the app following existing patterns using Daisy-UI and Tailwind css
- Components should be kept presentational and API calls should be done at a page level
- Data flows from 'src/api' through 'src/hooks' to pages. Network calls only happend in 'src/api' and have to use 'apiClient' for auth purposes
- Every page that loads data needs a loading and error state. Pages should also have empty states
- For caching data and server state alignment use Tanstack-Query. Query keys should include every parameter
