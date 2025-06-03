import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const pollId = params.id
    const body = await request.json()

    // Validate required fields
    if (!body.name || !Array.isArray(body.availability)) {
      return NextResponse.json({ success: false, error: "Name and availability are required" }, { status: 400 })
    }

    const response = {
      id: Math.random().toString(36).substr(2, 9),
      pollId,
      name: body.name,
      timezone: body.timezone || "UTC",
      location: body.location,
      availability: body.availability,
      submittedAt: new Date().toISOString(),
    }

    // In production, save to database and trigger webhooks

    return NextResponse.json({
      success: true,
      response: {
        id: response.id,
        message: "Availability submitted successfully",
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request data" }, { status: 400 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const pollId = params.id

  // Mock responses data
  const responses = [
    {
      id: "resp1",
      name: "Alex Chen",
      timezone: "America/New_York",
      availability: [true, false, true, true, false],
      submittedAt: "2024-01-10T10:00:00Z",
    },
    {
      id: "resp2",
      name: "Maria Rodriguez",
      timezone: "America/Los_Angeles",
      availability: [true, true, false, true, true],
      submittedAt: "2024-01-10T11:30:00Z",
    },
  ]

  return NextResponse.json({
    success: true,
    responses,
    analytics: {
      totalResponses: responses.length,
      bestTimeSlots: [
        { slotIndex: 0, votes: 2 },
        { slotIndex: 3, votes: 2 },
        { slotIndex: 4, votes: 1 },
      ],
    },
  })
}
