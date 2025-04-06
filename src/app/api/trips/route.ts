import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const trips = await prisma.trip.findMany({
      where: {
        userId: userId,
      },
      include: {
        destinations: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate required fields
    if (!body.title || !body.destinations?.length) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Calculate the overall trip start and end dates from destinations
    const allDates = body.destinations.flatMap((dest: any) => [
      new Date(dest.startDate),
      new Date(dest.endDate),
    ]);

    const startDate = new Date(Math.min(...allDates.map((d) => d.getTime())));
    const endDate = new Date(Math.max(...allDates.map((d) => d.getTime())));

    const trip = await prisma.trip.create({
      data: {
        userId,
        title: body.title,
        startDate,
        endDate,
        budget: body.budget || "MEDIUM",
        preferences: body.preferences || [],
        aiPlan: body.aiPlan || null,
        destinations: {
          create: body.destinations.map((dest: any, index: number) => ({
            name: dest.name,
            startDate: new Date(dest.startDate),
            endDate: new Date(dest.endDate),
            order: index,
          })),
        },
      },
      include: {
        destinations: true,
      },
    });

    return NextResponse.json(trip);
  } catch (error) {
    console.error("Trip creation error:", error);
    return new NextResponse(
      "Internal Error: " +
        (error instanceof Error ? error.message : "Unknown error"),
      { status: 500 }
    );
  }
}
