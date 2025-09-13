"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Bot, User, Sparkles, X, Minimize2, Maximize2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  suggestions?: string[]
}

const quickSuggestions = [
  "How can I save more money?",
  "What's my spending pattern?",
  "Help me create a budget",
  "Tips for student discounts",
  "How to build an emergency fund?",
  "Best apps for tracking expenses",
]

const mockAIResponses = {
  "How can I save more money?": {
    content:
      "Based on your spending patterns, here are personalized ways to save more:\n\n1. **Reduce dining out**: You spend ₹37,500/month on food. Cooking at home could save you ₹16,700/month.\n\n2. **Student discounts**: Use your student ID for discounts on software, transportation, and entertainment.\n\n3. **Automatic savings**: Set up automatic transfers of ₹8,300/week to your savings account.\n\n4. **Track subscriptions**: Cancel unused subscriptions - I noticed you have 3 streaming services.\n\nWould you like me to help you create a specific savings plan?",
    suggestions: ["Create a savings plan", "Find student discounts", "Track my subscriptions"],
  },
  "What's my spending pattern?": {
    content:
      "Here's your spending analysis:\n\n📊 **Monthly Breakdown:**\n• Food & Dining: ₹37,500 (32%)\n• Rent & Housing: ₹70,800 (60%)\n• Transportation: ₹10,000 (8%)\n• Entertainment: ₹15,000 (13%)\n\n📈 **Trends:**\n• Your food spending increased 15% this month\n• You're consistently under budget on transportation\n• Entertainment spending varies significantly week to week\n\n💡 **Key Insight:** You spend most on weekends. Consider setting a weekend budget limit.",
    suggestions: ["Set weekend budget", "Reduce food costs", "View detailed analytics"],
  },
  "Help me create a budget": {
    content:
      "Let's create a student-friendly budget! Based on your income of ₹1,50,000/month:\n\n🏠 **Fixed Expenses (60%): ₹90,000**\n• Rent: ₹70,800\n• Utilities: ₹6,700\n• Phone: ₹4,200\n• Insurance: ₹8,300\n\n🍕 **Variable Expenses (25%): ₹37,500**\n• Food: ₹25,000\n• Transportation: ₹8,300\n• Personal care: ₹4,200\n\n🎯 **Savings & Goals (15%): ₹22,500**\n• Emergency fund: ₹10,000\n• Laptop goal: ₹8,300\n• Fun money: ₹4,200\n\nThis follows the 50/30/20 rule adapted for students. Want me to adjust anything?",
    suggestions: ["Adjust budget categories", "Set up automatic savings", "Track budget progress"],
  },
  "Tips for student discounts": {
    content:
      'Here are the best student discounts you should be using:\n\n🎓 **Software & Tech:**\n• Adobe Creative Suite: 60% off\n• Microsoft Office: Free with .edu email\n• Spotify Premium: 50% off\n• Amazon Prime Student: 50% off\n\n🚌 **Transportation:**\n• Public transit: Student passes available\n• Uber/Lyft: Student discounts in some cities\n• Airlines: Student fare programs\n\n🍔 **Food & Entertainment:**\n• Many restaurants offer 10-15% student discounts\n• Movie theaters: Student pricing\n• Gym memberships: Student rates\n\n💡 **Pro tip:** Always ask "Do you have a student discount?" - many places offer them but don\'t advertise it!',
    suggestions: ["Find local student discounts", "Set up student accounts", "Track discount savings"],
  },
  "How to build an emergency fund?": {
    content:
      "Building an emergency fund as a student is crucial! Here's your personalized plan:\n\n🎯 **Goal:** ₹2,50,000 (3 months of expenses)\n**Current:** ₹66,700\n**Needed:** ₹1,83,300\n\n📅 **12-Month Plan:**\n• Save ₹15,400/month\n• That's about ₹500/day\n• Automate transfers every payday\n\n💡 **Quick wins to boost your fund:**\n• Sell textbooks you no longer need\n• Take on a small side gig (tutoring, food delivery)\n• Use cashback apps for purchases\n• Save tax refunds and gifts\n\n🏦 **Where to keep it:** High-yield savings account earning 4-5% APY\n\nWant me to help you set up automatic transfers?",
    suggestions: ["Set up automatic transfers", "Find side gig opportunities", "Compare savings accounts"],
  },
  "Best apps for tracking expenses": {
    content:
      "Here are the top expense tracking apps for students:\n\n📱 **Free Options:**\n• **Mint**: Comprehensive budgeting and tracking\n• **PocketGuard**: Prevents overspending\n• **Goodbudget**: Envelope budgeting method\n• **Wally**: Simple expense tracking\n\n💰 **Paid but Worth It:**\n• **YNAB**: Zero-based budgeting (free for students!)\n• **Personal Capital**: Investment tracking included\n\n🎓 **Student-Specific Features to Look For:**\n• Bank account syncing\n• Category customization\n• Goal tracking\n• Bill reminders\n• Spending alerts\n\n💡 **My recommendation:** Start with Mint (free) or get YNAB with your student discount. Both integrate well with bank accounts and offer great insights.\n\nWant help setting up any of these apps?",
    suggestions: ["Compare app features", "Set up YNAB", "Connect bank accounts"],
  },
}

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm your AI financial assistant. I can help you with budgeting, saving tips, expense analysis, and financial planning. What would you like to know?",
      sender: "ai",
      timestamp: new Date(),
      suggestions: quickSuggestions.slice(0, 3),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const response = mockAIResponses[content as keyof typeof mockAIResponses] || {
        content:
          "I understand you're asking about financial matters. While I don't have a specific response for that question, I can help you with budgeting, saving strategies, expense tracking, and financial planning. Try asking about one of these topics, or use one of the suggested questions below!",
        suggestions: quickSuggestions.slice(0, 3),
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: "ai",
        timestamp: new Date(),
        suggestions: response.suggestions,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const formatMessageContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("•")) {
        return (
          <li key={index} className="ml-4 text-sm">
            {line.substring(1).trim()}
          </li>
        )
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h4 key={index} className="font-semibold mt-2 mb-1">
            {line.replace(/\*\*/g, "")}
          </h4>
        )
      }
      if (line.includes("**")) {
        const parts = line.split("**")
        return (
          <p key={index} className="text-sm mb-1">
            {parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part))}
          </p>
        )
      }
      if (line.trim() === "") {
        return <br key={index} />
      }
      return (
        <p key={index} className="text-sm mb-1">
          {line}
        </p>
      )
    })
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 h-12 w-12 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open AI Assistant</span>
      </Button>
    )
  }

  return (
    <Card
      className={cn(
        "fixed bottom-4 right-4 w-96 shadow-xl z-50 transition-all duration-200",
        isMinimized ? "h-14" : "h-[500px]",
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 py-3 border-b">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-full bg-primary/10">
            <Bot className="h-4 w-4 text-primary" />
          </div>
          <CardTitle className="text-sm">AI Financial Assistant</CardTitle>
          <Badge variant="secondary" className="text-xs gap-1">
            <Sparkles className="h-3 w-3" />
            AI
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-[calc(500px-60px)]">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-3", message.sender === "user" ? "justify-end" : "justify-start")}
                >
                  {message.sender === "ai" && (
                    <div className="p-1.5 rounded-full bg-primary/10 h-fit">
                      <Bot className="h-3 w-3 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    {message.sender === "ai" ? (
                      <div className="space-y-1">{formatMessageContent(message.content)}</div>
                    ) : (
                      message.content
                    )}
                  </div>
                  {message.sender === "user" && (
                    <div className="p-1.5 rounded-full bg-accent/10 h-fit">
                      <User className="h-3 w-3 text-accent" />
                    </div>
                  )}
                </div>
              ))}

              {/* Suggestions */}
              {messages.length > 0 && messages[messages.length - 1].suggestions && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 bg-transparent"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="p-1.5 rounded-full bg-primary/10 h-fit">
                    <Bot className="h-3 w-3 text-primary" />
                  </div>
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about budgeting, saving, or expenses..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(inputValue)
                  }
                }}
                className="flex-1"
              />
              <Button
                size="icon"
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
