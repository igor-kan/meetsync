"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, Globe, MapPin, Users, Zap, ChevronDown, Settings, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

interface TimeSlot {
  date: string
  startTime: string
  endTime: string
}

interface LocationProfile {
  id: string
  name: string
  type: "physical" | "vpn"
  location: string
  timezone: string
  isDefault: boolean
}

export default function CreatePollPage() {
  const [pollTitle, setPollTitle] = useState("")
  const [pollDescription, setPollDescription] = useState("")
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [newDate, setNewDate] = useState("")
  const [newStartTime, setNewStartTime] = useState("")
  const [newEndTime, setNewEndTime] = useState("")
  const [location, setLocation] = useState<{ latitude: number; longitude: number; city: string } | null>(null)
  const [timezone, setTimezone] = useState("")
  const [isCreating, setIsCreating] = useState(false)

  // New state for location profiles
  const [locationProfiles, setLocationProfiles] = useState<LocationProfile[]>([
    {
      id: "loc1",
      name: "San Francisco Office",
      type: "physical",
      location: "San Francisco, CA",
      timezone: "America/Los_Angeles",
      isDefault: true,
    },
    {
      id: "loc2",
      name: "New York VPN",
      type: "vpn",
      location: "New York, NY",
      timezone: "America/New_York",
      isDefault: false,
    },
    {
      id: "loc3",
      name: "London Office",
      type: "physical",
      location: "London, UK",
      timezone: "Europe/London",
      isDefault: false,
    },
  ])
  const [selectedProfile, setSelectedProfile] = useState<LocationProfile | null>(null)

  useEffect(() => {
    // Set default location profile
    const defaultProfile = locationProfiles.find((profile) => profile.isDefault) || locationProfiles[0]
    setSelectedProfile(defaultProfile)
    setTimezone(defaultProfile.timezone)
    setLocation({
      latitude: 0,
      longitude: 0,
      city: defaultProfile.location,
    })

    // Request geolocation only if no profiles exist
    if (locationProfiles.length === 0 && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords

          // Mock geocoding - in real app, use a service like OpenCage or Google
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
            )
            const data = await response.json()
            setLocation({
              latitude,
              longitude,
              city: data.city || "Unknown City",
            })
          } catch (error) {
            setLocation({
              latitude,
              longitude,
              city: "Unknown City",
            })
          }
        },
        (error) => {
          console.log("Geolocation error:", error)
        },
      )
    }
  }, [locationProfiles])

  const addTimeSlot = () => {
    if (newDate && newStartTime && newEndTime) {
      const slot: TimeSlot = {
        date: newDate,
        startTime: newStartTime,
        endTime: newEndTime,
      }
      setTimeSlots([...timeSlots, slot])
      setNewDate("")
      setNewStartTime("")
      setNewEndTime("")
    }
  }

  const removeTimeSlot = (index: number) => {
    setTimeSlots(timeSlots.filter((_, i) => i !== index))
  }

  const createPoll = async () => {
    setIsCreating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock successful creation - redirect to poll page
    const pollId = Math.random().toString(36).substr(2, 9)
    window.location.href = `/poll/${pollId}`
  }

  const generateSmartSuggestions = () => {
    // Mock smart time suggestions based on location and timezone
    const now = new Date()
    const suggestions: TimeSlot[] = []

    for (let i = 1; i <= 5; i++) {
      const date = new Date(now)
      date.setDate(date.getDate() + i)

      // Suggest working hours based on timezone
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      const startHour = isWeekend ? 10 : 9
      const endHour = isWeekend ? 18 : 17

      suggestions.push({
        date: date.toISOString().split("T")[0],
        startTime: `${startHour.toString().padStart(2, "0")}:00`,
        endTime: `${endHour.toString().padStart(2, "0")}:00`,
      })
    }

    setTimeSlots(suggestions)
  }

  const selectLocationProfile = (profile: LocationProfile) => {
    setSelectedProfile(profile)
    setTimezone(profile.timezone)
    setLocation({
      latitude: 0,
      longitude: 0,
      city: profile.location,
    })
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Sarah Johnson
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/settings/team">
                    <Settings className="h-4 w-4 mr-2" />
                    Team Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" asChild>
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Create Your Scheduling Poll</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Set up a smart poll with geolocation-aware time suggestions
            </p>
          </div>

          {/* Location Profile Selector */}
          <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {selectedProfile?.type === "physical" ? (
                    <MapPin className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Globe className="h-5 w-5 text-purple-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Using: {selectedProfile?.name || "Default Location"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedProfile?.location} • {timezone}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Change Location
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {locationProfiles.map((profile) => (
                      <DropdownMenuItem
                        key={profile.id}
                        onClick={() => selectLocationProfile(profile)}
                        className="flex items-center"
                      >
                        {profile.type === "physical" ? (
                          <MapPin className="h-4 w-4 mr-2" />
                        ) : (
                          <Globe className="h-4 w-4 mr-2" />
                        )}
                        {profile.name}
                        {profile.isDefault && (
                          <Badge variant="secondary" className="ml-2 text-xs">
                            Default
                          </Badge>
                        )}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem asChild>
                      <Link href="/settings/team" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage Locations
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Poll Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Poll Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Poll Title *</Label>
                    <Input
                      id="title"
                      placeholder="Team Meeting - Q1 Planning"
                      value={pollTitle}
                      onChange={(e) => setPollTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Let's discuss Q1 goals and plan upcoming projects..."
                      value={pollDescription}
                      onChange={(e) => setPollDescription(e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <CalendarDays className="h-5 w-5 mr-2" />
                      Time Slots
                    </span>
                    <Button variant="outline" size="sm" onClick={generateSmartSuggestions} className="text-sm">
                      <Zap className="h-4 w-4 mr-1" />
                      Smart Suggestions
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add Time Slot Form */}
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Label htmlFor="date" className="text-xs">
                        Date
                      </Label>
                      <Input id="date" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="start" className="text-xs">
                        Start
                      </Label>
                      <Input
                        id="start"
                        type="time"
                        value={newStartTime}
                        onChange={(e) => setNewStartTime(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end" className="text-xs">
                        End
                      </Label>
                      <Input id="end" type="time" value={newEndTime} onChange={(e) => setNewEndTime(e.target.value)} />
                    </div>
                  </div>
                  <Button onClick={addTimeSlot} className="w-full" variant="outline">
                    Add Time Slot
                  </Button>

                  {/* Time Slots List */}
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {timeSlots.map((slot, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium">{new Date(slot.date).toLocaleDateString()}</span>
                          <span className="text-sm text-gray-600">
                            {slot.startTime} - {slot.endTime}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTimeSlot(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>

                  {timeSlots.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <CalendarDays className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No time slots added yet</p>
                      <p className="text-sm">Add some time options for participants to choose from</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Preview & Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Poll Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">{pollTitle || "Your Poll Title"}</h3>
                    {pollDescription && <p className="text-gray-600 dark:text-gray-300 mb-4">{pollDescription}</p>}
                    <div className="text-sm text-gray-500">
                      {timeSlots.length} time slot{timeSlots.length !== 1 ? "s" : ""} available
                    </div>
                    {selectedProfile && (
                      <div className="mt-4 text-sm flex items-center justify-center">
                        {selectedProfile.type === "physical" ? (
                          <MapPin className="h-4 w-4 mr-1 text-blue-600" />
                        ) : (
                          <Globe className="h-4 w-4 mr-1 text-purple-600" />
                        )}
                        <span>{selectedProfile.name}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Advanced Features</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Geolocation Optimization</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Timezone Detection</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Smart Suggestions</span>
                    <Badge variant="secondary">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Access</span>
                    <Badge variant="secondary">Included</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Team Collaboration</span>
                    <Badge variant="secondary">Enabled</Badge>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={createPoll}
                disabled={!pollTitle || timeSlots.length === 0 || isCreating}
                className="w-full h-12 text-lg"
              >
                {isCreating ? "Creating Poll..." : "Create Poll & Get Shareable Link"}
              </Button>

              {pollTitle && timeSlots.length > 0 && (
                <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                  Your poll will be ready to share instantly
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
