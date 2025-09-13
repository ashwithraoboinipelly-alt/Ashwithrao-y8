"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
import { format } from "date-fns"
import { CalendarIcon, Plus, Search, Filter, Receipt, Sparkles, TrendingDown, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/utils"

const expenseCategories = [
  { value: "food", label: "Food & Dining", color: "bg-orange-500" },
  { value: "rent", label: "Rent & Housing", color: "bg-blue-500" },
  { value: "transport", label: "Transportation", color: "bg-green-500" },
  { value: "entertainment", label: "Entertainment", color: "bg-purple-500" },
  { value: "education", label: "Study Materials", color: "bg-indigo-500" },
  { value: "health", label: "Healthcare", color: "bg-red-500" },
  { value: "shopping", label: "Shopping", color: "bg-pink-500" },
  { value: "utilities", label: "Utilities", color: "bg-yellow-500" },
  { value: "other", label: "Other", color: "bg-gray-500" },
]

const mockExpenses = [
  {
    id: 1,
    description: "Starbucks Coffee",
    amount: 710,
    category: "food",
    date: new Date("2024-01-15"),
    aiSuggested: true,
    merchant: "Starbucks",
  },
  {
    id: 2,
    description: "Monthly Rent Payment",
    amount: 70800,
    category: "rent",
    date: new Date("2024-01-01"),
    aiSuggested: false,
    merchant: "Property Management",
  },
  {
    id: 3,
    description: "Textbook - Advanced Mathematics",
    amount: 7500,
    category: "education",
    date: new Date("2024-01-10"),
    aiSuggested: true,
    merchant: "University Bookstore",
  },
  {
    id: 4,
    description: "Uber Ride to Campus",
    amount: 1025,
    category: "transport",
    date: new Date("2024-01-14"),
    aiSuggested: true,
    merchant: "Uber",
  },
  {
    id: 5,
    description: "Netflix Subscription",
    amount: 1330,
    category: "entertainment",
    date: new Date("2024-01-05"),
    aiSuggested: true,
    merchant: "Netflix",
  },
]

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState(mockExpenses)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date(),
    merchant: "",
  })

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = selectedCategory === "all" || expense.category === selectedCategory
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.merchant.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const aiCategorizedCount = expenses.filter((expense) => expense.aiSuggested).length

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.category) {
      const expense = {
        id: expenses.length + 1,
        description: newExpense.description,
        amount: Number.parseFloat(newExpense.amount),
        category: newExpense.category,
        date: newExpense.date,
        merchant: newExpense.merchant,
        aiSuggested: false,
      }
      setExpenses([expense, ...expenses])
      setNewExpense({
        description: "",
        amount: "",
        category: "",
        date: new Date(),
        merchant: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const getCategoryInfo = (categoryValue: string) => {
    return (
      expenseCategories.find((cat) => cat.value === categoryValue) || expenseCategories[expenseCategories.length - 1]
    )
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
                <h1 className="text-3xl font-bold tracking-tight text-balance">Expense Tracking</h1>
                <p className="text-muted-foreground">Manage and categorize your expenses with AI-powered insights</p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Expense
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Expense</DialogTitle>
                    <DialogDescription>
                      Add a new expense to track your spending. AI will help categorize it automatically.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        placeholder="e.g., Coffee at Starbucks"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Amount</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="merchant">Merchant (Optional)</Label>
                      <Input
                        id="merchant"
                        placeholder="e.g., Starbucks"
                        value={newExpense.merchant}
                        onChange={(e) => setNewExpense({ ...newExpense, merchant: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newExpense.category}
                        onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {expenseCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center gap-2">
                                <div className={cn("w-3 h-3 rounded-full", category.color)} />
                                {category.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "justify-start text-left font-normal",
                              !newExpense.date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newExpense.date ? format(newExpense.date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newExpense.date}
                            onSelect={(date) => date && setNewExpense({ ...newExpense, date })}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddExpense}>
                      Add Expense
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <Receipt className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 text-destructive">
                      <TrendingUp className="h-3 w-3" />
                      +8.2%
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AI Categorized</CardTitle>
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{aiCategorizedCount}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((aiCategorizedCount / expenses.length) * 100)}% automatically categorized
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Daily Spend</CardTitle>
                  <TrendingDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(totalExpenses / 30)}</div>
                  <p className="text-xs text-muted-foreground">Based on last 30 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Filters and Search */}
            <Card>
              <CardHeader>
                <CardTitle>Expense History</CardTitle>
                <CardDescription>View and manage all your expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search expenses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {expenseCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            <div className="flex items-center gap-2">
                              <div className={cn("w-3 h-3 rounded-full", category.color)} />
                              {category.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Expense List */}
                <div className="mt-6 space-y-3">
                  {filteredExpenses.map((expense) => {
                    const categoryInfo = getCategoryInfo(expense.category)
                    return (
                      <div
                        key={expense.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center",
                              categoryInfo.color,
                            )}
                          >
                            <Receipt className="h-4 w-4 text-white" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{expense.description}</p>
                              {expense.aiSuggested && (
                                <Badge variant="secondary" className="text-xs gap-1">
                                  <Sparkles className="h-3 w-3" />
                                  AI
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{expense.merchant}</span>
                              <span>•</span>
                              <span>{format(expense.date, "MMM dd, yyyy")}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(expense.amount)}</p>
                          <Badge variant="outline" className="text-xs">
                            {categoryInfo.label}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {filteredExpenses.length === 0 && (
                  <div className="text-center py-8">
                    <Receipt className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-sm font-semibold">No expenses found</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
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
