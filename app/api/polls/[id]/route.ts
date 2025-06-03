import { type NextRequest, NextResponse } from "next/server"

// Mock database (in production, use a real database)
const polls = new Map()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const pollId = params.id

  // Mock poll data for demo
  const mockPoll = {
    id: pollId,
    title: "Team Meeting - Q1 Planning",
    description: "Let's discuss Q1 goals and plan upcoming projects",
    timeSlots: [
      { date: "2024-01-15", startTime: "09:00", endTime: "11:00" },
      { date: "2024-01-15", startTime: "14:00", endTime: "16:00" },
      { date: "2024-01-16", startTime: "10:00", endTime: "12:00" },
      { date: "2024-01-16", startTime: "15:00", endTime: "17:00" },
      { date: "2024-01-17", startTime: "09:00", endTime: "11:00" },
    ],
    participants: [
      {
        name: "Alex Chen",
        timezone: "America/New_York",
        location: "New York",
        availability: [true, false, true, true, false],
        submittedAt: "2024-01-10T10:00:00Z",
      },
      {
        name: "Maria Rodriguez",
        timezone: "America/Los_Angeles",
        location: "San Francisco",
        availability: [true, true, false, true, true],
        submittedAt: "2024-01-10T11:30:00Z",
      },
    ],
    settings: {
      requireName: true,
      enableGeolocation: true,
      timezone: "America/Los_Angeles",
    },
    created: "2024-01-10T09:00:00Z",
    createdBy: "Sarah Johnson",
  }

  return NextResponse.json({
    success: true,
    poll: mockPoll,
  })
}
