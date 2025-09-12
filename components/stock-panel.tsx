"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3 } from "lucide-react"

interface StockData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap: string
  sector: string
}

const mockStocks: StockData[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: "52.3M",
    marketCap: "2.8T",
    sector: "Technology",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 378.85,
    change: -1.92,
    changePercent: -0.5,
    volume: "28.7M",
    marketCap: "2.8T",
    sector: "Technology",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 138.21,
    change: 3.47,
    changePercent: 2.58,
    volume: "31.2M",
    marketCap: "1.7T",
    sector: "Technology",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 248.5,
    change: -8.23,
    changePercent: -3.2,
    volume: "89.4M",
    marketCap: "789B",
    sector: "Automotive",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 875.28,
    change: 15.67,
    changePercent: 1.82,
    volume: "45.8M",
    marketCap: "2.2T",
    sector: "Technology",
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    price: 484.2,
    change: -2.85,
    changePercent: -0.58,
    volume: "19.6M",
    marketCap: "1.2T",
    sector: "Technology",
  },
]

const marketIndices = [
  { name: "S&P 500", value: 4789.85, change: 0.45, symbol: "SPX" },
  { name: "NASDAQ", value: 15234.42, change: -0.23, symbol: "IXIC" },
  { name: "DOW JONES", value: 37863.8, change: 0.12, symbol: "DJI" },
]

export default function StockPanel() {
  const [stocks, setStocks] = useState<StockData[]>(mockStocks)
  const [indices, setIndices] = useState(marketIndices)
  const [selectedView, setSelectedView] = useState<"stocks" | "indices">("stocks")

  useEffect(() => {
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const randomChange = (Math.random() - 0.5) * 2 // Random change between -1 and 1
          const newPrice = Math.max(0.01, stock.price + randomChange)
          const change = newPrice - stock.price
          const changePercent = (change / stock.price) * 100

          return {
            ...stock,
            price: Number(newPrice.toFixed(2)),
            change: Number(change.toFixed(2)),
            changePercent: Number(changePercent.toFixed(2)),
          }
        }),
      )

      setIndices((prevIndices) =>
        prevIndices.map((index) => {
          const randomChange = (Math.random() - 0.5) * 0.5 // Smaller changes for indices
          const newValue = Math.max(0.01, index.value + randomChange)
          const change = ((newValue - index.value) / index.value) * 100

          return {
            ...index,
            value: Number(newValue.toFixed(2)),
            change: Number(change.toFixed(2)),
          }
        }),
      )
    }, 3000) // Update every 3 seconds

    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price)
  }

  const formatChange = (change: number, isPercent = false) => {
    const prefix = change >= 0 ? "+" : ""
    const suffix = isPercent ? "%" : ""
    return `${prefix}${change.toFixed(2)}${suffix}`
  }

  const getChangeColor = (change: number) => {
    return change >= 0 ? "text-emerald-400" : "text-red-400"
  }

  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <TrendingUp className="h-3 w-3 text-emerald-400" />
    ) : (
      <TrendingDown className="h-3 w-3 text-red-400" />
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* View Toggle */}
      <div className="flex gap-2 mb-4">
        <Badge
          variant={selectedView === "stocks" ? "default" : "outline"}
          className="cursor-pointer text-xs glow-hover"
          onClick={() => setSelectedView("stocks")}
        >
          <BarChart3 className="h-3 w-3 mr-1" />
          STOCKS
        </Badge>
        <Badge
          variant={selectedView === "indices" ? "default" : "outline"}
          className="cursor-pointer text-xs glow-hover"
          onClick={() => setSelectedView("indices")}
        >
          <Activity className="h-3 w-3 mr-1" />
          INDICES
        </Badge>
      </div>

      {/* Market Indices View */}
      {selectedView === "indices" && (
        <div className="space-y-3 mb-4">
          {indices.map((index) => (
            <div key={index.symbol} className="p-3 rounded-lg border border-border bg-card/30 glow-hover">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{index.name}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{index.symbol}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm">{index.value.toLocaleString()}</p>
                  <div className={`flex items-center gap-1 text-xs ${getChangeColor(index.change)}`}>
                    {getChangeIcon(index.change)}
                    {formatChange(index.change, true)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stocks View */}
      {selectedView === "stocks" && (
        <ScrollArea className="flex-1">
          <div className="space-y-3">
            {stocks.map((stock) => (
              <div
                key={stock.symbol}
                className="p-3 rounded-lg border border-border bg-card/30 hover:border-primary/40 hover:bg-card/50 transition-all duration-200 cursor-pointer glow-hover"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-sm">{stock.symbol}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm">{formatPrice(stock.price)}</p>
                    <div className={`flex items-center gap-1 text-xs ${getChangeColor(stock.change)}`}>
                      {getChangeIcon(stock.change)}
                      {formatChange(stock.change)} ({formatChange(stock.changePercent, true)})
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    Vol: {stock.volume}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    Cap: {stock.marketCap}
                  </div>
                </div>

                {/* Sector Badge */}
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    {stock.sector}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Status Bar */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse"></div>
            Market Open
          </span>
          <span className="font-mono">
            {selectedView === "stocks" ? `${stocks.length} STOCKS` : `${indices.length} INDICES`}
          </span>
        </div>
      </div>
    </div>
  )
}
