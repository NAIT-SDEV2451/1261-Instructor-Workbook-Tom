import VehicleList from "../components/VehicleList";
import DriverList from "../components/DriverList";
import { useVehicles } from "../hooks/useVehicles";
import { useDrivers } from "../hooks/useDrivers";

function VehiclesAndDriversPage() {
  const { vehicles, isLoading: isLoadingVehicles } = useVehicles();
  const { drivers, isLoading: isLoadingDrivers } = useDrivers();

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h2 className="text-xl font-semibold mb-3">Vehicles</h2>
        {isLoadingVehicles ? (
          <span className="loading loading-spinner loading-md" />
        ) : (
          <VehicleList vehicles={vehicles} />
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Drivers</h2>
        {isLoadingDrivers ? (
          <span className="loading loading-spinner loading-md" />
        ) : (
          <DriverList drivers={drivers} />
        )}
      </section>
    </div>
  );
}

export default VehiclesAndDriversPage;
