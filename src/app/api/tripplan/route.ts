import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

interface Event {
  cost: string;
}

interface Day {
  events: Event[];
}

type Itinerary = Day[];

interface Destination {
  name: string;
  startDate: string;
  endDate: string;
}

type BudgetCategory = "LOW" | "MEDIUM" | "HIGH";

interface BudgetVariant {
  name: string;
  description: string;
  prompt: string;
}

interface TripData {
  title: string;
  budget: BudgetCategory;
  preferences: string[];
  destinations: Destination[];
}

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "GROQ API key not configured" },
      { status: 500 }
    );
  }

  try {
    const calculateTotalBudget = (itinerary: Itinerary) => {
      let total = 0;
      itinerary.forEach((day) => {
        day.events.forEach((event) => {
          const cost = parseFloat(event.cost.replace(/[^0-9.]/g, "")) || 0;
          total += cost;
        });
      });
      return total;
    };

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const tripData: TripData = await request.json();

    const prompt = `You are a travel planner creating an itinerary. Return ONLY valid JSON with no additional text, comments, or backticks.

    Trip Details:
    - Title: ${tripData.title}
    - Budget: ${tripData.budget}
    - Preferences: ${tripData.preferences.join(", ")}
    - Destinations: ${tripData.destinations
      .map(
        (dest) =>
          `${dest.name} (${new Date(
            dest.startDate
          ).toLocaleDateString()} to ${new Date(
            dest.endDate
          ).toLocaleDateString()})`
      )
      .join(", ")}

    The JSON must follow this exact structure:
    {
      "overview": "Brief overview of the trip",
      "totalBudget": "Estimated cost in USD",
      "weather": {
        "temperature": 25,
        "condition": "Sunny",
        "icon": "https://openweathermap.org/img/wn/01d@2x.png",
        "humidity": 65,
        "windSpeed": 10
      },
      "dailyItinerary": [
        {
          "date": "YYYY-MM-DD",
          "dayNumber": 1,
          "location": "City, Country",
          "events": [
            {
              "name": "Breakfast at [location]",
              "startTime": "08:00",
              "duration": "1 hour",
              "cost": "$XX",
              "description": "Brief description of breakfast",
              "type": "meal",
              "bookingRequired": false,
              "bookingUrl": ""
            },
            {
              "name": "Morning activity",
              "startTime": "10:00",
              "duration": "X hours",
              "cost": "$XX",
              "description": "Brief description",
              "type": "attraction",
              "bookingRequired": false,
              "bookingUrl": ""
            },
            {
              "name": "Lunch at [location]",
              "startTime": "13:00",
              "duration": "1 hour",
              "cost": "$XX",
              "description": "Brief description of lunch",
              "type": "meal",
              "bookingRequired": false,
              "bookingUrl": ""
            },
            {
              "name": "Afternoon activity",
              "startTime": "15:00",
              "duration": "X hours",
              "cost": "$XX",
              "description": "Brief description",
              "type": "attraction",
              "bookingRequired": false,
              "bookingUrl": ""
            },
            {
              "name": "Dinner at [location]",
              "startTime": "19:00",
              "duration": "1.5 hours",
              "cost": "$XX",
              "description": "Brief description of dinner",
              "type": "meal",
              "bookingRequired": false,
              "bookingUrl": ""
            }
          ]
        }
      ],
      "practicalInfo": {
        "transportation": ["Transport tip 1"],
        "documentation": ["Document 1"],
        "packingList": ["Item 1"]
      }
    }
    
    IMPORTANT WEATHER INFORMATION:
    - Include realistic weather information for ${
      tripData.destinations[0]?.name
    } on arrival date (${new Date(
      tripData.destinations[0]?.startDate
    ).toLocaleDateString()})
    - Weather temperature should be in Celsius and realistic for the destination and season
    - Weather condition should be one of: Sunny, Partly Cloudy, Cloudy, Light Rain, Thunderstorm, Snowy, Windy, Clear
    - Use appropriate weather icon URLs from OpenWeatherMap (https://openweathermap.org/img/wn/[code]@2x.png) where codes are:
      - 01d: Sunny/Clear
      - 02d: Partly Cloudy
      - 03d: Cloudy
      - 10d: Light Rain
      - 11d: Thunderstorm
      - 13d: Snowy
      - 50d: Windy/Foggy
    - Include realistic humidity percentage (0-100) and wind speed in km/h
    
    IMPORTANT: Every day in the dailyItinerary MUST include breakfast, lunch, and dinner as separate events with type "meal". The meals should be at realistic times and include local cuisine options when possible.`;

    const generatePlanVariants = async (tripData: TripData) => {
      const variants = [];
      let variantId = 1;

      const budgetCategories: Record<BudgetCategory, BudgetVariant[]> = {
        LOW: [
          {
            name: "Local Experience",
            description: "Focus on public transport and local eateries",
            prompt:
              "Optimize for lowest costs with authentic local experiences, public transportation, and budget accommodations.",
          },
          {
            name: "Smart Saver",
            description: "Balance of free attractions and paid activities",
            prompt:
              "Mix free attractions with select paid experiences, focus on value-for-money options.",
          },
          {
            name: "Group Adventure",
            description: "Group tours and shared experiences",
            prompt:
              "Include group tours, hostel stays, and shared transportation options for budget-conscious travelers.",
          },
        ],
        MEDIUM: [
          {
            name: "Balanced Explorer",
            description: "Mix of comfort and experiences",
            prompt:
              "Balance comfortable accommodations with varied activities, including some premium experiences.",
          },
          {
            name: "Cultural Immersion",
            description: "Focus on local culture and cuisine",
            prompt:
              "Emphasize cultural experiences and mid-range dining, with comfortable but not luxury accommodations.",
          },
          {
            name: "Active Discovery",
            description: "Adventure activities and sightseeing",
            prompt:
              "Include outdoor activities and guided tours with comfortable accommodations.",
          },
        ],
        HIGH: [
          {
            name: "Luxury Escape",
            description: "Premium accommodations and experiences",
            prompt:
              "Focus on luxury hotels, private tours, and fine dining experiences.",
          },
          {
            name: "VIP Treatment",
            description: "Exclusive access and private guides",
            prompt:
              "Include exclusive experiences, private guides, and premium transportation.",
          },
          {
            name: "Gourmet Journey",
            description: "High-end dining and wine experiences",
            prompt:
              "Emphasize fine dining, wine tasting, and culinary experiences with luxury accommodations.",
          },
        ],
      };

      const selectedCategory = tripData.budget;
      const categoryVariants = budgetCategories[selectedCategory];

      for (const variant of categoryVariants) {
        const customPrompt = `${prompt}\n${variant.prompt}`;
        const plan = await generateSinglePlan(customPrompt);

        variants.push({
          id: variantId++,
          name: variant.name,
          category: selectedCategory,
          description: variant.description,
          plan: plan,
        });
      }

      return variants;
    };

    const generateSinglePlan = async (customPrompt: string) => {
      let parsedPlan = null;
      let attempts = 0;
      const maxAttempts = 2;

      while (!parsedPlan && attempts < maxAttempts) {
        attempts++;
        console.log(`Attempt ${attempts} to generate trip plan`);

        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content:
                "You are a JSON-generating assistant. Output only valid JSON without any markdown formatting, explanations, or code blocks. Every day in the itinerary must include breakfast, lunch, and dinner events with appropriate times. ALWAYS include a weather object with temperature, condition, icon, humidity, and windSpeed values.",
            },
            { role: "user", content: customPrompt },
          ],
          model: "llama-3.3-70b-versatile",
          temperature: attempts > 1 ? 0.7 : 0.5,
          max_tokens: 4096,
        });

        const rawPlan = completion.choices[0]?.message?.content;

        if (!rawPlan) {
          console.error("No content returned from LLM");
          continue;
        }

        let cleanedPlan = rawPlan
          .trim()
          .replace(/```json\s*|```\s*|`/g, "")
          .replace(/(\r\n|\n|\r)/gm, " ")
          .replace(/\s+/g, " ")
          .trim();

        const jsonMatch = cleanedPlan.match(/({.*})/);
        if (jsonMatch && jsonMatch[1]) {
          cleanedPlan = jsonMatch[1];
        }

        try {
          const tempParsedPlan = JSON.parse(cleanedPlan);

          if (
            !tempParsedPlan.overview ||
            !tempParsedPlan.totalBudget ||
            !Array.isArray(tempParsedPlan.dailyItinerary) ||
            !tempParsedPlan.practicalInfo ||
            !tempParsedPlan.weather
          ) {
            console.error("Missing required fields in JSON");
            continue;
          }

          let hasMissingMeals = false;
          for (const day of tempParsedPlan.dailyItinerary) {
            const meals = day.events.filter(
              (event: { type: string; name: string }) =>
                event.type === "meal" ||
                event.name.toLowerCase().includes("breakfast") ||
                event.name.toLowerCase().includes("lunch") ||
                event.name.toLowerCase().includes("dinner")
            );

            const hasBreakfast = meals.some((meal: { name: string }) =>
              meal.name.toLowerCase().includes("breakfast")
            );
            const hasLunch = meals.some((meal: { name: string }) =>
              meal.name.toLowerCase().includes("lunch")
            );
            const hasDinner = meals.some((meal: { name: string }) =>
              meal.name.toLowerCase().includes("dinner")
            );

            if (!hasBreakfast || !hasLunch || !hasDinner) {
              console.log(
                `Day ${day.dayNumber} missing meals: ${
                  !hasBreakfast ? "breakfast " : ""
                }${!hasLunch ? "lunch " : ""}${!hasDinner ? "dinner" : ""}`
              );
              hasMissingMeals = true;
              break;
            }
          }

          if (hasMissingMeals && attempts < maxAttempts) {
            console.log("Some days missing meals, retrying...");
            continue;
          }

          parsedPlan = tempParsedPlan;

          const aiPlanTotalCost = calculateTotalBudget(
            parsedPlan.dailyItinerary
          );
          parsedPlan.totalBudget = `$${aiPlanTotalCost}`;

          break;
        } catch (parseError) {
          console.error(`Attempt ${attempts} JSON Parse Error:`, parseError);
          console.error("Raw response:", rawPlan);
          console.error("Cleaned response:", cleanedPlan);
        }
      }

      if (parsedPlan) {
        return parsedPlan;
      }

      console.log("All attempts failed, generating fallback plan with meals");

      const generateDailyEvents = (
        date: string,
        dayNumber: number,
        location: string
      ) => {
        const events = [
          {
            name: `Breakfast at Local Café in ${location}`,
            startTime: "08:00",
            duration: "1 hour",
            cost: "$15",
            description: `Start your day with a delicious breakfast at a local café in ${location}.`,
            type: "meal",
            bookingRequired: false,
            bookingUrl: "",
          },
          {
            name: `Explore ${location}`,
            startTime: "10:00",
            duration: "3 hours",
            cost: "$20",
            description: `Explore the main attractions of ${location}.`,
            type: "attraction",
            bookingRequired: false,
            bookingUrl: "",
          },
          {
            name: `Lunch at Local Restaurant in ${location}`,
            startTime: "13:00",
            duration: "1 hour",
            cost: "$25",
            description: `Enjoy local cuisine for lunch at a popular restaurant in ${location}.`,
            type: "meal",
            bookingRequired: false,
            bookingUrl: "",
          },
          {
            name: `Afternoon Activities in ${location}`,
            startTime: "15:00",
            duration: "3 hours",
            cost: "$30",
            description: `Spend the afternoon experiencing local culture and activities in ${location}.`,
            type: "attraction",
            bookingRequired: false,
            bookingUrl: "",
          },
          {
            name: `Dinner at Recommended Restaurant in ${location}`,
            startTime: "19:00",
            duration: "1.5 hours",
            cost: "$40",
            description: `End your day with a delicious dinner at a highly rated restaurant in ${location}.`,
            type: "meal",
            bookingRequired: false,
            bookingUrl: "",
          },
        ];

        return {
          date: date,
          dayNumber: dayNumber,
          location: location,
          events: events,
        };
      };

      const fallbackPlan = {
        overview: `A ${
          tripData.destinations.length
        }-day trip to ${tripData.destinations
          .map((d) => d.name)
          .join(", ")} with a budget of ${tripData.budget}.`,
        totalBudget: "",
        dailyItinerary: tripData.destinations.flatMap((dest) => {
          const start = new Date(dest.startDate);
          const end = new Date(dest.endDate);
          const days = [];

          for (
            let day = new Date(start);
            day <= end;
            day.setDate(day.getDate() + 1)
          ) {
            days.push(
              generateDailyEvents(
                day.toISOString().split("T")[0],
                days.length + 1,
                dest.name
              )
            );
          }

          return days;
        }),
        practicalInfo: {
          transportation: [
            "Use public transportation where available",
            "Consider renting a car for remote locations",
          ],
          documentation: ["Passport", "Travel insurance", "Hotel reservations"],
          packingList: [
            "Comfortable walking shoes",
            "Weather-appropriate clothing",
            "Medications",
            "Travel adapters",
          ],
        },
        weather: {
          temperature: 22,
          condition: "Partly Cloudy",
          icon: "https://openweathermap.org/img/wn/02d@2x.png",
          humidity: 65,
          windSpeed: 12,
        },
      };

      const totalCost = calculateTotalBudget(fallbackPlan.dailyItinerary);
      fallbackPlan.totalBudget = `$${totalCost}`;

      return fallbackPlan;
    };

    const planVariants = await generatePlanVariants(tripData);

    return NextResponse.json({
      plans: {
        variants: planVariants,
      },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate trip plan" },
      { status: 500 }
    );
  }
}
