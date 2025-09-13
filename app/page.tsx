import { Header } from "@/components/header"
import { SidebarNav } from "@/components/sidebar-nav"
import { AIChatAssistant } from "@/components/ai-chat-assistant"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  AlertTriangle,
  PlusCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <aside className="hidden w-64 md:block">
        <SidebarNav />
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-balance">Welcome back, Student!</h1>
                <p className="text-muted-foreground">Here's your financial overview for this month.</p>
              </div>
              <Button className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Transaction
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(237500)}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 text-primary">
                      <TrendingUp className="h-3 w-3" />
                      +12.5%
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
                  <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(102900)}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1 text-destructive">
                      <TrendingDown className="h-3 w-3" />
                      +8.2%
                    </span>{" "}
                    from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent">68%</div>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(56700)} of {formatCurrency(83300)} goal
                  </p>
                  <Progress value={68} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">82%</div>
                  <p className="text-xs text-muted-foreground">
                    {formatCurrency(68300)} of {formatCurrency(83300)} used
                  </p>
                  <Progress value={82} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest financial activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Grocery Store", amount: -3800, category: "Food", date: "Today" },
                    { name: "Coffee Shop", amount: -710, category: "Food", date: "Yesterday" },
                    { name: "Part-time Job", amount: 26700, category: "Income", date: "2 days ago" },
                    { name: "Textbook Purchase", amount: -7500, category: "Education", date: "3 days ago" },
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{transaction.name}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-medium ${
                            transaction.amount > 0 ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}
                          {formatCurrency(Math.abs(transaction.amount))}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {transaction.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Budget Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle>Budget Alerts</CardTitle>
                  <CardDescription>Important notifications about your spending</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">Food Budget Alert</p>
                      <p className="text-xs text-foreground">
                        You've spent 90% of your food budget this month. Consider reducing dining out.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <Target className="h-4 w-4 text-accent mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">Savings Goal Progress</p>
                      <p className="text-xs text-foreground">Great job! You're 68% towards your laptop savings goal.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <ArrowUpRight className="h-4 w-4 text-primary mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">Income Received</p>
                      <p className="text-xs text-foreground">
                        Your part-time job payment of {formatCurrency(26700)} has been categorized automatically.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      <AIChatAssistant />
    </div>
  )
}
