export interface Destination {
  id: string; // Make id required instead of optional
  name: string;
  startDate: string;
  endDate: string;
  order: number;
}

// Add a separate interface for creating new destinations where ID is optional
export interface NewDestination {
  name: string;
  startDate: string;
  endDate: string;
  order: number;
  id?: string; // Optional for new destinations that haven't been saved yet
}

export interface Trip {
  id: string;
  title: string;
  budget: "LOW" | "MEDIUM" | "HIGH";
  startDate: string;
  endDate: string;
  status: string;
  destinations: Destination[];
  preferences: string[];
  aiPlan?: string;
}

// Interface for creating a new trip
export interface NewTripData {
  title: string;
  budget: "LOW" | "MEDIUM" | "HIGH";
  destinations: NewDestination[];
  preferences: string[];
  aiPlan?: string;
}
