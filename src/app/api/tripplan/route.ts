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
              "name": "Activity name",
              "startTime": "HH:MM",
              "duration": "X hours",
              "cost": "$XX",
              "description": "Brief description",
              "type": "attraction",
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
    }`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a JSON-generating assistant. Output only valid JSON without any markdown formatting, explanations, or code blocks.",
        },
        { role: "user", content: prompt },
      ],
      model: "llama-3.3-70b-versatile", // Switch to Mixtral for better JSON output
      temperature: 0.5, // Lower temperature for more consistent output
      max_tokens: 4096,
    });

    const rawPlan = completion.choices[0]?.message?.content;

    if (!rawPlan) {
      throw new Error("No plan generated");
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
      const parsedPlan = JSON.parse(cleanedPlan);

      // Validate required fields
      if (
        !parsedPlan.overview ||
        !parsedPlan.totalBudget ||
        !Array.isArray(parsedPlan.dailyItinerary) ||
        !parsedPlan.practicalInfo
      ) {
        throw new Error("Missing required fields in JSON");
      }

      // Return the valid JSON
      return NextResponse.json({ plan: JSON.stringify(parsedPlan) });
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Raw response:", rawPlan);
      console.error("Cleaned response:", cleanedPlan);

      // Create a fallback plan with minimal structure if possible
      return NextResponse.json({
        plan: JSON.stringify({
          overview:
            "We were unable to generate a detailed plan. Please try again.",
          totalBudget: "Unknown",
          dailyItinerary: tripData.destinations.map((dest, index) => ({
            date: new Date(dest.startDate).toISOString().split("T")[0],
            dayNumber: index + 1,
            location: dest.name,
            events: [],
          })),
          practicalInfo: {
            transportation: ["No information available"],
            documentation: ["No information available"],
            packingList: ["No information available"],
          },
        }),
      });
    }
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate trip plan" },
      { status: 500 }
    );
  }
}
