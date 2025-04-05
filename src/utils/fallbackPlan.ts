export function createFallbackPlan(destinations: any[]) {
  return {
    overview: "We were unable to generate a detailed plan. Please try again.",
    totalBudget: "Estimated cost unavailable",
    dailyItinerary: destinations.map((dest, index) => ({
      date: new Date(dest.startDate).toISOString().split("T")[0],
      dayNumber: index + 1,
      location: dest.name,
      events: [
        {
          name: "Free time to explore",
          startTime: "09:00",
          duration: "All day",
          cost: "Varies",
          description:
            "Spend the day exploring the destination at your own pace.",
          type: "self-guided",
          bookingRequired: false,
          bookingUrl: "",
        },
      ],
    })),
    practicalInfo: {
      transportation: [
        "Research local transportation options for getting around.",
      ],
      documentation: [
        "Check if you need a visa or other documentation for your destination.",
      ],
      packingList: [
        "Pack appropriate clothing for the weather at your destination.",
      ],
    },
  };
}
