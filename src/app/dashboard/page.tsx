"use client";

import { useState, useEffect } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { PlusCircle, Compass } from "lucide-react";
import TripCard from "@/components/dashboard/TripCard";
import NewTripForm from "@/components/dashboard/NewTripForm";
import TripDetails from "@/components/dashboard/TripDetails";

export default function Dashboard() {
  const { user } = useUser();
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showNewTripForm, setShowNewTripForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await fetch("/api/trips");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch trips");
      }
      const data = await response.json();
      setTrips(data);
    } catch (error) {
      console.error("Error fetching trips:", error);
      // Optionally set an error state here to show to the user
      setTrips([]); // Set empty array to prevent undefined errors
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrip = async (tripData: any) => {
    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tripData),
      });

      if (!response.ok) throw new Error("Failed to create trip");

      const newTrip = await response.json();
      setTrips([newTrip, ...trips]);
      setShowNewTripForm(false);
      setSelectedTrip(newTrip);
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-8">
          <UserButton afterSignOutUrl="/" />
          <div>
            <h2 className="font-medium text-gray-900">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-sm text-gray-500">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>

        {/* Your Trips Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Trips</h3>
            <button
              onClick={() => setShowNewTripForm(true)}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              New Trip
            </button>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="text-center py-4 text-gray-500">Loading...</div>
            ) : trips.length === 0 ? (
              <div className="text-center py-4 text-gray-500">No trips yet</div>
            ) : (
              trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  isSelected={selectedTrip?.id === trip.id}
                  onClick={() => {
                    setSelectedTrip(trip);
                    setShowNewTripForm(false);
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {showNewTripForm ? (
          <NewTripForm
            onClose={() => setShowNewTripForm(false)}
            onSubmit={handleCreateTrip}
          />
        ) : selectedTrip ? (
          <TripDetails trip={selectedTrip} />
        ) : (
          <div className="text-center max-w-md mx-auto mt-20">
            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Compass className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Start Planning Your Next Adventure
            </h2>
            <p className="text-gray-600 mb-6">
              Create a new trip or select an existing one to view and edit
              details.
            </p>
            <button
              onClick={() => setShowNewTripForm(true)}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Create New Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
