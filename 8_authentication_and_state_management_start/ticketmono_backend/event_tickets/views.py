from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Event
from .serializers import EventListReadOnlySerializer

class EventViewSet(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = Event.objects.select_related("venue", "organizer").prefetch_related("ticket_tiers")

    def get_serializer_class(self):
        if self.action == "list":
            return EventListReadOnlySerializer
        else:
            # Here you could return a create serializer, or something not readonly
            return EventListReadOnlySerializer
