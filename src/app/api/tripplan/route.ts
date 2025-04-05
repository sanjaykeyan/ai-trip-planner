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

    Please provide a detailed day-by-day itinerary, including recommended activities, places to visit, dining suggestions, and transportation tips.`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful travel planner assistant.",
        },
        { role: "user", content: prompt },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 4096,
    });

    const plan = completion.choices[0]?.message?.content;

    if (!plan) {
      throw new Error("No plan generated");
    }

    return NextResponse.json({ plan });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate trip plan" },
      { status: 500 }
    );
  }
}
