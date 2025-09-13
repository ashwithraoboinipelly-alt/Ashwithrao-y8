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
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wallet, Plus, Edit, AlertTriangle, TrendingUp, TrendingDown, Bell } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"

interface BudgetCategory {
  id: string
  name: string
  budgetAmount: number
  spentAmount: number
  color: string
  alertThreshold: number
  alertsEnabled: boolean
}

const mockBudgetCategories: BudgetCategory[] = [
  {
    id: "1",
    name: "Food & Dining",
    budgetAmount: 33300,
    spentAmount: 30000,
    color: "bg-orange-500",
    alertThreshold: 80,
    alertsEnabled: true,
  },
  {
    id: "2",
    name: "Transportation",
    budgetAmount: 12500,
    spentAmount: 7100,
    color: "bg-green-500",
    alertThreshold: 75,
    alertsEnabled: true,
  },
  {
    id: "3",
    name: "Entertainment",
    budgetAmount: 16700,
    spentAmount: 15000,
    color: "bg-purple-500",
    alertThreshold: 85,
    alertsEnabled: true,
  },
  {
    id: "4",
    name: "Study Materials",
    budgetAmount: 8300,
    spentAmount: 3750,
    color: "bg-indigo-500",
    alertThreshold: 70,
    alertsEnabled: false,
  },
  {
    id: "5",
    name: "Healthcare",
    budgetAmount: 6700,
    spentAmount: 2100,
    color: "bg-red-500",
    alertThreshold: 90,
    alertsEnabled: true,
  },
  {
    id: "6",
    name: "Shopping",
    budgetAmount: 10000,
    spentAmount: 7900,
    color: "bg-pink-500",
    alertThreshold: 75,
    alertsEnabled: true,
  },
]

export default function BudgetPage() {
  const [budgetCategories, setBudgetCategories] = useState(mockBudgetCategories)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<BudgetCategory | null>(null)
  const [newCategory, setNewCategory] = useState({
    name: "",
    budgetAmount: "",
    alertThreshold: "80",
    alertsEnabled: true,
  })

  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budgetAmount, 0)
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spentAmount, 0)
  const remainingBudget = totalBudget - totalSpent

  const getProgressPercentage = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100)
  }

  const getStatusColor = (spent: number, budget: number, threshold: number) => {
    const percentage = (spent / budget) * 100
    if (percentage >= 100) return "text-destructive"
    if (percentage >= threshold) return "text-yellow-600"
    return "text-primary"
  }

  const getStatusBadge = (spent: number, budget: number, threshold: number) => {
    const percentage = (spent / budget) * 100
    if (percentage >= 100) return { label: "Over Budget", variant: "destructive" as const }
    if (percentage >= threshold) return { label: "Alert", variant: "secondary" as const }
    return { label: "On Track", variant: "default" as const }
  }

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.budgetAmount) {
      const category: BudgetCategory = {
        id: (budgetCategories.length + 1).toString(),
        name: newCategory.name,
        budgetAmount: Number.parseFloat(newCategory.budgetAmount),
        spentAmount: 0,
        color: "bg-gray-500",
        alertThreshold: Number.parseInt(newCategory.alertThreshold),
        alertsEnabled: newCategory.alertsEnabled,
      }
      setBudgetCategories([...budgetCategories, category])
      setNewCategory({
        name: "",
        budgetAmount: "",
        alertThreshold: "80",
        alertsEnabled: true,
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleUpdateCategory = (id: string, updates: Partial<BudgetCategory>) => {
    setBudgetCategories((categories) => categories.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat)))
  }

  const alertCategories = budgetCategories.filter((cat) => {
    const percentage = (cat.spentAmount / cat.budgetAmount) * 100
    return cat.alertsEnabled && percentage >= cat.alertThreshold
  })

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
                <h1 className="text-3xl font-bold tracking-tight text-balance">Budget Management</h1>
                <p className="text-muted-foreground">Set budgets, track spending, and receive smart alerts</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Budget Category</DialogTitle>
                    <DialogDescription>Create a new budget category to track your spending.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="categoryName">Category Name</Label>
                      <Input
                        id="categoryName"
                        placeholder="e.g., Groceries"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="budgetAmount">Monthly Budget</Label>
                      <Input
                        id="budgetAmount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newCategory.budgetAmount}
                        onChange={(e) => setNewCategory({ ...newCategory, budgetAmount: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="alertThreshold">Alert Threshold (%)</Label>
                      <Select
                        value={newCategory.alertThreshold}
                        onValueChange={(value) => setNewCategory({ ...newCategory, alertThreshold: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50">50%</SelectItem>
                          <SelectItem value="60">60%</SelectItem>
                          <SelectItem value="70">70%</SelectItem>
                          <SelectItem value="80">80%</SelectItem>
                          <SelectItem value="90">90%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="alertsEnabled"
                        checked={newCategory.alertsEnabled}
                        onCheckedChange={(checked) => setNewCategory({ ...newCategory, alertsEnabled: checked })}
                      />
                      <Label htmlFor="alertsEnabled">Enable alerts for this category</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddCategory}>Add Category</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Budget Overview */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(totalBudget)}</div>
                  <p className="text-xs text-muted-foreground">Monthly allocation</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
                  <p className="text-xs text-muted-foreground">
                    {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget used
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Remaining</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={cn("text-2xl font-bold", remainingBudget >= 0 ? "text-primary" : "text-destructive")}>
                    {formatCurrency(Math.abs(remainingBudget))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {remainingBudget >= 0 ? "Available to spend" : "Over budget"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Active Alerts */}
            {alertCategories.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Active Budget Alerts
                  </CardTitle>
                  <CardDescription>Categories that need your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alertCategories.map((category) => {
                      const percentage = (category.spentAmount / category.budgetAmount) * 100
                      const isOverBudget = percentage >= 100

                      return (
                        <div
                          key={category.id}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-lg border",
                            isOverBudget
                              ? "bg-destructive/10 border-destructive/20"
                              : "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <AlertTriangle
                              className={cn("h-4 w-4", isOverBudget ? "text-destructive" : "text-yellow-600")}
                            />
                            <div>
                              <p className="font-medium">{category.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatCurrency(category.spentAmount)} of {formatCurrency(category.budgetAmount)} spent
                              </p>
                            </div>
                          </div>
                          <Badge variant={isOverBudget ? "destructive" : "secondary"}>{percentage.toFixed(0)}%</Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Budget Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Categories</CardTitle>
                <CardDescription>Manage your spending limits and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetCategories.map((category) => {
                    const percentage = getProgressPercentage(category.spentAmount, category.budgetAmount)
                    const statusColor = getStatusColor(
                      category.spentAmount,
                      category.budgetAmount,
                      category.alertThreshold,
                    )
                    const statusBadge = getStatusBadge(
                      category.spentAmount,
                      category.budgetAmount,
                      category.alertThreshold,
                    )

                    return (
                      <div key={category.id} className="p-4 rounded-lg border bg-card">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={cn("w-4 h-4 rounded-full", category.color)} />
                            <div>
                              <h3 className="font-semibold">{category.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {formatCurrency(category.spentAmount)} of {formatCurrency(category.budgetAmount)}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setEditingCategory(category)}>
                                  <Edit className="h-3 w-3" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Edit Budget Category</DialogTitle>
                                  <DialogDescription>
                                    Update the budget and alert settings for {category.name}.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label>Monthly Budget</Label>
                                    <Input
                                      type="number"
                                      step="0.01"
                                      defaultValue={category.budgetAmount}
                                      onChange={(e) => {
                                        const value = Number.parseFloat(e.target.value)
                                        if (!isNaN(value)) {
                                          handleUpdateCategory(category.id, { budgetAmount: value })
                                        }
                                      }}
                                    />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label>Alert Threshold</Label>
                                    <Select
                                      defaultValue={category.alertThreshold.toString()}
                                      onValueChange={(value) =>
                                        handleUpdateCategory(category.id, { alertThreshold: Number.parseInt(value) })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="50">50%</SelectItem>
                                        <SelectItem value="60">60%</SelectItem>
                                        <SelectItem value="70">70%</SelectItem>
                                        <SelectItem value="80">80%</SelectItem>
                                        <SelectItem value="90">90%</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch
                                      checked={category.alertsEnabled}
                                      onCheckedChange={(checked) =>
                                        handleUpdateCategory(category.id, { alertsEnabled: checked })
                                      }
                                    />
                                    <Label>Enable alerts for this category</Label>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Progress value={percentage} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span className={statusColor}>{percentage.toFixed(1)}% used</span>
                            <span>{formatCurrency(category.budgetAmount - category.spentAmount)} remaining</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {budgetCategories.length === 0 && (
                  <div className="text-center py-8">
                    <Wallet className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-semibold">No budget categories</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Create your first budget category to start tracking your spending.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
