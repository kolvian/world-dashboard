"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Zap, TrendingUp } from "lucide-react"

interface NewsHotspot {
  id: string
  country: string
  x: number
  y: number
  intensity: "low" | "medium" | "high"
  type: "conflict" | "economic" | "political" | "natural"
  title: string
}

const newsHotspots: NewsHotspot[] = [
  {
    id: "1",
    country: "Qatar",
    x: 51.5,
    y: 25.3,
    intensity: "high",
    type: "political",
    title: "Major diplomatic developments",
  },
  {
    id: "2",
    country: "Utah, USA",
    x: -111.9,
    y: 39.3,
    intensity: "medium",
    type: "natural",
    title: "Environmental monitoring alerts",
  },
  {
    id: "3",
    country: "Nepal",
    x: 84.1,
    y: 28.4,
    intensity: "high",
    type: "political",
    title: "Regional stability concerns",
  },
  {
    id: "4",
    country: "Ukraine",
    x: 31.2,
    y: 49.0,
    intensity: "high",
    type: "conflict",
    title: "Ongoing conflict updates",
  },
  {
    id: "5",
    country: "Taiwan",
    x: 121.0,
    y: 23.8,
    intensity: "medium",
    type: "political",
    title: "Geopolitical tensions",
  },
]

export default function WorldMap() {
  const [selectedHotspot, setSelectedHotspot] = useState<NewsHotspot | null>(null)
  const [pulseAnimation, setPulseAnimation] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation((prev) => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Convert lat/lng to SVG coordinates (simplified projection)
  const projectCoordinates = (lng: number, lat: number) => {
    const x = ((lng + 180) / 360) * 800
    const y = ((90 - lat) / 180) * 400
    return { x, y }
  }

  const getHotspotColor = (intensity: string, type: string) => {
    if (intensity === "high") return "#ef4444" // red-500
    if (intensity === "medium") return "#f59e0b" // amber-500
    return "#10b981" // emerald-500
  }

  const getHotspotIcon = (type: string) => {
    switch (type) {
      case "conflict":
        return AlertTriangle
      case "economic":
        return TrendingUp
      case "political":
        return Zap
      default:
        return AlertTriangle
    }
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-background to-muted/20 rounded-lg overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="grid-pattern">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(16, 185, 129)" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* World Map SVG */}
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 0 10px rgba(16, 185, 129, 0.3))" }}
      >
        {/* Simplified world map paths */}
        <g fill="none" stroke="rgb(16, 185, 129)" strokeWidth="1" opacity="0.6">
          {/* North America */}
          <path d="M 120 80 Q 180 60 240 80 L 280 120 Q 260 160 200 180 L 160 160 Q 100 140 120 80 Z" />

          {/* South America */}
          <path d="M 200 200 Q 220 180 240 200 L 260 280 Q 240 320 220 300 L 200 280 Q 180 240 200 200 Z" />

          {/* Europe */}
          <path d="M 380 60 Q 420 50 460 70 L 480 100 Q 460 120 420 110 L 400 90 Q 360 80 380 60 Z" />

          {/* Africa */}
          <path d="M 420 140 Q 460 120 500 140 L 520 220 Q 500 280 460 260 L 440 200 Q 400 160 420 140 Z" />

          {/* Asia */}
          <path d="M 500 60 Q 600 40 700 80 L 720 140 Q 680 160 600 140 L 540 120 Q 480 100 500 60 Z" />

          {/* Australia */}
          <path d="M 600 260 Q 640 250 680 270 L 700 300 Q 680 320 640 310 L 620 290 Q 580 280 600 260 Z" />
        </g>

        {/* News Hotspots */}
        {newsHotspots.map((hotspot) => {
          const coords = projectCoordinates(hotspot.x, hotspot.y)
          const color = getHotspotColor(hotspot.intensity, hotspot.type)

          return (
            <g key={hotspot.id}>
              {/* Pulsing circle */}
              <circle
                cx={coords.x}
                cy={coords.y}
                r="8"
                fill={color}
                opacity="0.3"
                className={pulseAnimation ? "animate-ping" : ""}
              />

              {/* Main hotspot marker */}
              <circle
                cx={coords.x}
                cy={coords.y}
                r="4"
                fill={color}
                stroke="white"
                strokeWidth="1"
                className="cursor-pointer hover:r-6 transition-all duration-200"
                onClick={() => setSelectedHotspot(hotspot)}
                style={{ filter: `drop-shadow(0 0 8px ${color})` }}
              />

              {/* Country label */}
              <text
                x={coords.x}
                y={coords.y - 15}
                textAnchor="middle"
                className="fill-foreground text-xs font-mono"
                style={{ textShadow: "0 0 4px rgba(0,0,0,0.8)" }}
              >
                {hotspot.country}
              </text>
            </g>
          )
        })}
      </svg>

      {/* Hotspot Details Panel */}
      {selectedHotspot && (
        <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-primary/20 rounded-lg p-4 max-w-xs glow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm">{selectedHotspot.country}</h3>
            <button onClick={() => setSelectedHotspot(null)} className="text-muted-foreground hover:text-foreground">
              ×
            </button>
          </div>

          <p className="text-sm text-muted-foreground mb-3">{selectedHotspot.title}</p>

          <div className="flex items-center gap-2">
            <Badge variant={selectedHotspot.intensity === "high" ? "destructive" : "secondary"} className="text-xs">
              {selectedHotspot.intensity.toUpperCase()}
            </Badge>

            <Badge variant="outline" className="text-xs">
              {selectedHotspot.type.toUpperCase()}
            </Badge>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-primary/20 rounded-lg p-3">
        <h4 className="text-xs font-semibold mb-2 neon-text">THREAT LEVELS</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-500 glow"></div>
            <span>High Priority</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Medium Priority</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span>Low Priority</span>
          </div>
        </div>
      </div>

      {/* Scanning line animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 animate-pulse"></div>
      </div>
    </div>
  )
}
