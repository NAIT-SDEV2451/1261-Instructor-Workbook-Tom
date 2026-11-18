---
paths:
  - "ticketmono_backend/**/tests.py"
  - "ticketmono_frontend/src/__tests__/**"
  - "ticketmono_frontend/src/test/**"
---

# Testing

- Tests should test success, loading, and error states separately
- Tests should be small-scale/unit tests unless explicitly testing integration or end-to-end functionality
- Test each case only once. Do not add tests that catch failures existing tests already cover
- For the frontend use MSW at the network boundary for mocking things
