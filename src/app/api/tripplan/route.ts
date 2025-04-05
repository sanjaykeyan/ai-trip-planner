import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "GROQ API key not configured" },
      { status: 500 }
    );
  }

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const tripData = await request.json();

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
    
    IMPORTANT: Every day in the dailyItinerary MUST include breakfast, lunch, and dinner as separate events with type "meal". The meals should be at realistic times and include local cuisine options when possible.`;

    // Try up to 2 attempts to generate a valid plan
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
              "You are a JSON-generating assistant. Output only valid JSON without any markdown formatting, explanations, or code blocks. Every day in the itinerary must include breakfast, lunch, and dinner events with appropriate times.",
          },
          { role: "user", content: prompt },
        ],
        model: "llama-3.3-70b-versatile",
        temperature: attempts > 1 ? 0.7 : 0.5, // Increase temperature on retry
        max_tokens: 4096,
      });

      const rawPlan = completion.choices[0]?.message?.content;

      if (!rawPlan) {
        console.error("No content returned from LLM");
        continue;
      }

      // More aggressive cleaning of the response
      let cleanedPlan = rawPlan
        .trim()
        .replace(/```json\s*|```\s*|`/g, "") // Remove markdown code blocks and backticks
        .replace(/(\r\n|\n|\r)/gm, " ") // Replace newlines with spaces
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .trim();

      // Extract JSON if there's surrounding text
      const jsonMatch = cleanedPlan.match(/({.*})/);
      if (jsonMatch && jsonMatch[1]) {
        cleanedPlan = jsonMatch[1];
      }

      try {
        // Attempt to parse the JSON
        const tempParsedPlan = JSON.parse(cleanedPlan);

        // Validate required fields
        if (
          !tempParsedPlan.overview ||
          !tempParsedPlan.totalBudget ||
          !Array.isArray(tempParsedPlan.dailyItinerary) ||
          !tempParsedPlan.practicalInfo
        ) {
          console.error("Missing required fields in JSON");
          continue;
        }

        // Check if every day has breakfast, lunch, and dinner
        let hasMissingMeals = false;
        for (const day of tempParsedPlan.dailyItinerary) {
          const meals = day.events.filter(event => 
            event.type === "meal" || 
            event.name.toLowerCase().includes("breakfast") ||
            event.name.toLowerCase().includes("lunch") ||
            event.name.toLowerCase().includes("dinner")
          );
          
          const hasBreakfast = meals.some(meal => meal.name.toLowerCase().includes("breakfast"));
          const hasLunch = meals.some(meal => meal.name.toLowerCase().includes("lunch"));
          const hasDinner = meals.some(meal => meal.name.toLowerCase().includes("dinner"));
          
          if (!hasBreakfast || !hasLunch || !hasDinner) {
            console.log(`Day ${day.dayNumber} missing meals: ${!hasBreakfast ? 'breakfast ' : ''}${!hasLunch ? 'lunch ' : ''}${!hasDinner ? 'dinner' : ''}`);
            hasMissingMeals = true;
            break;
          }
        }
        
        if (hasMissingMeals && attempts < maxAttempts) {
          console.log("Some days missing meals, retrying...");
          continue;
        }

        // All validations passed
        parsedPlan = tempParsedPlan;
        break;
      } catch (parseError) {
        console.error(`Attempt ${attempts} JSON Parse Error:`, parseError);
        console.error("Raw response:", rawPlan);
        console.error("Cleaned response:", cleanedPlan);
      }
    }

    if (parsedPlan) {
      return NextResponse.json({ plan: JSON.stringify(parsedPlan) });
    }

    // If we get here, all attempts failed - generate improved fallback plan
    console.log("All attempts failed, generating fallback plan with meals");
    
    const generateDailyEvents = (date, dayNumber, location) => {
      const events = [
        {
          name: `Breakfast at Local Café in ${location}`,
          startTime: "08:00",
          duration: "1 hour",
          cost: "$15",
          description: `Start your day with a delicious breakfast at a local café in ${location}.`,
          type: "meal",
          bookingRequired: false,
          bookingUrl: ""
        },
        {
          name: `Explore ${location}`,
          startTime: "10:00",
          duration: "3 hours",
          cost: "$20",
          description: `Explore the main attractions of ${location}.`,
          type: "attraction",
          bookingRequired: false,
          bookingUrl: ""
        },
        {
          name: `Lunch at Local Restaurant in ${location}`,
          startTime: "13:00",
          duration: "1 hour",
          cost: "$25",
          description: `Enjoy local cuisine for lunch at a popular restaurant in ${location}.`,
          type: "meal",
          bookingRequired: false,
          bookingUrl: ""
        },
        {
          name: `Afternoon Activities in ${location}`,
          startTime: "15:00",
          duration: "3 hours",
          cost: "$30",
          description: `Spend the afternoon experiencing local culture and activities in ${location}.`,
          type: "attraction",
          bookingRequired: false,
          bookingUrl: ""
        },
        {
          name: `Dinner at Recommended Restaurant in ${location}`,
          startTime: "19:00",
          duration: "1.5 hours",
          cost: "$40",
          description: `End your day with a delicious dinner at a highly rated restaurant in ${location}.`,
          type: "meal",
          bookingRequired: false,
          bookingUrl: ""
        }
      ];
      
      return {
        date: date,
        dayNumber: dayNumber,
        location: location,
        events: events
      };
    };

    const fallbackPlan = {
      overview: `A ${tripData.destinations.length}-day trip to ${tripData.destinations.map(d => d.name).join(", ")} with a budget of ${tripData.budget}. This fallback plan includes main meals and activities each day.`,
      totalBudget: tripData.budget || "Budget not specified",
      dailyItinerary: tripData.destinations.flatMap((dest) => {
        const start = new Date(dest.startDate);
        const end = new Date(dest.endDate);
        const days = [];
        
        for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
          days.push(generateDailyEvents(
            day.toISOString().split("T")[0],
            days.length + 1,
            dest.name
          ));
        }
        
        return days;
      }),
      practicalInfo: {
        transportation: ["Use public transportation where available", "Consider renting a car for remote locations"],
        documentation: ["Passport", "Travel insurance", "Hotel reservations"],
        packingList: ["Comfortable walking shoes", "Weather-appropriate clothing", "Medications", "Travel adapters"]
      }
    };

    return NextResponse.json({ plan: JSON.stringify(fallbackPlan) });

  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate trip plan" },
      { status: 500 }
    );
  }
}
