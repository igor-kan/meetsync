"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarDays, Clock, Users, MapPin, Globe, Zap, Play, RotateCcw } from "lucide-react"
import Link from "next/link"

interface DemoStep {
  title: string
  description: string
  component: React.ReactNode
}

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  const steps: DemoStep[] = [
    {
      title: "Create Smart Polls",
      description: "Start by creating a poll with geolocation-aware time suggestions",
      component: (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-lg">Team Meeting - Q1 Planning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2" />
                San Francisco, CA
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Globe className="h-4 w-4 mr-2" />
                America/Los_Angeles
              </div>
              <Badge variant="secondary" className="w-fit">
                <Zap className="h-3 w-3 mr-1" />
                Smart Suggestions Enabled
              </Badge>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      title: "Automatic Time Zone Detection",
      description: "Participants see times in their local timezone automatically",
      component: (
        <div className="space-y-3">
          <div className="p-3 border rounded-lg bg-blue-50 border-blue-200">
            <div className="font-medium">Monday, Jan 15</div>
            <div className="text-sm text-gray-600">9:00 AM - 11:00 AM PST</div>
            <div className="text-xs text-blue-600">Your timezone: Pacific Time</div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-medium">Monday, Jan 15</div>
            <div className="text-sm text-gray-600">12:00 PM - 2:00 PM EST</div>
            <div className="text-xs text-gray-500">Converted for: Eastern Time</div>
          </div>
        </div>
      ),
    },
    {
      title: "Geolocation Intelligence",
      description: "Smart suggestions based on participants' locations and working hours",
      component: (
        <div className="space-y-3">
          <div className="p-3 border rounded-lg bg-green-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Tuesday, Jan 16 • 10:00 AM</div>
                <div className="text-sm text-green-600">Optimal for all timezones</div>
              </div>
              <Badge className="bg-green-600">Best</Badge>
            </div>
          </div>
          <div className="p-3 border rounded-lg bg-yellow-50 border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Wednesday, Jan 17 • 6:00 AM</div>
                <div className="text-sm text-yellow-600">Early for some participants</div>
              </div>
              <Badge variant="outline">Fair</Badge>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Real-time Collaboration",
      description: "See responses update in real-time as participants submit their availability",
      component: (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium">Team Responses</span>
            <Badge variant="secondary">4 of 6 responded</Badge>
          </div>
          {[
            { name: "Alex Chen", location: "New York", available: 3 },
            { name: "Maria Rodriguez", location: "San Francisco", available: 4 },
            { name: "David Kim", location: "Seoul", available: 2 },
            { name: "Emma Wilson", location: "London", available: 3 },
          ].map((participant, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="text-xs">
                    {participant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{participant.name}</div>
                  <div className="text-xs text-gray-500">{participant.location}</div>
                </div>
              </div>
              <div className="text-sm text-gray-600">{participant.available}/5 available</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "API Integration",
      description: "Integrate scheduling into your apps with our comprehensive API",
      component: (
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
          <div className="text-sm font-mono">
            <div className="text-green-400">// Create a new poll</div>
            <div className="text-blue-400">const</div> response = <div className="text-blue-400">await</div> fetch(
            <div className="text-yellow-300">'https://api.meetsync.dev/v1/polls'</div>, {"{"}
            <div className="ml-4">
              <div>
                method: <div className="text-yellow-300">'POST'</div>,
              </div>
              <div>
                headers: {"{"}...{"}"}
              </div>
              <div>body: JSON.stringify(pollData)</div>
            </div>
            {"}"});
            <br />
            <div className="text-green-400 mt-2">// Get poll analytics</div>
            <div className="text-blue-400">const</div> analytics = <div className="text-blue-400">await</div>{" "}
            response.json();
          </div>
        </div>
      ),
    },
  ]

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, steps.length])

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  const resetDemo = () => {
    setCurrentStep(0)
    setIsAutoPlaying(false)
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
            <Button variant="outline" asChild>
              <Link href="/create">Try It Yourself</Link>
            </Button>
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
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">See MeetSync in Action</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Discover how our smart scheduling platform revolutionizes meeting coordination
            </p>
          </div>

          {/* Demo Controls */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Button onClick={toggleAutoPlay} variant={isAutoPlaying ? "default" : "outline"}>
              <Play className="h-4 w-4 mr-2" />
              {isAutoPlaying ? "Playing..." : "Auto Play"}
            </Button>
            <Button onClick={resetDemo} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Demo
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentStep ? "bg-blue-600" : index < currentStep ? "bg-blue-300" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Demo Content */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - Description */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-4">
                  Step {currentStep + 1} of {steps.length}
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{steps[currentStep].title}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">{steps[currentStep].description}</p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Automatic timezone detection</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Geolocation-based suggestions</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Real-time collaboration</span>
                </div>
                <div className="flex items-center">
                  <Zap className="h-5 w-5 text-blue-600 mr-3" />
                  <span>Smart optimization algorithms</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button asChild>
                  <Link href="/create">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Create Your Poll
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/api-docs">View API Docs</Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Interactive Demo */}
            <div className="flex justify-center">
              <div className="w-full max-w-lg">
                <Card className="border-2 border-blue-200 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Demo: {steps[currentStep].title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{steps[currentStep].component}</CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Step Navigation */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </Button>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 p-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Scheduling?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of teams already using MeetSync for smarter, more efficient meeting coordination
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/create">Start Scheduling Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/api-docs">Explore the API</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
