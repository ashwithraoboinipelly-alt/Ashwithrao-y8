"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { User, Bell, Shield, Accessibility, Globe, Palette, Monitor, Sun, Moon } from "lucide-react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState({
    // Profile settings
    name: "Student User",
    email: "student@university.edu",
    currency: "INR",
    language: "en",

    // Accessibility settings
    highContrast: false,
    reducedMotion: false,
    largeText: false,
    screenReader: false,
    keyboardNavigation: true,

    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    budgetAlerts: true,
    goalReminders: true,

    // Privacy settings
    dataSharing: false,
    analytics: true,
    marketingEmails: false,
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
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
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-balance">Settings</h1>
              <p className="text-muted-foreground">Manage your account preferences and accessibility options</p>
            </div>

            {/* Settings Content */}
            <Tabs defaultValue="profile" className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="profile" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="gap-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Appearance</span>
                </TabsTrigger>
                <TabsTrigger value="accessibility" className="gap-2">
                  <Accessibility className="h-4 w-4" />
                  <span className="hidden sm:inline">Accessibility</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="gap-2">
                  <Bell className="h-4 w-4" />
                  <span className="hidden sm:inline">Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="privacy" className="gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="hidden sm:inline">Privacy</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={settings.name}
                        onChange={(e) => handleSettingChange("name", e.target.value)}
                        aria-describedby="name-description"
                      />
                      <p id="name-description" className="text-sm text-muted-foreground">
                        This is the name that will be displayed in your account
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleSettingChange("email", e.target.value)}
                        aria-describedby="email-description"
                      />
                      <p id="email-description" className="text-sm text-muted-foreground">
                        Used for account recovery and important notifications
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={settings.currency}
                        onValueChange={(value) => handleSettingChange("currency", value)}
                      >
                        <SelectTrigger id="currency" aria-describedby="currency-description">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                        </SelectContent>
                      </Select>
                      <p id="currency-description" className="text-sm text-muted-foreground">
                        All amounts will be displayed in this currency
                      </p>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={settings.language}
                        onValueChange={(value) => handleSettingChange("language", value)}
                      >
                        <SelectTrigger id="language" aria-describedby="language-description">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="hi">हिन्दी</SelectItem>
                        </SelectContent>
                      </Select>
                      <p id="language-description" className="text-sm text-muted-foreground">
                        Choose your preferred language for the interface
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Theme & Appearance</CardTitle>
                    <CardDescription>Customize how the app looks and feels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <Label>Theme Preference</Label>
                      <div className="grid grid-cols-3 gap-3">
                        <Button
                          variant={theme === "light" ? "default" : "outline"}
                          className="justify-start gap-2"
                          onClick={() => setTheme("light")}
                          aria-pressed={theme === "light"}
                        >
                          <Sun className="h-4 w-4" />
                          Light
                        </Button>
                        <Button
                          variant={theme === "dark" ? "default" : "outline"}
                          className="justify-start gap-2"
                          onClick={() => setTheme("dark")}
                          aria-pressed={theme === "dark"}
                        >
                          <Moon className="h-4 w-4" />
                          Dark
                        </Button>
                        <Button
                          variant={theme === "system" ? "default" : "outline"}
                          className="justify-start gap-2"
                          onClick={() => setTheme("system")}
                          aria-pressed={theme === "system"}
                        >
                          <Monitor className="h-4 w-4" />
                          System
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Choose your preferred color scheme. System will match your device settings.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="accessibility" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Accessibility Options</CardTitle>
                    <CardDescription>Configure settings to improve your experience</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="high-contrast">High Contrast Mode</Label>
                          <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                        </div>
                        <Switch
                          id="high-contrast"
                          checked={settings.highContrast}
                          onCheckedChange={(checked) => handleSettingChange("highContrast", checked)}
                          aria-describedby="high-contrast-description"
                        />
                      </div>
                      <p id="high-contrast-description" className="sr-only">
                        Toggle high contrast mode for improved visibility
                      </p>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="reduced-motion">Reduce Motion</Label>
                          <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                        </div>
                        <Switch
                          id="reduced-motion"
                          checked={settings.reducedMotion}
                          onCheckedChange={(checked) => handleSettingChange("reducedMotion", checked)}
                          aria-describedby="reduced-motion-description"
                        />
                      </div>
                      <p id="reduced-motion-description" className="sr-only">
                        Toggle reduced motion for users sensitive to animations
                      </p>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="large-text">Large Text</Label>
                          <p className="text-sm text-muted-foreground">Increase text size throughout the app</p>
                        </div>
                        <Switch
                          id="large-text"
                          checked={settings.largeText}
                          onCheckedChange={(checked) => handleSettingChange("largeText", checked)}
                          aria-describedby="large-text-description"
                        />
                      </div>
                      <p id="large-text-description" className="sr-only">
                        Toggle large text mode for improved readability
                      </p>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="screen-reader">Screen Reader Optimizations</Label>
                          <p className="text-sm text-muted-foreground">Enhanced support for screen readers</p>
                        </div>
                        <Switch
                          id="screen-reader"
                          checked={settings.screenReader}
                          onCheckedChange={(checked) => handleSettingChange("screenReader", checked)}
                          aria-describedby="screen-reader-description"
                        />
                      </div>
                      <p id="screen-reader-description" className="sr-only">
                        Toggle screen reader optimizations for better accessibility
                      </p>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="keyboard-nav">Enhanced Keyboard Navigation</Label>
                          <p className="text-sm text-muted-foreground">
                            Improved keyboard shortcuts and focus indicators
                          </p>
                        </div>
                        <Switch
                          id="keyboard-nav"
                          checked={settings.keyboardNavigation}
                          onCheckedChange={(checked) => handleSettingChange("keyboardNavigation", checked)}
                          aria-describedby="keyboard-nav-description"
                        />
                      </div>
                      <p id="keyboard-nav-description" className="sr-only">
                        Toggle enhanced keyboard navigation features
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                      <h4 className="font-semibold text-accent mb-2">Keyboard Shortcuts</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + D</kbd> - Go to Dashboard
                        </p>
                        <p>
                          <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + E</kbd> - View Expenses
                        </p>
                        <p>
                          <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + G</kbd> - Manage Goals
                        </p>
                        <p>
                          <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + R</kbd> - View Reports
                        </p>
                        <p>
                          <kbd className="px-2 py-1 bg-muted rounded text-xs">Alt + S</kbd> - Open Settings
                        </p>
                        <p>
                          <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd> - Close dialogs
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Control how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Get real-time alerts in the app</p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={settings.pushNotifications}
                          onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="budget-alerts">Budget Alerts</Label>
                          <p className="text-sm text-muted-foreground">Notifications when approaching budget limits</p>
                        </div>
                        <Switch
                          id="budget-alerts"
                          checked={settings.budgetAlerts}
                          onCheckedChange={(checked) => handleSettingChange("budgetAlerts", checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="goal-reminders">Goal Reminders</Label>
                          <p className="text-sm text-muted-foreground">Updates on your savings goals progress</p>
                        </div>
                        <Switch
                          id="goal-reminders"
                          checked={settings.goalReminders}
                          onCheckedChange={(checked) => handleSettingChange("goalReminders", checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Data</CardTitle>
                    <CardDescription>Manage your data and privacy preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="data-sharing">Data Sharing</Label>
                          <p className="text-sm text-muted-foreground">Share anonymized data to improve the service</p>
                        </div>
                        <Switch
                          id="data-sharing"
                          checked={settings.dataSharing}
                          onCheckedChange={(checked) => handleSettingChange("dataSharing", checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="analytics">Usage Analytics</Label>
                          <p className="text-sm text-muted-foreground">Help us improve by sharing usage statistics</p>
                        </div>
                        <Switch
                          id="analytics"
                          checked={settings.analytics}
                          onCheckedChange={(checked) => handleSettingChange("analytics", checked)}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="marketing-emails">Marketing Emails</Label>
                          <p className="text-sm text-muted-foreground">Receive tips and updates about new features</p>
                        </div>
                        <Switch
                          id="marketing-emails"
                          checked={settings.marketingEmails}
                          onCheckedChange={(checked) => handleSettingChange("marketingEmails", checked)}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Data Management</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <Globe className="mr-2 h-4 w-4" />
                          Export My Data
                        </Button>
                        <Button variant="outline" className="w-full justify-start bg-transparent">
                          <Shield className="mr-2 h-4 w-4" />
                          Privacy Policy
                        </Button>
                        <Button variant="destructive" className="w-full justify-start">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button size="lg">Save Changes</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
