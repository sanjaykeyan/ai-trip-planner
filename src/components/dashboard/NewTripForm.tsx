import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

interface NewTripFormProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    startDate: string;
    endDate: string;
    destinations: { name: string; startDate: string; endDate: string }[];
  }) => void;
}

export default function NewTripForm({ onClose, onSubmit }: NewTripFormProps) {
  const [title, setTitle] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !dateRange?.from || !dateRange?.to) {
      setError("All fields are required");
      return;
    }

    try {
      onSubmit({
        title,
        startDate: dateRange.from.toISOString(),
        endDate: dateRange.to.toISOString(),
        destinations: [
          {
            name: title,
            startDate: dateRange.from.toISOString(),
            endDate: dateRange.to.toISOString(),
          },
        ],
      });
    } catch (error) {
      setError("Failed to create trip. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Trip</h1>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Trip Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter trip name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Dates
          </label>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
              className="border-0"
              styles={{
                months: { gap: "1rem" },
                caption: { color: "#4F46E5" },
                day_selected: {
                  backgroundColor: "#4F46E5 !important",
                  color: "white !important",
                },
                day_range_middle: {
                  backgroundColor: "#EEF2FF !important",
                  color: "#4F46E5 !important",
                },
              }}
            />
          </div>
          {dateRange?.from && dateRange?.to && (
            <div className="mt-2 text-sm text-gray-600">
              Selected: {format(dateRange.from, "PPP")} -{" "}
              {format(dateRange.to, "PPP")}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
        >
          Create Trip
        </button>
      </form>
    </div>
  );
}
