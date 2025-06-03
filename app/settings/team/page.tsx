"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Users, UserPlus, Globe, MapPin, Shield, Zap, Trash2, CheckCircle2, AlertCircle, Lock, Key } from "lucide-react"
import Link from "next/link"

interface TeamMember {
  id: string
  name: string
  email: string
  role: "admin" | "member" | "viewer"
  status: "active" | "pending"
  lastActive: string
}

interface LocationProfile {
  id: string
  name: string
  type: "physical" | "vpn"
  location: string
  timezone: string
  isDefault: boolean
}

export default function TeamSettingsPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "admin",
      status: "active",
      lastActive: "2024-01-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Alex Chen",
      email: "alex@example.com",
      role: "member",
      status: "active",
      lastActive: "2024-01-14T16:45:00Z",
    },
    {
      id: "3",
      name: "Maria Rodriguez",
      email: "maria@example.com",
      role: "member",
      status: "active",
      lastActive: "2024-01-15T09:15:00Z",
    },
    {
      id: "4",
      name: "David Kim",
      email: "david@example.com",
      role: "viewer",
      status: "pending",
      lastActive: "",
    },
  ])

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
    {
      id: "loc4",
      name: "Tokyo VPN",
      type: "vpn",
      location: "Tokyo, Japan",
      timezone: "Asia/Tokyo",
      isDefault: false,
    },
  ])

  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newMemberRole, setNewMemberRole] = useState<"member" | "viewer">("member")
  const [newLocationName, setNewLocationName] = useState("")
  const [newLocationType, setNewLocationType] = useState<"physical" | "vpn">("physical")
  const [newLocationCity, setNewLocationCity] = useState("")
  const [newLocationTimezone, setNewLocationTimezone] = useState("")

  const inviteMember = () => {
    if (newMemberEmail) {
      const newMember: TeamMember = {
        id: `member-${Date.now()}`,
        name: newMemberEmail.split("@")[0],
        email: newMemberEmail,
        role: newMemberRole,
        status: "pending",
        lastActive: "",
      }
      setTeamMembers([...teamMembers, newMember])
      setNewMemberEmail("")
    }
  }

  const addLocation = () => {
    if (newLocationName && newLocationCity && newLocationTimezone) {
      const newLocation: LocationProfile = {
        id: `loc-${Date.now()}`,
        name: newLocationName,
        type: newLocationType,
        location: newLocationCity,
        timezone: newLocationTimezone,
        isDefault: false,
      }
      setLocationProfiles([...locationProfiles, newLocation])
      setNewLocationName("")
      setNewLocationCity("")
      setNewLocationTimezone("")
    }
  }

  const removeMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  const removeLocation = (id: string) => {
    setLocationProfiles(locationProfiles.filter((location) => location.id !== id))
  }

  const setDefaultLocation = (id: string) => {
    setLocationProfiles(
      locationProfiles.map((location) => ({
        ...location,
        isDefault: location.id === id,
      })),
    )
  }

  const changeRole = (id: string, role: "admin" | "member" | "viewer") => {
    setTeamMembers(teamMembers.map((member) => (member.id === id ? { ...member, role } : member)))
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
              <Link href="/create">Create Poll</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">← Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Team & Location Settings</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage team members and location profiles for shared account access
            </p>
          </div>

          <Tabs defaultValue="team" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="team">
                <Users className="h-4 w-4 mr-2" />
                Team Members
              </TabsTrigger>
              <TabsTrigger value="locations">
                <Globe className="h-4 w-4 mr-2" />
                Location Profiles
              </TabsTrigger>
            </TabsList>

            {/* Team Members Tab */}
            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Team Members ({teamMembers.length})
                  </CardTitle>
                  <CardDescription>
                    Manage who has access to your MeetSync account and what permissions they have
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Team Members List */}
                  <div className="space-y-4">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex flex-col items-end">
                            <Select
                              defaultValue={member.role}
                              onValueChange={(value) => changeRole(member.id, value as "admin" | "member" | "viewer")}
                              disabled={
                                member.role === "admin" && teamMembers.filter((m) => m.role === "admin").length === 1
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="member">Member</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="text-xs mt-1">
                              {member.status === "active" ? (
                                <span className="text-green-600 flex items-center">
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  Active
                                </span>
                              ) : (
                                <span className="text-yellow-600 flex items-center">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Pending
                                </span>
                              )}
                            </div>
                          </div>
                          {(member.role !== "admin" || teamMembers.filter((m) => m.role === "admin").length > 1) && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeMember(member.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Invite New Member */}
                  <Card className="border-dashed">
                    <CardHeader>
                      <CardTitle className="text-lg">Invite New Team Member</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            placeholder="colleague@example.com"
                            value={newMemberEmail}
                            onChange={(e) => setNewMemberEmail(e.target.value)}
                          />
                        </div>
                        <div className="w-full md:w-40">
                          <Label htmlFor="role">Role</Label>
                          <Select
                            value={newMemberRole}
                            onValueChange={(value) => setNewMemberRole(value as "member" | "viewer")}
                          >
                            <SelectTrigger id="role">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="member">Member</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-full md:w-auto self-end">
                          <Button onClick={inviteMember} disabled={!newMemberEmail}>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Invite
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Role Permissions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Role Permissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium flex items-center">
                              <Shield className="h-4 w-4 mr-2 text-red-600" />
                              Admin
                            </div>
                            <Badge>Full Access</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Can manage team members, billing, and all settings. Has full access to all features.
                          </p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium flex items-center">
                              <Shield className="h-4 w-4 mr-2 text-blue-600" />
                              Member
                            </div>
                            <Badge variant="outline">Standard Access</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Can create and manage polls, use all location profiles, and view analytics.
                          </p>
                        </div>
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium flex items-center">
                              <Shield className="h-4 w-4 mr-2 text-gray-600" />
                              Viewer
                            </div>
                            <Badge variant="outline">Limited Access</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Can view and respond to polls but cannot create new ones or modify settings.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Location Profiles Tab */}
            <TabsContent value="locations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Location Profiles ({locationProfiles.length})
                  </CardTitle>
                  <CardDescription>
                    Create and manage location profiles for different offices, VPN locations, or remote work settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Location Profiles List */}
                  <div className="space-y-4">
                    {locationProfiles.map((location) => (
                      <div
                        key={location.id}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          location.isDefault
                            ? "bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
                            : "bg-gray-50 dark:bg-gray-800"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {location.type === "physical" ? (
                            <MapPin className="h-5 w-5 text-blue-600" />
                          ) : (
                            <Globe className="h-5 w-5 text-purple-600" />
                          )}
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white flex items-center">
                              {location.name}
                              {location.isDefault && (
                                <Badge variant="secondary" className="ml-2">
                                  Default
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {location.location} • {location.timezone}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!location.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDefaultLocation(location.id)}
                              className="text-xs"
                            >
                              Set Default
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeLocation(location.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            disabled={location.isDefault}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Location */}
                  <Card className="border-dashed">
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Location Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="locationName">Profile Name</Label>
                            <Input
                              id="locationName"
                              placeholder="e.g., London Office"
                              value={newLocationName}
                              onChange={(e) => setNewLocationName(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="locationType">Location Type</Label>
                            <Select
                              value={newLocationType}
                              onValueChange={(value) => setNewLocationType(value as "physical" | "vpn")}
                            >
                              <SelectTrigger id="locationType">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="physical">Physical Location</SelectItem>
                                <SelectItem value="vpn">VPN Location</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="locationCity">City/Location</Label>
                            <Input
                              id="locationCity"
                              placeholder="e.g., London, UK"
                              value={newLocationCity}
                              onChange={(e) => setNewLocationCity(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="locationTimezone">Timezone</Label>
                            <Select value={newLocationTimezone} onValueChange={setNewLocationTimezone}>
                              <SelectTrigger id="locationTimezone">
                                <SelectValue placeholder="Select timezone" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                                <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                                <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                                <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                                <SelectItem value="Europe/London">London (GMT/BST)</SelectItem>
                                <SelectItem value="Europe/Paris">Central European (CET/CEST)</SelectItem>
                                <SelectItem value="Asia/Tokyo">Japan (JST)</SelectItem>
                                <SelectItem value="Australia/Sydney">Sydney (AEST/AEDT)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button
                          onClick={addLocation}
                          disabled={!newLocationName || !newLocationCity || !newLocationTimezone}
                          className="w-full md:w-auto"
                        >
                          Add Location Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Location Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Auto-detect location</Label>
                          <div className="text-sm text-gray-500">
                            Automatically detect user's location when creating polls
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Use VPN location when available</Label>
                          <div className="text-sm text-gray-500">
                            Prioritize VPN location over physical location when detected
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Location privacy</Label>
                          <div className="text-sm text-gray-500">
                            Only show city and country, not precise coordinates
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Security Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lock className="h-5 w-5 mr-2" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Require location verification</Label>
                      <div className="text-sm text-gray-500">
                        Team members must verify their location when switching profiles
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">Location history</Label>
                      <div className="text-sm text-gray-500">
                        Keep a log of location profile changes for security purposes
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base font-medium">API access control</Label>
                      <div className="text-sm text-gray-500">Restrict API access based on location profiles</div>
                    </div>
                    <Switch />
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="w-full md:w-auto">
                      <Key className="h-4 w-4 mr-2" />
                      Manage API Keys
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
