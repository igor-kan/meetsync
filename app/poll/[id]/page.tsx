"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Copy, Share2, Users, MapPin, Globe, CheckCircle2, Calendar, Zap } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

interface Participant {
  name: string
  timezone: string
  location?: string
  availability: boolean[]
}

interface TimeSlot {
  date: string
  startTime: string
  endTime: string
}

export default function PollPage() {
  const params = useParams()
  const pollId = params.id as string

  const [participantName, setParticipantName] = useState("")
  const [userTimezone, setUserTimezone] = useState("")
  const [selectedSlots, setSelectedSlots] = useState<boolean[]>([])
  const [participants, setParticipants] = useState<Participant[]>([])
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  // Mock poll data
  const pollData = {
    title: "Team Meeting - Q1 Planning",
    description:
      "Let's discuss Q1 goals and plan upcoming projects. We'll cover budget allocation, team assignments, and milestone planning.",
    createdBy: "Sarah Johnson",
    timeSlots: [
      { date: "2024-01-15", startTime: "09:00", endTime: "11:00" },
      { date: "2024-01-15", startTime: "14:00", endTime: "16:00" },
      { date: "2024-01-16", startTime: "10:00", endTime: "12:00" },
      { date: "2024-01-16", startTime: "15:00", endTime: "17:00" },
      { date: "2024-01-17", startTime: "09:00", endTime: "11:00" },
    ] as TimeSlot[],
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles",
  }

  useEffect(() => {
    setUserTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    setSelectedSlots(new Array(pollData.timeSlots.length).fill(false))

    // Mock existing participants
    setParticipants([
      {
        name: "Alex Chen",
        timezone: "America/New_York",
        location: "New York",
        availability: [true, false, true, true, false],
      },
      {
        name: "Maria Rodriguez",
        timezone: "America/Los_Angeles",
        location: "San Francisco",
        availability: [true, true, false, true, true],
      },
      {
        name: "David Kim",
        timezone: "Asia/Seoul",
        location: "Seoul",
        availability: [false, false, true, false, true],
      },
    ])
  }, [])

  const toggleSlot = (index: number) => {
    const newSelected = [...selectedSlots]
    newSelected[index] = !newSelected[index]
    setSelectedSlots(newSelected)
  }

  const submitAvailability = () => {
    if (participantName.trim()) {
      const newParticipant: Participant = {
        name: participantName,
        timezone: userTimezone,
        availability: selectedSlots,
      }
      setParticipants([...participants, newParticipant])
      setHasSubmitted(true)
    }
  }

  const copyPollLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const formatTimeForTimezone = (date: string, time: string, timezone: string) => {
    try {
      const dateTime = new Date(`${date}T${time}:00`)
      return dateTime.toLocaleTimeString("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    } catch {
      return time
    }
  }

  const getAvailabilityCount = (slotIndex: number) => {
    return participants.filter((p) => p.availability[slotIndex]).length
  }

  const getBestTimeSlots = () => {
    return pollData.timeSlots
      .map((slot, index) => ({
        ...slot,
        index,
        count: getAvailabilityCount(index),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">MeetSync</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={copyPollLink}>
              {copySuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Link
                </>
              )}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/create">Create New Poll</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Poll Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{pollData.title}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{pollData.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Created by {pollData.createdBy}
                  </span>
                  <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {pollData.location}
                  </span>
                  <span className="flex items-center">
                    <Globe className="h-4 w-4 mr-1" />
                    {pollData.timezone}
                  </span>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Users className="h-4 w-4 mr-2" />
                {participants.length} Responses
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Availability Grid */}
            <div className="lg:col-span-2 space-y-6">
              {!hasSubmitted ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2" />
                      Select Your Availability
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Input
                        placeholder="Enter your name"
                        value={participantName}
                        onChange={(e) => setParticipantName(e.target.value)}
                        className="mb-4"
                      />
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">Your timezone: {userTimezone}</div>
                    </div>

                    <div className="space-y-3">
                      {pollData.timeSlots.map((slot, index) => {
                        const localStartTime = formatTimeForTimezone(slot.date, slot.startTime, userTimezone)
                        const localEndTime = formatTimeForTimezone(slot.date, slot.endTime, userTimezone)
                        const availableCount = getAvailabilityCount(index)

                        return (
                          <div
                            key={index}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              selectedSlots[index]
                                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                            }`}
                            onClick={() => toggleSlot(index)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {new Date(slot.date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                  {localStartTime} - {localEndTime}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline">{availableCount} available</Badge>
                                {selectedSlots[index] && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <Button
                      onClick={submitAvailability}
                      disabled={!participantName.trim() || selectedSlots.every((slot) => !slot)}
                      className="w-full"
                    >
                      Submit Availability
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-green-200 bg-green-50 dark:bg-green-900/20">
                  <CardContent className="p-6 text-center">
                    <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Thank you for submitting your availability!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Your response has been recorded. You can share this poll with others or create a new one.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Participants Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Participant Responses ({participants.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {participants.map((participant, pIndex) => (
                      <div
                        key={pIndex}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {participant.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{participant.name}</div>
                            <div className="text-xs text-gray-500">
                              {participant.location && `${participant.location} • `}
                              {participant.timezone}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {participant.availability.filter(Boolean).length} / {participant.availability.length}{" "}
                            available
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Summary & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Best Time Slots
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {getBestTimeSlots().map((slot, index) => (
                    <div key={slot.index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">#{index + 1} Most Popular</span>
                        <Badge variant={index === 0 ? "default" : "secondary"}>{slot.count} votes</Badge>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {new Date(slot.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-sm text-gray-500">
                        {slot.startTime} - {slot.endTime}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Share This Poll</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button onClick={copyPollLink} variant="outline" className="w-full">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Poll Link
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share via Email
                  </Button>
                  <div className="text-xs text-gray-500 text-center">Poll ID: {pollId}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Integrate this poll data into your applications
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/api-docs">
                      <Globe className="h-4 w-4 mr-2" />
                      View API Documentation
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
