import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  ExternalLink,
} from "lucide-react";

interface TripDetailsProps {
  trip: {
    title: string;
    date?: string;
    destinations: any[];
    status: string;
    aiPlan?: string;
  };
}

export default function TripDetails({ trip }: TripDetailsProps) {
  const renderEvent = (event: any) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-gray-900">{event.name}</h4>
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

        <p className="text-gray-700 mt-2">{event.description}</p>

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
  );

  const renderFormattedPlan = () => {
    if (!trip.aiPlan) return null;

    let plan;
    try {
      plan = JSON.parse(trip.aiPlan);
    } catch (error) {
      console.error("Failed to parse trip plan:", error);
      return (
        <div className="bg-red-50 p-6 rounded-lg border border-red-200">
          <h3 className="text-lg font-semibold text-red-700 mb-2">
            Error displaying trip plan
          </h3>
          <p className="text-red-600">
            There was an issue with the trip plan data. Please try regenerating
            the plan.
          </p>
        </div>
      );
    }

    // Check if this is a fallback plan with no events
    const isEmptyPlan = plan.dailyItinerary.every(
      (day) => day.events.length === 0
    );

    if (isEmptyPlan) {
      return (
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-700 mb-2">
            Trip Plan Generation Failed
          </h3>
          <p className="text-yellow-600 mb-4">{plan.overview}</p>
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
            Try Again
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {/* Overview and Budget */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">Trip Overview</h4>
          <p className="text-gray-700 mb-4">{plan.overview}</p>
          <div className="text-xl font-semibold text-indigo-600">
            Estimated Budget: {plan.totalBudget}
          </div>
        </div>

        {/* Daily Itinerary */}
        <div className="space-y-6">
          {plan.dailyItinerary.map((day: any, index: number) => (
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
                {day.events.map((event: any, eventIndex: number) => (
                  <div key={eventIndex}>{renderEvent(event)}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Practical Information */}
        <div className="grid grid-cols-3 gap-6">
          {Object.entries(plan.practicalInfo).map(
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
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {trip.title}
          </h1>
          {trip.date && (
            <div className="flex items-center text-gray-500">
              <Calendar className="h-5 w-5 mr-2" />
              {trip.date}
            </div>
          )}
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-all duration-200">
            Share
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:shadow-md transition-all duration-200">
            Edit Trip
          </button>
        </div>
      </div>

      {trip.aiPlan ? (
        renderFormattedPlan()
      ) : (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Destinations
            </h3>
            <ul className="space-y-2">
              {trip.destinations.map((dest: any, index: number) => (
                <li key={index} className="text-gray-700">
                  {dest.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
