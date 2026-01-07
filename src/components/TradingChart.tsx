"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { PriceData } from "@/types/trading";
import { CandlestickChart } from "@/components/CandlestickChart";

interface TradingChartProps {
  symbol: string;
  priceData: PriceData[];
  currentPrice: number;
  signal?: "BUY" | "SELL";
  signalStrength?: number;
}

export function TradingChart({ symbol, priceData, currentPrice, signal, signalStrength }: TradingChartProps) {
  const [timeframe, setTimeframe] = useState("2M");
  const [chartType, setChartType] = useState<"line" | "candlestick">("line");
  
  // Format data for candlestick chart
  const chartData = priceData.slice(-50).map((data, index) => ({
    time: new Date(data.timestamp).toLocaleTimeString("en-US", { 
      hour12: false, 
      hour: "2-digit", 
      minute: "2-digit" 
    }),
    price: data.close,
    open: data.open,
    high: data.high,
    low: data.low,
    close: data.close,
    volume: data.volume,
    // Candlestick body (for visualization)
    body: [data.open, data.close],
    // Wick data
    upperWick: data.high - Math.max(data.open, data.close),
    lowerWick: Math.min(data.open, data.close) - data.low,
    // Color determination
    isGreen: data.close >= data.open,
    index
  }));

  // Calculate price change
  const priceChange = priceData.length > 1 
    ? currentPrice - priceData[priceData.length - 2].close 
    : 0;
  const priceChangePercent = priceData.length > 1 
    ? (priceChange / priceData[priceData.length - 2].close) * 100 
    : 0;

  // Calculate technical levels
  const prices = priceData.slice(-20).map(d => d.close);
  const high = Math.max(...prices);
  const low = Math.min(...prices);
  const support = low + (high - low) * 0.236; // Fibonacci support
  const resistance = low + (high - low) * 0.764; // Fibonacci resistance

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white text-lg">{symbol} Price Chart</CardTitle>
            <div className="flex items-center space-x-4 mt-2">
              <div className="text-2xl font-mono text-white">
                {currentPrice.toFixed(symbol.includes("JPY") ? 2 : 5)}
              </div>
              <div className={`flex items-center space-x-1 ${
                priceChange >= 0 ? "text-green-400" : "text-red-400"
              }`}>
                <span className="text-sm">
                  {priceChange >= 0 ? "+" : ""}{priceChange.toFixed(5)}
                </span>
                <span className="text-sm">
                  ({priceChangePercent >= 0 ? "+" : ""}{priceChangePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
          
          {signal && (
            <div className="text-right">
              <Badge 
                variant={signal === "BUY" ? "default" : "destructive"}
                className="text-lg px-4 py-2"
              >
                {signal}
              </Badge>
              <div className="text-sm text-gray-400 mt-1">
                Strength: {signalStrength}%
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Chart Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-2">
            {["1M", "2M", "5M", "15M", "1H"].map((tf) => (
              <Button
                key={tf}
                size="sm"
                variant={timeframe === tf ? "default" : "outline"}
                onClick={() => setTimeframe(tf)}
                className="text-xs"
              >
                {tf}
              </Button>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={chartType === "line" ? "default" : "outline"}
              onClick={() => setChartType("line")}
              className="text-xs"
            >
              Line
            </Button>
            <Button
              size="sm"
              variant={chartType === "candlestick" ? "default" : "outline"}
              onClick={() => setChartType("candlestick")}
              className="text-xs"
            >
              Candles
            </Button>
          </div>
        </div>

        {/* Enhanced Price Chart with Candlesticks */}
        <div className="h-80 w-full">
          {chartType === "candlestick" ? (
            <CandlestickChart
              priceData={priceData}
              symbol={symbol}
              width={800}
              height={320}
            />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="time" 
                  stroke="#9CA3AF"
                  fontSize={12}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  stroke="#9CA3AF"
                  fontSize={12}
                  domain={['dataMin - 0.001', 'dataMax + 0.001']}
                  tickFormatter={(value) => value.toFixed(symbol.includes("JPY") ? 2 : 4)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#F9FAFB"
                  }}
                  formatter={(value: any) => [
                    value.toFixed(symbol.includes("JPY") ? 2 : 5),
                    "Price"
                  ]}
                  labelStyle={{ color: "#9CA3AF" }}
                />
                
                {/* Support and Resistance Lines */}
                <Line
                  type="monotone"
                  dataKey={() => support}
                  stroke="#EF4444"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                  name="Support"
                />
                <Line
                  type="monotone"
                  dataKey={() => resistance}
                  stroke="#10B981"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                  name="Resistance"
                />
                
                {/* Main Price Line */}
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={false}
                  name="Price"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Technical Levels */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-gray-700 p-2 rounded">
            <div className="text-gray-400">Support</div>
            <div className="text-red-400 font-mono">
              {support.toFixed(symbol.includes("JPY") ? 2 : 5)}
            </div>
          </div>
          <div className="bg-gray-700 p-2 rounded">
            <div className="text-gray-400">Resistance</div>
            <div className="text-green-400 font-mono">
              {resistance.toFixed(symbol.includes("JPY") ? 2 : 5)}
            </div>
          </div>
          <div className="bg-gray-700 p-2 rounded">
            <div className="text-gray-400">24h High</div>
            <div className="text-white font-mono">
              {high.toFixed(symbol.includes("JPY") ? 2 : 5)}
            </div>
          </div>
          <div className="bg-gray-700 p-2 rounded">
            <div className="text-gray-400">24h Low</div>
            <div className="text-white font-mono">
              {low.toFixed(symbol.includes("JPY") ? 2 : 5)}
            </div>
          </div>
        </div>

        {/* Chart Indicators */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            RSI: 68.5
          </Badge>
          <Badge variant="outline" className="text-xs">
            MACD: Bullish
          </Badge>
          <Badge variant="outline" className="text-xs">
            BB: Upper Band
          </Badge>
          <Badge variant="outline" className="text-xs">
            Volume: High
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}