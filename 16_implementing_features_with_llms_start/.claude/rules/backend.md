---
paths:
  - "ticketmono_backend/**/*.py"
---

# Backend

- Use DRF ViewSets, serializers, and routers, matching the style in the "event_tickets" app
- Keep "select_related" and "prefetch_related" on querysets that return related data
- Don't change the app breakdown or folder structure without asking me
- Set permissions explicitly on every ViewSet with "permission_classes" or "get_permissions"
