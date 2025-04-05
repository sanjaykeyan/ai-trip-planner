export interface Event {
  name: string;
  startTime: string;
  duration: string;
  cost: string;
  description: string;
  type: string;
  bookingRequired: boolean;
  bookingUrl?: string;
}

export interface DayItinerary {
  date: string;
  dayNumber: number;
  location: string;
  events: Event[];
}

export interface TripPlan {
  overview: string;
  totalBudget: string;
  dailyItinerary: DayItinerary[];
  practicalInfo: {
    transportation: string[];
    documentation: string[];
    packingList: string[];
  };
}

export function formatTripPlan(rawPlan: string): TripPlan {
  try {
    const defaultPlan: TripPlan = {
      overview: "Plan generation failed",
      totalBudget: "N/A",
      dailyItinerary: [],
      practicalInfo: {
        transportation: [],
        documentation: [],
        packingList: [],
      },
    };

    const parsed = JSON.parse(rawPlan);

    return parsed;
  } catch (error) {
    console.error("Trip plan parsing error:", error);
    throw new Error("Invalid plan structure");
  }
}
