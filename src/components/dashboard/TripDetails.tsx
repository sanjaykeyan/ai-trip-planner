import { Calendar } from "lucide-react";

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
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            AI Generated Trip Plan
          </h3>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-gray-700">
              {trip.aiPlan}
            </pre>
          </div>
        </div>
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
