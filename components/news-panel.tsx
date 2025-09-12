"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Globe, Clock, ExternalLink } from "lucide-react"

interface NewsItem {
  id: string
  title: string
  location: string
  timestamp: string
  category: "breaking" | "politics" | "economy" | "conflict" | "tech"
  priority: "high" | "medium" | "low"
  source: string
  excerpt: string
}

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "Diplomatic Crisis Escalates in Middle East",
    location: "Qatar",
    timestamp: "2 min ago",
    category: "breaking",
    priority: "high",
    source: "NEXUS INTEL",
    excerpt: "Regional tensions reach critical levels as diplomatic talks stall...",
  },
  {
    id: "2",
    title: "Environmental Monitoring Systems Activated",
    location: "Utah, USA",
    timestamp: "15 min ago",
    category: "tech",
    priority: "medium",
    source: "GLOBAL WATCH",
    excerpt: "Advanced sensor networks detect unusual atmospheric patterns...",
  },
  {
    id: "3",
    title: "Political Unrest Spreads Across Region",
    location: "Nepal",
    timestamp: "32 min ago",
    category: "politics",
    priority: "high",
    source: "WORLD MONITOR",
    excerpt: "Protests continue as government faces mounting pressure...",
  },
  {
    id: "4",
    title: "Economic Sanctions Impact Global Markets",
    location: "Europe",
    timestamp: "1 hour ago",
    category: "economy",
    priority: "medium",
    source: "MARKET INTEL",
    excerpt: "Financial institutions report significant volatility...",
  },
  {
    id: "5",
    title: "Cyber Security Breach Detected",
    location: "Global",
    timestamp: "2 hours ago",
    category: "tech",
    priority: "high",
    source: "CYBER COMMAND",
    excerpt: "Multiple infrastructure systems show signs of coordinated attack...",
  },
  {
    id: "6",
    title: "Trade Agreement Negotiations Resume",
    location: "Asia-Pacific",
    timestamp: "3 hours ago",
    category: "economy",
    priority: "low",
    source: "TRADE WATCH",
    excerpt: "Bilateral talks show promising signs of progress...",
  },
]

export default function NewsPanel() {
  const [news, setNews] = useState<NewsItem[]>(mockNews)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  useEffect(() => {
    // Simulate real-time news updates
    const interval = setInterval(() => {
      const randomNews = {
        id: Date.now().toString(),
        title: "New Intelligence Report Available",
        location: "Global Network",
        timestamp: "Just now",
        category: "breaking" as const,
        priority: "medium" as const,
        source: "AUTO-INTEL",
        excerpt: "Automated systems have detected new patterns requiring analysis...",
      }

      setNews((prev) => [randomNews, ...prev.slice(0, 9)]) // Keep only 10 items
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "breaking":
        return "destructive"
      case "conflict":
        return "destructive"
      case "politics":
        return "secondary"
      case "economy":
        return "outline"
      case "tech":
        return "default"
      default:
        return "outline"
    }
  }

  const getPriorityIcon = (priority: string) => {
    if (priority === "high") return <AlertTriangle className="h-3 w-3 text-destructive" />
    return <Globe className="h-3 w-3 text-muted-foreground" />
  }

  const filteredNews = selectedCategory === "all" ? news : news.filter((item) => item.category === selectedCategory)

  return (
    <div className="h-full flex flex-col">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge
          variant={selectedCategory === "all" ? "default" : "outline"}
          className="cursor-pointer text-xs glow-hover"
          onClick={() => setSelectedCategory("all")}
        >
          ALL
        </Badge>
        <Badge
          variant={selectedCategory === "breaking" ? "destructive" : "outline"}
          className="cursor-pointer text-xs glow-hover"
          onClick={() => setSelectedCategory("breaking")}
        >
          BREAKING
        </Badge>
        <Badge
          variant={selectedCategory === "politics" ? "secondary" : "outline"}
          className="cursor-pointer text-xs glow-hover"
          onClick={() => setSelectedCategory("politics")}
        >
          POLITICS
        </Badge>
        <Badge
          variant={selectedCategory === "economy" ? "default" : "outline"}
          className="cursor-pointer text-xs glow-hover"
          onClick={() => setSelectedCategory("economy")}
        >
          ECONOMY
        </Badge>
      </div>

      {/* News Feed */}
      <ScrollArea className="flex-1">
        <div className="space-y-3">
          {filteredNews.map((item, index) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:border-primary/40 hover:bg-card/60 ${
                index === 0 ? "border-primary/30 glow" : "border-border"
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getPriorityIcon(item.priority)}
                  <Badge variant={getCategoryColor(item.category)} className="text-xs">
                    {item.category.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {item.timestamp}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-sm mb-1 line-clamp-2 text-balance">{item.title}</h3>

              {/* Location and Source */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  {item.location}
                </span>
                <span className="font-mono">{item.source}</span>
              </div>

              {/* Excerpt */}
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{item.excerpt}</p>

              {/* Action */}
              <div className="flex justify-end">
                <button className="text-xs text-primary hover:text-primary/80 flex items-center gap-1">
                  <ExternalLink className="h-3 w-3" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Status Bar */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
            Live Feed Active
          </span>
          <span className="font-mono">{filteredNews.length} ITEMS</span>
        </div>
      </div>
    </div>
  )
}
