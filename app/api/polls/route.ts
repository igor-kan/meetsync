import { type NextRequest, NextResponse } from "next/server"

// Mock database
const polls = new Map()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Generate poll ID
    const pollId = Math.random().toString(36).substr(2, 9)

    // Create poll object
    const poll = {
      id: pollId,
      title: body.title,
      description: body.description || "",
      timeSlots: body.timeSlots || [],
      participants: [],
      settings: {
        requireName: true,
        enableGeolocation: true,
        timezone: body.settings?.timezone || "UTC",
        ...body.settings,
      },
      created: new Date().toISOString(),
      createdBy: body.createdBy || "Anonymous",
    }

    // Store poll
    polls.set(pollId, poll)

    return NextResponse.json({
      success: true,
      poll: {
        id: poll.id,
        title: poll.title,
        shareUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/poll/${pollId}`,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid request data" }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "MeetSync API v1",
    documentation: "/api-docs",
    endpoints: [
      "POST /api/polls - Create a new poll",
      "GET /api/polls/{id} - Get poll details",
      "POST /api/polls/{id}/responses - Submit availability",
    ],
  })
}
