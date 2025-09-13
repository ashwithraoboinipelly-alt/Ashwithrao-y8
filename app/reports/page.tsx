"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  Download,
  DollarSign,
  Target,
  AlertTriangle,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Mock data for charts
const monthlySpendingData = [
  { month: "Jan", spending: 100000, income: 150000, savings: 50000 },
  { month: "Feb", spending: 112500, income: 150000, savings: 37500 },
  { month: "Mar", spending: 91700, income: 166700, savings: 75000 },
  { month: "Apr", spending: 116700, income: 150000, savings: 33300 },
  { month: "May", spending: 104200, income: 158300, savings: 54200 },
  { month: "Jun", spending: 108300, income: 150000, savings: 41700 },
]

const categorySpendingData = [
  { name: "Food & Dining", value: 37500, color: "#f97316", percentage: 32 },
  { name: "Rent & Housing", value: 70800, color: "#3b82f6", percentage: 60 },
  { name: "Transportation", value: 10000, color: "#22c55e", percentage: 8 },
  { name: "Entertainment", value: 15000, color: "#a855f7", percentage: 13 },
  { name: "Study Materials", value: 16700, color: "#6366f1", percentage: 14 },
  { name: "Healthcare", value: 6700, color: "#ef4444", percentage: 6 },
  { name: "Other", value: 8300, color: "#6b7280", percentage: 7 },
]

const weeklySpendingData = [
  { week: "Week 1", amount: 26700 },
  { week: "Week 2", amount: 23300 },
  { week: "Week 3", amount: 34200 },
  { week: "Week 4", amount: 29200 },
]

const savingsGoalData = [
  { month: "Jan", target: 50000, actual: 50000 },
  { month: "Feb", target: 50000, actual: 37500 },
  { month: "Mar", target: 50000, actual: 75000 },
  { month: "Apr", target: 50000, actual: 33300 },
  { month: "May", target: 50000, actual: 54200 },
  { month: "Jun", target: 50000, actual: 41700 },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const totalSpending = monthlySpendingData.reduce((sum, month) => sum + month.spending, 0)
  const totalIncome = monthlySpendingData.reduce((sum, month) => sum + month.income, 0)
  const totalSavings = monthlySpendingData.reduce((sum, month) => sum + month.savings, 0)
  const avgMonthlySpending = totalSpending / monthlySpendingData.length
  const savingsRate = (totalSavings / totalIncome) * 100

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
                <h1 className="text-3xl font-bold tracking-tight text-balance">Analytics & Reports</h1>
                <p className="text-muted-foreground">
                  Detailed insights into your spending patterns and financial health
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[180px]">
                    <Calendar className="mr-2 h-4 w-4" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(totalSpending)}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 text-destructive">
                      <TrendingUp className="h-3 w-3" />
                      +8.2%
                    </span>{" "}
                    from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Monthly Spend</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(avgMonthlySpending)}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 text-primary">
                      <TrendingDown className="h-3 w-3" />
                      -3.1%
                    </span>{" "}
                    from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{savingsRate.toFixed(1)}%</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 text-primary">
                      <TrendingUp className="h-3 w-3" />
                      +2.4%
                    </span>{" "}
                    from last period
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Variance</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">+12.5%</div>
                  <p className="text-xs text-muted-foreground">Over budget this month</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts Section */}
            <Tabs defaultValue="overview" className="space-y-4">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="categories">Categories</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  {/* Monthly Spending Trend */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Financial Overview</CardTitle>
                      <CardDescription>Income, spending, and savings over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlySpendingData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [formatCurrency(value as number), ""]} />
                          <Legend />
                          <Line type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2} name="Income" />
                          <Line type="monotone" dataKey="spending" stroke="#ef4444" strokeWidth={2} name="Spending" />
                          <Line type="monotone" dataKey="savings" stroke="#3b82f6" strokeWidth={2} name="Savings" />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Weekly Spending */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Spending Pattern</CardTitle>
                      <CardDescription>Your spending distribution this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklySpendingData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" />
                          <YAxis />
                          <Tooltip formatter={(value) => [formatCurrency(value as number), "Amount"]} />
                          <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <div className="grid gap-4 lg:grid-cols-2">
                  {/* Category Pie Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Spending by Category</CardTitle>
                      <CardDescription>Breakdown of your expenses by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={categorySpendingData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percentage }) => `${name} ${percentage}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {categorySpendingData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [formatCurrency(value as number), "Amount"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Category Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Category Details</CardTitle>
                      <CardDescription>Detailed breakdown with amounts and percentages</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {categorySpendingData.map((category, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }} />
                              <span className="text-sm font-medium">{category.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold">{formatCurrency(category.value)}</div>
                              <div className="text-xs text-muted-foreground">{category.percentage}%</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="trends" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Spending Trends Analysis</CardTitle>
                    <CardDescription>AI-powered insights into your spending patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="flex items-start gap-3">
                          <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-primary">Increasing Food Expenses</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Your food spending has increased by 15% over the last 3 months. Consider meal planning to
                              reduce costs.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                        <div className="flex items-start gap-3">
                          <Target className="h-5 w-5 text-accent mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-accent">Consistent Savings Pattern</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Great job! You've maintained a steady savings rate of 30% for the past 4 months.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-destructive">Entertainment Budget Alert</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Entertainment expenses are 40% above your monthly budget. Consider reducing discretionary
                              spending.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="goals" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Savings Goals Performance</CardTitle>
                    <CardDescription>Track your progress towards financial goals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={savingsGoalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [formatCurrency(value as number), ""]} />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="target"
                          stackId="1"
                          stroke="#6b7280"
                          fill="#6b7280"
                          fillOpacity={0.3}
                          name="Target"
                        />
                        <Area
                          type="monotone"
                          dataKey="actual"
                          stackId="2"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                          name="Actual"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle>AI Financial Insights</CardTitle>
                <CardDescription>Personalized recommendations based on your spending patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Spending Optimization</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Switch to a student meal plan to save ₹10,000/month on food expenses
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Use public transport instead of ride-sharing to reduce transportation costs by 60%
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                        Consider sharing streaming subscriptions with friends to cut entertainment costs
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Savings Opportunities</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                        You could save an additional ₹16,700/month by reducing dining out frequency
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                        Set up automatic transfers to reach your laptop goal 2 months earlier
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2" />
                        Consider a high-yield savings account to earn 4.5% APY on your emergency fund
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
