import { useState } from "react";

const EMPTY_FORM = {
  vehicle: "",
  driver: "",
  start_location: "",
  end_location: "",
  start_time: "",
};

function TripForm({ drivers, vehicles, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm(EMPTY_FORM);
  }

  return (
    <div className="card bg-base-100 shadow-md w-full max-w-xl">
      <div className="card-body gap-5">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <label className="form-control w-full">
            <div className="label pb-1">
              <span className="label-text font-medium">Vehicle</span>
            </div>
            <select
              name="vehicle"
              className="select select-bordered w-full"
              value={form.vehicle}
              onChange={handleChange}
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
              value={form.driver}
              onChange={handleChange}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="form-control w-full">
              <div className="label pb-1">
                <span className="label-text font-medium">Start Location</span>
              </div>
              <input
                type="text"
                name="start_location"
                className="input input-bordered w-full"
                placeholder="e.g. Downtown No Frills"
                value={form.start_location}
                onChange={handleChange}
                required
              />
            </label>

            <label className="form-control w-full">
              <div className="label pb-1">
                <span className="label-text font-medium">End Location</span>
              </div>
              <input
                type="text"
                name="end_location"
                className="input input-bordered w-full"
                placeholder="e.g. Uptown No Frills"
                value={form.end_location}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label className="form-control w-full">
            <div className="label pb-1">
              <span className="label-text font-medium">Start Time</span>
            </div>
            <input
              type="datetime-local"
              name="start_time"
              className="input input-bordered w-full"
              value={form.start_time}
              onChange={handleChange}
              required
            />
          </label>

          <div className="card-actions justify-end pt-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TripForm;
