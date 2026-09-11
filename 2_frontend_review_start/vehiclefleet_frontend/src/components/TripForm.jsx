import { useState } from "react";

function TripForm({ drivers, vehicles, onSubmit }) {
  return (
    <div className="card bg-base-100 shadow-md w-full max-w-xl">
      <div className="card-body gap-5">
        <form className="flex flex-col gap-5">
          <label className="form-control w-full">
            <div className="label pb-1">
              <span className="label-text font-medium">Vehicle</span>
            </div>
            <select
              name="vehicle"
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select a vehicle
              </option>
              {vehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.year} {v.make} {v.model} - {v.license_plate}
                </option>
              ))}
            </select>
          </label>

          <label className="form-control w-full">
            <div className="label pb-1">
              <span className="label-text font-medium">Driver</span>
            </div>
            <select
              name="driver"
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Select a Driver
              </option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} - {d.license_number}
                </option>
              ))}
            </select>
          </label>
        </form>
      </div>
    </div>
  );
}
