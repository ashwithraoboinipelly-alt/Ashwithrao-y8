"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { formatCurrency } from "@/lib/utils"

const expenseData = [
  { name: "Food & Dining", value: 37500, color: "#f97316" },
  { name: "Rent & Housing", value: 70800, color: "#3b82f6" },
  { name: "Transportation", value: 10000, color: "#22c55e" },
  { name: "Entertainment", value: 15000, color: "#a855f7" },
  { name: "Study Materials", value: 16700, color: "#6366f1" },
  { name: "Other", value: 8300, color: "#6b7280" },
]

export function ExpenseCategoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>Your expense breakdown for this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [formatCurrency(value as number), "Amount"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
