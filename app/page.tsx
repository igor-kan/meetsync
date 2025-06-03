"use client"

import { useState } from "react"
import { Calendar, Clock, Globe, Users, Zap, Code, Shield, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Smart Geolocation",
      description:
        "Automatically suggests optimal meeting times based on participants' locations and local working hours",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Time Zone Intelligence",
      description: "Seamless time zone detection and conversion with daylight saving adjustments",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Calendar Integration",
      description: "Sync with Google Calendar, Outlook, and Apple Calendar to prevent double-booking",
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Public API",
      description: "Well-documented RESTful API with webhooks for seamless integration into your apps",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Collaborative Polling",
      description: "Visual availability grid showing overlapping free times across all participants",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Privacy-First",
      description: "Open-source, self-hostable, and designed with privacy as a core principle",
    },
  ]

  const competitors = [
    { name: "When2Meet", geo: false, timezone: false, api: false, calendar: false, mobile: false, openSource: false },
    { name: "Doodle", geo: false, timezone: true, api: false, calendar: true, mobile: true, openSource: false },
    { name: "Calendly", geo: false, timezone: true, api: true, calendar: true, mobile: true, openSource: false },
    { name: "MeetSync", geo: true, timezone: true, api: true, calendar: true, mobile: true, openSource: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">MeetSync</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/api-docs" className="text-gray-600 hover:text-blue-600 dark:text-gray-300">
              API
            </Link>
            <Link
              href="https://github.com/meetsync/app"
              className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
            >
              GitHub
            </Link>
            <Button asChild>
              <Link href="/create">Create Poll</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Smart Scheduling
            <span className="block text-blue-600">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            The open-source When2Meet alternative with geolocation intelligence, time zone awareness, and seamless API
            integration. Free forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-4">
              <Link href="/create">
                <Calendar className="mr-2 h-5 w-5" />
                Create Your First Poll
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
              <Link href="/demo">
                <Users className="mr-2 h-5 w-5" />
                View Demo
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-white/50 dark:bg-gray-800/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Features That Set Us Apart
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`transition-all duration-300 hover:shadow-lg cursor-pointer ${
                  hoveredFeature === index ? "scale-105 border-blue-500" : ""
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardHeader>
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">How We Compare</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-semibold text-gray-900 dark:text-white">Platform</th>
                  <th className="text-center p-4 font-semibold text-gray-900 dark:text-white">
                    <Globe className="h-5 w-5 mx-auto mb-1" />
                    Geolocation
                  </th>
                  <th className="text-center p-4 font-semibold text-gray-900 dark:text-white">
                    <Clock className="h-5 w-5 mx-auto mb-1" />
                    Timezone
                  </th>
                  <th className="text-center p-4 font-semibold text-gray-900 dark:text-white">
                    <Code className="h-5 w-5 mx-auto mb-1" />
                    API
                  </th>
                  <th className="text-center p-4 font-semibold text-gray-900 dark:text-white">
                    <Calendar className="h-5 w-5 mx-auto mb-1" />
                    Calendar
                  </th>
                  <th className="text-center p-4 font-semibold text-gray-900 dark:text-white">
                    <Smartphone className="h-5 w-5 mx-auto mb-1" />
                    Mobile
                  </th>
                  <th className="text-center p-4 font-semibold text-gray-900 dark:text-white">
                    <Shield className="h-5 w-5 mx-auto mb-1" />
                    Open Source
                  </th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((comp, index) => (
                  <tr
                    key={index}
                    className={`border-b ${comp.name === "MeetSync" ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                  >
                    <td className="p-4 font-medium text-gray-900 dark:text-white">
                      {comp.name === "MeetSync" && <Zap className="inline h-4 w-4 mr-2 text-blue-600" />}
                      {comp.name}
                    </td>
                    <td className="text-center p-4">
                      {comp.geo ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-red-500 font-bold">✗</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {comp.timezone ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-red-500 font-bold">✗</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {comp.api ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-red-500 font-bold">✗</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {comp.calendar ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-red-500 font-bold">✗</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {comp.mobile ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-red-500 font-bold">✗</span>
                      )}
                    </td>
                    <td className="text-center p-4">
                      {comp.openSource ? (
                        <span className="text-green-600 font-bold">✓</span>
                      ) : (
                        <span className="text-red-500 font-bold">✗</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Schedule Smarter?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of teams using MeetSync for effortless scheduling</p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
            <Link href="/create">Get Started - It's Free</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">MeetSync</span>
              </div>
              <p className="text-gray-400">
                Open-source scheduling platform with smart geolocation and time zone features.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/create" className="hover:text-white">
                    Create Poll
                  </Link>
                </li>
                <li>
                  <Link href="/demo" className="hover:text-white">
                    Demo
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Developers</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/api-docs" className="hover:text-white">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/meetsync/app" className="hover:text-white">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="/webhooks" className="hover:text-white">
                    Webhooks
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MeetSync. Open source and free forever.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
