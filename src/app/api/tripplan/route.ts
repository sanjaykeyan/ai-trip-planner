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

    const prompt = `Create a detailed trip plan based on the following information:
    Trip Title: ${tripData.title}
    Budget Level: ${tripData.budget}
    Preferences: ${tripData.preferences.join(", ")}
    
    Destinations:
    ${tripData.destinations
      .map(
        (dest: any) =>
          `- ${dest.name} (${new Date(
            dest.startDate
          ).toLocaleDateString()} to ${new Date(
            dest.endDate
          ).toLocaleDateString()})`
      )
      .join("\n")}

    Return ONLY a JSON object in this exact format (no markdown, no backticks):
    {
      "overview": "Brief overview of the entire trip",
      "tips": ["tip1", "tip2", "tip3"],
      "dailyPlans": [
        {
          "date": "YYYY-MM-DD",
          "activities": {
            "morning": ["activity1", "activity2"],
            "afternoon": ["activity1", "activity2"],
            "evening": ["activity1", "activity2"]
          },
          "transportation": ["transport tip1", "transport tip2"],
          "accommodation": "Hotel/accommodation details",
          "diningRecommendations": {
            "breakfast": "Breakfast spot",
            "lunch": "Lunch spot",
            "dinner": "Dinner spot"
          }
        }
      ]
    }`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a travel planner. Always respond with valid JSON only, no additional text or formatting.",
        },
        { role: "user", content: prompt },
      ],
      model: "mixtral-8x7b-32768", // Using Mixtral instead of Llama
      temperature: 0.7,
      max_tokens: 4096,
    });

    const rawPlan = completion.choices[0]?.message?.content;

    if (!rawPlan) {
      throw new Error("No plan generated");
    }

    // Clean the response and validate JSON
    const cleanedPlan = rawPlan.trim().replace(/```json\n?|\n?```/g, "");

    try {
      const parsedPlan = JSON.parse(cleanedPlan);
      return NextResponse.json({ plan: cleanedPlan });
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      throw new Error("Invalid JSON response from AI");
    }
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate trip plan" },
      { status: 500 }
    );
  }
}
