import { Map, Calendar, ChevronRight } from "lucide-react";

interface TripCardProps {
  trip: {
    title: string;
    date: string;
    destinations: string[];
    status: string;
  };
  isSelected: boolean;
  onClick: () => void;
}

export default function TripCard({ trip, isSelected, onClick }: TripCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
        isSelected
          ? "bg-indigo-50 border-2 border-indigo-500"
          : "border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50"
      }`}
    >
      <h4 className="font-medium text-gray-900 mb-1">{trip.title}</h4>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <Calendar className="h-4 w-4 mr-1" />
        {trip.date}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-500">
          <Map className="h-4 w-4 mr-1" />
          {trip.destinations.length} destinations
        </div>
        <ChevronRight
          className={`h-4 w-4 ${
            isSelected ? "text-indigo-600" : "text-gray-400"
          }`}
        />
      </div>
    </div>
  );
}
