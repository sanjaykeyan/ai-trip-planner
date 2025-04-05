import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import { Plus, X, Wallet, CreditCard, DollarSign, Loader2 } from "lucide-react";
import "react-day-picker/dist/style.css";

interface Destination {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface NewTripFormProps {
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    budget: "LOW" | "MEDIUM" | "HIGH";
    destinations: {
      name: string;
      startDate: string;
      endDate: string;
      order: number;
    }[];
    preferences: string[];
    aiPlan?: string;
  }) => void;
}

export default function NewTripForm({ onClose, onSubmit }: NewTripFormProps) {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [destinations, setDestinations] = useState<Destination[]>([
    {
      name: "",
      startDate: null,
      endDate: null,
    },
  ]);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<string>("");
  const [isFormMinimized, setIsFormMinimized] = useState(false);

  const preferenceOptions = [
    "Culture & History",
    "Food & Dining",
    "Nature & Outdoors",
    "Shopping",
    "Adventure",
    "Relaxation",
    "Nightlife",
    "Family-friendly",
  ];

  const budgetRanges = [
    {
      value: "LOW",
      label: "Budget Friendly",
      icon: Wallet,
      description: "Economical options",
    },
    {
      value: "MEDIUM",
      label: "Moderate",
      icon: CreditCard,
      description: "Mid-range comfort",
    },
    {
      value: "HIGH",
      label: "Luxury",
      icon: DollarSign,
      description: "Premium experience",
    },
  ] as const;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (
      !title ||
      destinations.some((d) => !d.name || !d.startDate || !d.endDate)
    ) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    try {
      const tripData = {
        title,
        budget,
        destinations: destinations.map((dest, index) => ({
          name: dest.name,
          startDate: dest.startDate!.toISOString(),
          endDate: dest.endDate!.toISOString(),
          order: index,
        })),
        preferences,
      };

      const response = await fetch("/api/tripplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tripData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate trip plan");
      }

      setGeneratedPlan(data.plan);
      setIsFormMinimized(true);
    } catch (error: any) {
      setError(error.message || "Failed to create trip. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div
        className={`transition-all duration-300 ${
          isFormMinimized ? "border-b pb-4 mb-4" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Plan Your Trip</h1>
          <div className="flex gap-2">
            {isFormMinimized && (
              <button
                type="button"
                onClick={() => setIsFormMinimized(false)}
                className="text-indigo-600 hover:text-indigo-700"
              >
                Edit Details
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div
          className={`transition-all duration-300 ${
            isFormMinimized ? "hidden" : "block"
          }`}
        >
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Budget Range
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {budgetRanges.map((range) => {
                    const Icon = range.icon;
                    return (
                      <div
                        key={range.value}
                        onClick={() => setBudget(range.value)}
                        className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                          budget === range.value
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-200 hover:border-indigo-200"
                        }`}
                      >
                        <div className="flex items-center justify-center mb-2">
                          <Icon
                            className={`h-6 w-6 ${
                              budget === range.value
                                ? "text-indigo-600"
                                : "text-gray-400"
                            }`}
                          />
                        </div>
                        <h3 className="font-medium text-gray-900 text-center">
                          {range.label}
                        </h3>
                        <p className="text-sm text-gray-500 text-center">
                          {range.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Preferences
                </label>
                <div className="flex flex-wrap gap-2">
                  {preferenceOptions.map((pref) => (
                    <button
                      key={pref}
                      type="button"
                      onClick={() => {
                        setPreferences(
                          preferences.includes(pref)
                            ? preferences.filter((p) => p !== pref)
                            : [...preferences, pref]
                        );
                      }}
                      className={`px-4 py-2 rounded-full text-sm ${
                        preferences.includes(pref)
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>

              {/* Destinations Section */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  Destinations
                </label>
                {destinations.map((dest, index) => (
                  <div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg space-y-4"
                  >
                    {/* Destination inputs */}
                    <input
                      type="text"
                      value={dest.name}
                      onChange={(e) => {
                        const newDests = [...destinations];
                        newDests[index].name = e.target.value;
                        setDestinations(newDests);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="Enter destination name"
                    />
                    <div className="calendar-wrapper p-2 bg-white rounded-lg">
                      <style jsx>{`
                        .calendar-wrapper :global(.rdp) {
                          margin: 0;
                        }
                        .calendar-wrapper :global(.rdp-months) {
                          justify-content: center;
                        }
                        .calendar-wrapper :global(.rdp-day_selected),
                        .calendar-wrapper :global(.rdp-day_selected:hover) {
                          background-color: rgb(79, 70, 229);
                        }
                        .calendar-wrapper :global(.rdp-day_range_middle) {
                          background-color: rgb(238, 242, 255);
                          color: rgb(79, 70, 229);
                        }
                      `}</style>
                      <DayPicker
                        mode="range"
                        selected={{
                          from: dest.startDate!,
                          to: dest.endDate!,
                        }}
                        onSelect={(range) => {
                          if (range) {
                            const newDests = [...destinations];
                            newDests[index].startDate = range.from!;
                            newDests[index].endDate = range.to!;
                            setDestinations(newDests);
                          }
                        }}
                        className="border-0"
                        styles={{
                          caption: { color: "rgb(79, 70, 229)" },
                          head_cell: { color: "rgb(107, 114, 128)" },
                        }}
                      />
                    </div>
                    {dest.startDate && dest.endDate && (
                      <div className="text-sm text-gray-600">
                        Selected dates: {format(dest.startDate, "PPP")} -{" "}
                        {format(dest.endDate, "PPP")}
                      </div>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setDestinations([
                      ...destinations,
                      { name: "", startDate: null, endDate: null },
                    ])
                  }
                  className="flex items-center text-indigo-600 hover:text-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Destination
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 inline animate-spin" />
                  Creating Trip...
                </>
              ) : (
                "Generate Trip Plan"
              )}
            </button>
          </form>
        </div>

        {/* Summary when minimized */}
        {isFormMinimized && (
          <div className="flex gap-4 text-sm text-gray-600">
            <span>{destinations.length} destinations</span>
            <span>•</span>
            <span>{budget} budget</span>
            <span>•</span>
            <span>{preferences.length} preferences</span>
          </div>
        )}
      </div>

      {/* Generated Plan */}
      {generatedPlan && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            AI Generated Trip Plan
          </h3>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-700">
              {generatedPlan}
            </pre>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() =>
                onSubmit({
                  title,
                  budget,
                  destinations: destinations.map((dest, index) => ({
                    name: dest.name,
                    startDate: dest.startDate!.toISOString(),
                    endDate: dest.endDate!.toISOString(),
                    order: index,
                  })),
                  preferences,
                  aiPlan: generatedPlan,
                })
              }
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Save Trip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
