"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Globe, Zap, Copy, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function ApiDocsPage() {
  const [copiedEndpoint, setCopiedEndpoint] = useState<string | null>(null)

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text)
    setCopiedEndpoint(endpoint)
    setTimeout(() => setCopiedEndpoint(null), 2000)
  }

  const endpoints = [
    {
      method: "POST",
      path: "/api/polls",
      description: "Create a new scheduling poll",
      example: `{
  "title": "Team Meeting",
  "description": "Weekly team sync",
  "timeSlots": [
    {
      "date": "2024-01-15",
      "startTime": "09:00",
      "endTime": "11:00"
    }
  ],
  "settings": {
    "requireName": true,
    "enableGeolocation": true,
    "timezone": "America/Los_Angeles"
  }
}`,
    },
    {
      method: "GET",
      path: "/api/polls/{id}",
      description: "Retrieve poll information and responses",
      example: `{
  "id": "abc123",
  "title": "Team Meeting",
  "timeSlots": [...],
  "participants": [...],
  "created": "2024-01-10T10:00:00Z"
}`,
    },
    {
      method: "POST",
      path: "/api/polls/{id}/responses",
      description: "Submit availability for a poll",
      example: `{
  "name": "John Doe",
  "timezone": "America/New_York",
  "availability": [true, false, true, true],
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}`,
    },
    {
      method: "GET",
      path: "/api/polls/{id}/analytics",
      description: "Get poll analytics and optimal time suggestions",
      example: `{
  "totalResponses": 15,
  "bestTimeSlots": [...],
  "timezoneDistribution": {...},
  "geolocationInsights": {...}
}`,
    },
  ]

  const webhookEvents = [
    { event: "poll.created", description: "Triggered when a new poll is created" },
    { event: "poll.response.added", description: "Triggered when someone submits their availability" },
    { event: "poll.response.updated", description: "Triggered when someone updates their availability" },
    { event: "poll.finalized", description: "Triggered when a poll is closed or finalized" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">MeetSync</span>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/">← Back to Home</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">MeetSync API Documentation</h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Integrate smart scheduling into your applications with our RESTful API
            </p>
          </div>

          {/* Quick Start */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Quick Start
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Base URL</h4>
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <code className="text-sm">https://api.meetsync.dev/v1</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard("https://api.meetsync.dev/v1", "base-url")}
                    >
                      {copiedEndpoint === "base-url" ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Authentication</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    Include your API key in the Authorization header:
                  </p>
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <code className="text-sm">Authorization: Bearer YOUR_API_KEY</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard("Authorization: Bearer YOUR_API_KEY", "auth")}
                    >
                      {copiedEndpoint === "auth" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <Tabs defaultValue="endpoints" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="endpoints" className="space-y-6">
              {endpoints.map((endpoint, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <Badge variant={endpoint.method === "GET" ? "secondary" : "default"} className="mr-3">
                          {endpoint.method}
                        </Badge>
                        <code className="text-lg">{endpoint.path}</code>
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(endpoint.path, `endpoint-${index}`)}
                      >
                        {copiedEndpoint === `endpoint-${index}` ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{endpoint.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Example {endpoint.method === "GET" ? "Response" : "Request"}
                      </h4>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                          <code>{endpoint.example}</code>
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Webhook Events</CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">
                    Configure webhooks to receive real-time notifications about poll events
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {webhookEvents.map((webhook, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                        <div className="font-semibold text-gray-900 dark:text-white">{webhook.event}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{webhook.description}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Webhook Configuration</h4>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                      <pre className="text-sm">
                        <code>{`POST /api/webhooks
{
  "url": "https://your-app.com/webhooks/meetsync",
  "events": ["poll.response.added", "poll.finalized"],
  "secret": "your-webhook-secret"
}`}</code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integration Examples</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-2">JavaScript/Node.js</h4>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{`const response = await fetch('https://api.meetsync.dev/v1/polls', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Team Meeting',
    timeSlots: [
      {
        date: '2024-01-15',
        startTime: '09:00',
        endTime: '11:00'
      }
    ]
  })
});

const poll = await response.json();
console.log('Poll created:', poll.id);`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Python</h4>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{`import requests

response = requests.post(
    'https://api.meetsync.dev/v1/polls',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'title': 'Team Meeting',
        'timeSlots': [
            {
                'date': '2024-01-15',
                'startTime': '09:00',
                'endTime': '11:00'
            }
        ]
    }
)

poll = response.json()
print(f"Poll created: {poll['id']}")`}</code>
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">cURL</h4>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">
                        <code>{`curl -X POST https://api.meetsync.dev/v1/polls \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Team Meeting",
    "timeSlots": [
      {
        "date": "2024-01-15",
        "startTime": "09:00",
        "endTime": "11:00"
      }
    ]
  }'`}</code>
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Rate Limits & Features */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Rate Limits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Free Tier</span>
                  <span className="font-semibold">1,000 requests/day</span>
                </div>
                <div className="flex justify-between">
                  <span>Pro Tier</span>
                  <span className="font-semibold">50,000 requests/day</span>
                </div>
                <div className="flex justify-between">
                  <span>Enterprise</span>
                  <span className="font-semibold">Unlimited</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                  <span>Geolocation-aware suggestions</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                  <span>Automatic timezone conversion</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                  <span>Real-time webhooks</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mr-2" />
                  <span>Analytics and insights</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Get API Key CTA */}
          <Card className="mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ready to Get Started?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Sign up for a free API key and start integrating MeetSync into your applications
              </p>
              <Button size="lg" asChild>
                <Link href="/signup">
                  <Code className="mr-2 h-5 w-5" />
                  Get Your API Key
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
