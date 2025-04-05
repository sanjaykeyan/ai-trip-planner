export interface TripDay {
  date: string;
  activities: {
    morning: string[];
    afternoon: string[];
    evening: string[];
  };
  transportation: string[];
  accommodation?: string;
  diningRecommendations: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
}

export interface FormattedTripPlan {
  overview: string;
  tips: string[];
  dailyPlans: TripDay[];
}

export function formatTripPlan(rawPlan: string): FormattedTripPlan {
  const defaultPlan: FormattedTripPlan = {
    overview: "Failed to format trip plan",
    tips: [],
    dailyPlans: [],
  };

  try {
    // Clean the input string if it contains markdown or backticks
    const cleanedPlan = rawPlan.trim().replace(/```json\n?|\n?```/g, "");
    const parsed = JSON.parse(cleanedPlan);

    // Validate the structure
    if (
      !parsed.overview ||
      !Array.isArray(parsed.tips) ||
      !Array.isArray(parsed.dailyPlans)
    ) {
      throw new Error("Invalid plan structure");
    }

    return parsed;
  } catch (error) {
    console.error("Trip plan parsing error:", error);
    return defaultPlan;
  }
}
