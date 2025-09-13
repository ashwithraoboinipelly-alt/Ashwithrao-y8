"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, AlertTriangle, CheckCircle, Target, TrendingUp, DollarSign, Calendar, Archive } from "lucide-react"
import { cn } from "@/lib/utils"

interface Alert {
  id: string
  type: "budget" | "goal" | "income" | "spending" | "system"
  title: string
  message: string
  severity: "low" | "medium" | "high"
  timestamp: Date
  isRead: boolean
  isArchived: boolean
  actionRequired: boolean
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "budget",
    title: "Food Budget Alert",
    message: "You've spent 90% of your food budget this month. Consider reducing dining out expenses.",
    severity: "high",
    timestamp: new Date("2024-01-15T10:30:00"),
    isRead: false,
    isArchived: false,
    actionRequired: true,
  },
  {
    id: "2",
    type: "goal",
    title: "Savings Goal Progress",
    message: "Great job! You're 68% towards your laptop savings goal. Keep up the momentum!",
    severity: "low",
    timestamp: new Date("2024-01-14T15:45:00"),
    isRead: false,
    isArchived: false,
    actionRequired: false,
  },
  {
    id: "3",
    type: "income",
    title: "Income Received",
    message: "Your part-time job payment of $320 has been automatically categorized and added to your account.",
    severity: "low",
    timestamp: new Date("2024-01-13T09:15:00"),
    isRead: true,
    isArchived: false,
    actionRequired: false,
  },
  {
    id: "4",
    type: "spending",
    title: "Unusual Spending Pattern",
    message: "Your entertainment spending is 40% higher than usual this week. Review your recent transactions.",
    severity: "medium",
    timestamp: new Date("2024-01-12T14:20:00"),
    isRead: true,
    isArchived: false,
    actionRequired: true,
  },
  {
    id: "5",
    type: "budget",
    title: "Transportation Budget",
    message: "You're under budget on transportation this month. Great job using public transit!",
    severity: "low",
    timestamp: new Date("2024-01-11T11:00:00"),
    isRead: true,
    isArchived: false,
    actionRequired: false,
  },
]

const alertSettings = {
  budgetAlerts: true,
  goalAlerts: true,
  incomeAlerts: true,
  spendingAlerts: true,
  systemAlerts: true,
  emailNotifications: false,
  pushNotifications: true,
  alertThreshold: 80,
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [settings, setSettings] = useState(alertSettings)
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  const unreadCount = alerts.filter((alert) => !alert.isRead && !alert.isArchived).length
  const actionRequiredCount = alerts.filter((alert) => alert.actionRequired && !alert.isArchived).length

  const filteredAlerts = alerts.filter((alert) => {
    if (alert.isArchived) return false
    if (selectedFilter === "all") return true
    if (selectedFilter === "unread") return !alert.isRead
    if (selectedFilter === "action") return alert.actionRequired
    return alert.type === selectedFilter
  })

  const handleMarkAsRead = (alertId: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, isRead: true } : alert)))
  }

  const handleArchive = (alertId: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, isArchived: true } : alert)))
  }

  const handleMarkAllAsRead = () => {
    setAlerts(alerts.map((alert) => ({ ...alert, isRead: true })))
  }

  const getAlertIcon = (type: string, severity: string) => {
    switch (type) {
      case "budget":
        return (
          <AlertTriangle
            className={cn(
              "h-4 w-4",
              severity === "high" ? "text-destructive" : severity === "medium" ? "text-yellow-600" : "text-primary",
            )}
          />
        )
      case "goal":
        return <Target className="h-4 w-4 text-accent" />
      case "income":
        return <TrendingUp className="h-4 w-4 text-primary" />
      case "spending":
        return <DollarSign className="h-4 w-4 text-orange-500" />
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Medium
          </Badge>
        )
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">Info</Badge>
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <aside className="hidden w-64 md:block">
        <SidebarNav />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="space-y-6">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-balance">Alerts & Notifications</h1>
                <p className="text-muted-foreground">Stay informed about your financial activity and budget status</p>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <Button variant="outline" onClick={handleMarkAllAsRead}>
                    Mark All as Read
                  </Button>
                )}
              </div>
            </div>

            {/* Alert Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread Alerts</CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{unreadCount}</div>
                  <p className="text-xs text-muted-foreground">New notifications</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Action Required</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{actionRequiredCount}</div>
                  <p className="text-xs text-muted-foreground">Need attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{alerts.filter((a) => !a.isArchived).length}</div>
                  <p className="text-xs text-muted-foreground">Active alerts</p>
                </CardContent>
              </Card>
            </div>

            {/* Alerts Content */}
            <Tabs defaultValue="alerts" className="space-y-4">
              <TabsList>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="alerts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Recent Alerts</CardTitle>
                        <CardDescription>Your latest financial notifications and updates</CardDescription>
                      </div>
                      <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Alerts</SelectItem>
                          <SelectItem value="unread">Unread</SelectItem>
                          <SelectItem value="action">Action Required</SelectItem>
                          <SelectItem value="budget">Budget</SelectItem>
                          <SelectItem value="goal">Goals</SelectItem>
                          <SelectItem value="spending">Spending</SelectItem>
                          <SelectItem value="income">Income</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredAlerts.map((alert) => (
                        <div
                          key={alert.id}
                          className={cn(
                            "flex items-start gap-4 p-4 rounded-lg border transition-colors",
                            !alert.isRead ? "bg-accent/50 border-accent/50" : "bg-card hover:bg-accent/20",
                          )}
                        >
                          <div className="mt-0.5">{getAlertIcon(alert.type, alert.severity)}</div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{alert.title}</h4>
                              {!alert.isRead && <div className="w-2 h-2 bg-primary rounded-full" />}
                              {alert.actionRequired && (
                                <Badge variant="outline" className="text-xs">
                                  Action Required
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{alert.message}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>
                                {alert.timestamp.toLocaleDateString()} at {alert.timestamp.toLocaleTimeString()}
                              </span>
                              {getSeverityBadge(alert.severity)}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {!alert.isRead && (
                              <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(alert.id)}>
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm" onClick={() => handleArchive(alert.id)}>
                              <Archive className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredAlerts.length === 0 && (
                      <div className="text-center py-8">
                        <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-sm font-semibold">No alerts found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {selectedFilter === "all"
                            ? "You're all caught up! No new alerts at the moment."
                            : "No alerts match your current filter criteria."}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Alert Preferences</CardTitle>
                    <CardDescription>Customize when and how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Alert Types</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Budget Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                              Get notified when you approach or exceed budget limits
                            </p>
                          </div>
                          <Switch
                            checked={settings.budgetAlerts}
                            onCheckedChange={(checked) => setSettings({ ...settings, budgetAlerts: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Goal Progress Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                              Updates on your savings goals and milestones
                            </p>
                          </div>
                          <Switch
                            checked={settings.goalAlerts}
                            onCheckedChange={(checked) => setSettings({ ...settings, goalAlerts: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Income Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Alerts when new income is detected and categorized
                            </p>
                          </div>
                          <Switch
                            checked={settings.incomeAlerts}
                            onCheckedChange={(checked) => setSettings({ ...settings, incomeAlerts: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Spending Pattern Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                              Notifications about unusual spending patterns
                            </p>
                          </div>
                          <Switch
                            checked={settings.spendingAlerts}
                            onCheckedChange={(checked) => setSettings({ ...settings, spendingAlerts: checked })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Delivery Methods</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive alerts directly in the app</p>
                          </div>
                          <Switch
                            checked={settings.pushNotifications}
                            onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Get important alerts via email</p>
                          </div>
                          <Switch
                            checked={settings.emailNotifications}
                            onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Alert Sensitivity</h4>
                      <div className="space-y-2">
                        <Label>Budget Alert Threshold</Label>
                        <Select
                          value={settings.alertThreshold.toString()}
                          onValueChange={(value) =>
                            setSettings({ ...settings, alertThreshold: Number.parseInt(value) })
                          }
                        >
                          <SelectTrigger className="w-[200px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="50">50% of budget</SelectItem>
                            <SelectItem value="60">60% of budget</SelectItem>
                            <SelectItem value="70">70% of budget</SelectItem>
                            <SelectItem value="80">80% of budget</SelectItem>
                            <SelectItem value="90">90% of budget</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                          Get alerted when you reach this percentage of your budget
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
