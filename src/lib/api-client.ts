export async function createTrip(tripData: {
  title: string;
  budget: "LOW" | "MEDIUM" | "HIGH";
  destinations: {
    name: string;
    startDate: string;
    endDate: string;
    order: number;
  }[];
  preferences: string[];
}) {
  const response = await fetch("/api/trips", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tripData),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Failed to create trip");
  }

  return response.json();
}
