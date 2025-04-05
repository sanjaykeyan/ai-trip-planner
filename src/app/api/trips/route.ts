import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
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
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!body.title || !body.startDate || !body.endDate || !body.destinations) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const trip = await prisma.trip.create({
      data: {
        userId,
        title: body.title,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
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
