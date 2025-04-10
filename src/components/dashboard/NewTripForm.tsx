import { useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import { format } from "date-fns";
import {
  Plus,
  X,
  Wallet,
  CreditCard,
  DollarSign,
  Loader2,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";
import "react-day-picker/dist/style.css";
import { formatTripPlan, TripPlans } from "@/utils/tripPlanFormatter";

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
  const [generatedPlans, setGeneratedPlans] = useState<TripPlans | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

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
        throw new Error(data.error || "Failed to generate trip plans");
      }

      setGeneratedPlans(data.plans);
      setSelectedPlanId(data.plans.variants[0].id);
      setIsFormMinimized(true);
    } catch (error: any) {
      setError(error.message || "Failed to create trip. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormattedPlan = (plan: string) => {
    try {
      const formatted = JSON.parse(plan);

      return (
        <div className="space-y-8">
          {/* Overview and Budget */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Trip Overview</h4>
            <p className="text-gray-700 mb-4">{formatted.overview}</p>
            <div className="text-xl font-semibold text-indigo-600">
              Estimated Budget: {formatted.totalBudget}
            </div>
          </div>

          {/* Daily Itinerary */}
          <div className="space-y-6">
            {formatted.dailyItinerary?.map((day: any, index: number) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900">
                      Day {day.dayNumber} -{" "}
                      {new Date(day.date).toLocaleDateString()}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {day.location}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {day.events?.map((event: any, eventIndex: number) => (
                    <div
                      key={eventIndex}
                      className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-semibold text-gray-900">
                          {event.name}
                        </h4>
                        <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                          {event.type}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {event.startTime} ({event.duration})
                        </div>

                        <div className="flex items-center text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2" />
                          {event.cost}
                        </div>

                        <p className="text-gray-700 mt-2">
                          {event.description}
                        </p>

                        {event.bookingRequired && (
                          <div className="mt-3">
                            <a
                              href={event.bookingUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
                            >
                              Book Now
                              <ExternalLink className="h-4 w-4 ml-1" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Practical Information */}
          <div className="grid grid-cols-3 gap-6">
            {formatted.practicalInfo &&
              Object.entries(formatted.practicalInfo).map(
                ([key, items]: [string, any]) => (
                  <div
                    key={key}
                    className="bg-white p-4 rounded-lg border border-gray-200"
                  >
                    <h4 className="font-semibold text-gray-900 mb-3 capitalize">
                      {key}
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      {items.map((item: string, i: number) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )
              )}
          </div>
        </div>
      );
    } catch (error) {
      console.error("Error formatting plan:", error);
      return (
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error displaying trip plan
          </h3>
          <p className="text-red-700">
            There was an issue with the generated trip plan. Please try again.
          </p>
          <pre className="mt-4 bg-red-100 p-2 rounded text-xs text-red-800 overflow-auto">
            {plan}
          </pre>
        </div>
      );
    }
  };

  const PlanVariantSelector = () => {
    const categoryLabels = {
      LOW: "Budget-Friendly Options",
      MEDIUM: "Moderate Options",
      HIGH: "Luxury Options",
    };

    return (
      <div className="space-y-8">
        {Object.entries(categoryLabels).map(([category, label]) => {
          const categoryVariants = generatedPlans?.variants.filter(
            (v) => v.category === category
          );

          if (categoryVariants?.length === 0) return null;

          return (
            <div key={category}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{label}</h3>
              <div className="grid grid-cols-3 gap-4">
                {categoryVariants?.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedPlanId(variant.id)}
                    className={`p-4 rounded-lg border-2 text-left ${
                      selectedPlanId === variant.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-indigo-300"
                    }`}
                  >
                    <h4 className="font-medium text-gray-900 mb-2">
                      {variant.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {variant.description}
                    </p>
                    <div className="text-sm text-gray-600">
                      {variant.plan.totalBudget} • {variant.plan.dailyItinerary.length} days
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
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

      {/* Generated Plans */}
      {generatedPlans && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Choose Your Trip Plan
          </h3>
          <PlanVariantSelector />
          {selectedPlanId && (
            <>
              {renderFormattedPlan(
                JSON.stringify(
                  generatedPlans.variants.find((v) => v.id === selectedPlanId)
                    ?.plan
                )
              )}
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
                      aiPlan: JSON.stringify(
                        generatedPlans.variants.find(
                          (v) => v.id === selectedPlanId
                        )?.plan
                      ),
                    })
                  }
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Save Trip
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
