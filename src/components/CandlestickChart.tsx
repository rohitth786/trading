"use client";

import { PriceData } from "@/types/trading";

interface CandlestickChartProps {
  priceData: PriceData[];
  symbol: string;
  width?: number;
  height?: number;
}

export function CandlestickChart({ priceData, symbol, width = 800, height = 300 }: CandlestickChartProps) {
  const data = priceData.slice(-50); // Last 50 candles
  
  if (data.length === 0) {
    return (
      <div className="w-full h-full bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-gray-400">Loading chart data...</div>
      </div>
    );
  }

  // Calculate chart dimensions
  const padding = 40;
  const chartWidth = width - (padding * 2);
  const chartHeight = height - (padding * 2);
  
  // Find price range
  const allPrices: number[] = [];
  data.forEach(d => {
    allPrices.push(d.high, d.low);
  });
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const priceRange = maxPrice - minPrice;
  
  // Scale functions
  const scaleX = (index: number) => (index / (data.length - 1)) * chartWidth + padding;
  const scaleY = (price: number) => chartHeight - ((price - minPrice) / priceRange) * chartHeight + padding;
  
  const candleWidth = Math.max(chartWidth / data.length * 0.6, 2);

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg p-4">
      <svg width={width} height={height} className="w-full h-full">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Price levels */}
        {[0.25, 0.5, 0.75].map((ratio, index) => {
          const y = padding + (chartHeight * ratio);
          const price = maxPrice - (priceRange * ratio);
          return (
            <g key={index}>
              <line 
                x1={padding} 
                y1={y} 
                x2={width - padding} 
                y2={y} 
                stroke="#4B5563" 
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              <text 
                x={width - padding + 5} 
                y={y + 4} 
                fill="#9CA3AF" 
                fontSize="10"
              >
                {price.toFixed(symbol.includes("JPY") ? 2 : 4)}
              </text>
            </g>
          );
        })}
        
        {/* Candlesticks */}
        {data.map((candle, index) => {
          const x = scaleX(index);
          const openY = scaleY(candle.open);
          const closeY = scaleY(candle.close);
          const highY = scaleY(candle.high);
          const lowY = scaleY(candle.low);
          
          const isGreen = candle.close >= candle.open;
          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.abs(closeY - openY);
          
          const color = isGreen ? "#10B981" : "#EF4444";
          
          return (
            <g key={index}>
              {/* Wick */}
              <line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={color}
                strokeWidth="1"
              />
              
              {/* Body */}
              <rect
                x={x - candleWidth/2}
                y={bodyTop}
                width={candleWidth}
                height={Math.max(bodyHeight, 1)}
                fill={isGreen ? color : "transparent"}
                stroke={color}
                strokeWidth="1"
              />
            </g>
          );
        })}
        
        {/* Current price line */}
        {data.length > 0 && (
          <line
            x1={padding}
            y1={scaleY(data[data.length - 1].close)}
            x2={width - padding}
            y2={scaleY(data[data.length - 1].close)}
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
        )}
        
        {/* Time labels */}
        {data.map((candle, index) => {
          if (index % 10 === 0) { // Show every 10th time label
            const x = scaleX(index);
            const time = new Date(candle.timestamp).toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit"
            });
            return (
              <text
                key={index}
                x={x}
                y={height - 10}
                fill="#9CA3AF"
                fontSize="10"
                textAnchor="middle"
              >
                {time}
              </text>
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
}