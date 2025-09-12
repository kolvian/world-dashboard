"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Globe, TrendingUp, Newspaper, Zap, Activity } from "lucide-react"
import WorldMap from "@/components/world-map"
import NewsPanel from "@/components/news-panel"
import StockPanel from "@/components/stock-panel"

export default function CyberpunkDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background grid-pattern">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Globe className="h-8 w-8 text-primary glow" />
                <h1 className="text-2xl font-bold neon-text">NEXUS COMMAND</h1>
              </div>
              <Badge variant="secondary" className="glow-hover">
                <Activity className="h-3 w-3 mr-1" />
                ONLINE
              </Badge>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-sm text-muted-foreground font-mono">
                {currentTime.toLocaleString("en-US", {
                  timeZone: "UTC",
                  hour12: false,
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}{" "}
                UTC
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="glow-hover bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Markets
                </Button>
                <Button variant="outline" size="sm" className="glow-hover bg-transparent">
                  <Newspaper className="h-4 w-4 mr-2" />
                  Intel
                </Button>
                <Button variant="outline" size="sm" className="glow-hover bg-transparent">
                  <Zap className="h-4 w-4 mr-2" />
                  Systems
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
          {/* World Map - Main Feature */}
          <div className="col-span-8">
            <Card className="h-full bg-card/80 backdrop-blur-sm border-primary/20 glow">
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold neon-text">Global Intelligence Map</h2>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-destructive rounded-full pulse-glow"></div>
                    <span className="text-sm text-muted-foreground">Live Feed</span>
                  </div>
                </div>
              </div>
              <div className="p-4 h-[calc(100%-80px)]">
                <WorldMap />
              </div>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-4 space-y-6">
            {/* News Panel */}
            <div className="h-1/2">
              <Card className="h-full bg-card/80 backdrop-blur-sm border-primary/20 glow">
                <div className="p-4 border-b border-border">
                  <h2 className="text-lg font-semibold neon-text">Global Intel Feed</h2>
                </div>
                <div className="p-4 h-[calc(100%-80px)] overflow-hidden">
                  <NewsPanel />
                </div>
              </Card>
            </div>

            {/* Stock Panel */}
            <div className="h-1/2">
              <Card className="h-full bg-card/80 backdrop-blur-sm border-primary/20 glow">
                <div className="p-4 border-b border-border">
                  <h2 className="text-lg font-semibold neon-text">Market Data</h2>
                </div>
                <div className="p-4 h-[calc(100%-80px)] overflow-hidden">
                  <StockPanel />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
