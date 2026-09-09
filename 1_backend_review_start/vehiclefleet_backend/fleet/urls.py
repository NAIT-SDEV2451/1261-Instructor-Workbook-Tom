from django.urls import path, include
from rest_framework.routers import DefaultRouter

from fleet.views import DriverViewSet, VehicleViewSet, TripViewSet, FleetStatsView

router = DefaultRouter()
router.register("vehicles", VehicleViewSet, basename="vehicle")
router.register("drivers", DriverViewSet, basename="driver")
router.register("trips", TripViewSet, basename="trip")

urlpatterns = [
    path("", include(router.urls)),
    path("stats/", FleetStatsView.as_view(), name="fleet-stats")
]
