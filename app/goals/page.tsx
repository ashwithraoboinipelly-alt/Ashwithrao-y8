"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, differenceInDays } from "date-fns"
import {
  CalendarIcon,
  Plus,
  Target,
  Laptop,
  GraduationCap,
  Car,
  Home,
  Plane,
  Trophy,
  Clock,
  DollarSign,
} from "lucide-react"
import { cn } from "@/lib/utils"

const goalIcons = {
  laptop: Laptop,
  education: GraduationCap,
  car: Car,
  housing: Home,
  travel: Plane,
  emergency: Target,
  other: Trophy,
}

const goalTypes = [
  { value: "short", label: "Short-term (< 6 months)", color: "bg-green-500" },
  { value: "medium", label: "Medium-term (6-24 months)", color: "bg-yellow-500" },
  { value: "long", label: "Long-term (> 24 months)", color: "bg-blue-500" },
]

const mockGoals = [
  {
    id: 1,
    title: "New Laptop for Studies",
    description: "Save for a MacBook Pro for programming and design work",
    targetAmount: 2500,
    currentAmount: 1700,
    category: "laptop",
    type: "short",
    targetDate: new Date("2024-06-01"),
    createdAt: new Date("2024-01-01"),
    isActive: true,
  },
  {
    id: 2,
    title: "Emergency Fund",
    description: "Build an emergency fund covering 3 months of expenses",
    targetAmount: 3000,
    currentAmount: 800,
    category: "emergency",
    type: "medium",
    targetDate: new Date("2024-12-31"),
    createdAt: new Date("2024-01-01"),
    isActive: true,
  },
  {
    id: 3,
    title: "Summer Study Abroad",
    description: "Save for a semester abroad program in Europe",
    targetAmount: 8000,
    currentAmount: 2400,
    category: "travel",
    type: "long",
    targetDate: new Date("2025-06-01"),
    createdAt: new Date("2024-01-01"),
    isActive: true,
  },
  {
    id: 4,
    title: "Graduation Celebration",
    description: "Fund for graduation party and celebration",
    targetAmount: 1000,
    currentAmount: 1000,
    category: "other",
    type: "short",
    targetDate: new Date("2024-05-15"),
    createdAt: new Date("2023-12-01"),
    isActive: false,
  },
]

export default function GoalsPage() {
  const [goals, setGoals] = useState(mockGoals)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<number | null>(null)
  const [contributionAmount, setContributionAmount] = useState("")
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetAmount: "",
    category: "",
    type: "",
    targetDate: new Date(),
  })

  const activeGoals = goals.filter((goal) => goal.isActive)
  const completedGoals = goals.filter((goal) => !goal.isActive)
  const totalSaved = activeGoals.reduce((sum, goal) => sum + goal.currentAmount, 0)
  const totalTarget = activeGoals.reduce((sum, goal) => sum + goal.targetAmount, 0)

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.targetAmount && newGoal.category && newGoal.type) {
      const goal = {
        id: goals.length + 1,
        title: newGoal.title,
        description: newGoal.description,
        targetAmount: Number.parseFloat(newGoal.targetAmount),
        currentAmount: 0,
        category: newGoal.category,
        type: newGoal.type,
        targetDate: newGoal.targetDate,
        createdAt: new Date(),
        isActive: true,
      }
      setGoals([...goals, goal])
      setNewGoal({
        title: "",
        description: "",
        targetAmount: "",
        category: "",
        type: "",
        targetDate: new Date(),
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleContribution = (goalId: number) => {
    if (contributionAmount) {
      setGoals(
        goals.map((goal) =>
          goal.id === goalId
            ? {
                ...goal,
                currentAmount: Math.min(goal.currentAmount + Number.parseFloat(contributionAmount), goal.targetAmount),
                isActive: goal.currentAmount + Number.parseFloat(contributionAmount) < goal.targetAmount,
              }
            : goal,
        ),
      )
      setContributionAmount("")
      setSelectedGoal(null)
    }
  }

  const getGoalTypeInfo = (type: string) => {
    return goalTypes.find((t) => t.value === type) || goalTypes[0]
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

  const getDaysRemaining = (targetDate: Date) => {
    return differenceInDays(targetDate, new Date())
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
                <h1 className="text-3xl font-bold tracking-tight text-balance">Financial Goals</h1>
                <p className="text-muted-foreground">
                  Set and track your short-term and long-term financial objectives
                </p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Goal</DialogTitle>
                    <DialogDescription>Set a new financial goal to help you save systematically.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Goal Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., New Laptop"
                        value={newGoal.title}
                        onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your goal..."
                        value={newGoal.description}
                        onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="targetAmount">Target Amount</Label>
                      <Input
                        id="targetAmount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newGoal.targetAmount}
                        onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newGoal.category}
                        onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="laptop">💻 Technology</SelectItem>
                          <SelectItem value="education">🎓 Education</SelectItem>
                          <SelectItem value="car">🚗 Transportation</SelectItem>
                          <SelectItem value="housing">🏠 Housing</SelectItem>
                          <SelectItem value="travel">✈️ Travel</SelectItem>
                          <SelectItem value="emergency">🛡️ Emergency Fund</SelectItem>
                          <SelectItem value="other">🏆 Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Goal Type</Label>
                      <Select value={newGoal.type} onValueChange={(value) => setNewGoal({ ...newGoal, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select timeframe" />
                        </SelectTrigger>
                        <SelectContent>
                          {goalTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Target Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !newGoal.targetDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newGoal.targetDate ? format(newGoal.targetDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newGoal.targetDate}
                            onSelect={(date) => date && setNewGoal({ ...newGoal, targetDate: date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddGoal}>
                      Create Goal
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{activeGoals.length}</div>
                  <p className="text-xs text-muted-foreground">{completedGoals.length} completed goals</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalSaved.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">${totalTarget.toFixed(2)} total target</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">
                    {totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0}%
                  </div>
                  <Progress value={totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Active Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Active Goals</CardTitle>
                <CardDescription>Your current financial objectives and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeGoals.map((goal) => {
                    const IconComponent = goalIcons[goal.category as keyof typeof goalIcons] || Target
                    const typeInfo = getGoalTypeInfo(goal.type)
                    const progress = getProgressPercentage(goal.currentAmount, goal.targetAmount)
                    const daysRemaining = getDaysRemaining(goal.targetDate)

                    return (
                      <div key={goal.id} className="p-4 rounded-lg border bg-card">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{goal.title}</h3>
                              <p className="text-sm text-muted-foreground">{goal.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={cn("text-xs", typeInfo.color, "text-white")}>
                              {typeInfo.label.split(" ")[0]}
                            </Badge>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setSelectedGoal(goal.id)}>
                                  Add Funds
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Add Contribution</DialogTitle>
                                  <DialogDescription>Add money to your "{goal.title}" goal.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="contribution">Amount</Label>
                                    <Input
                                      id="contribution"
                                      type="number"
                                      step="0.01"
                                      placeholder="0.00"
                                      value={contributionAmount}
                                      onChange={(e) => setContributionAmount(e.target.value)}
                                    />
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Current: ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button onClick={() => handleContribution(goal.id)}>Add Contribution</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>${goal.currentAmount.toFixed(2)} saved</span>
                            <span>${goal.targetAmount.toFixed(2)} target</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{progress.toFixed(1)}% complete</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {daysRemaining > 0 ? `${daysRemaining} days left` : "Overdue"}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {activeGoals.length === 0 && (
                  <div className="text-center py-8">
                    <Target className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-semibold">No active goals</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Create your first financial goal to start saving systematically.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Completed Goals */}
            {completedGoals.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Completed Goals</CardTitle>
                  <CardDescription>Goals you've successfully achieved</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {completedGoals.map((goal) => {
                      const IconComponent = goalIcons[goal.category as keyof typeof goalIcons] || Target

                      return (
                        <div
                          key={goal.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20"
                        >
                          <div className="p-2 rounded-lg bg-primary/10">
                            <IconComponent className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{goal.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Completed • ${goal.targetAmount.toFixed(2)} saved
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            ✓ Complete
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
