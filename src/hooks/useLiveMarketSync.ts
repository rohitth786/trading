"use client";

import { useState, useEffect, useCallback } from "react";
import { MarketData } from "@/types/trading";

export function useLiveMarketSync(symbol: string) {
  const [livePrice, setLivePrice] = useState<number>(0);
  const [priceChange, setPriceChange] = useState<number>(0);
  const [isLive, setIsLive] = useState(false);
  const [marketSession, setMarketSession] = useState<string>("");
  const [lastTick, setLastTick] = useState<number>(0);

  // Real-time price simulation with market session awareness
  const updateLivePrice = useCallback(async () => {
    try {
      // Fetch current market data
      const response = await fetch(`/api/market-data?symbol=${symbol}`);
      if (!response.ok) return;
      
      const data: MarketData = await response.json();
      
      // Calculate real-time price movement
      const currentHour = new Date().getUTCHours();
      const currentMinute = new Date().getMinutes();
      
      // Market session detection
      let session = "";
      let volatilityMultiplier = 1.0;
      
      if (currentHour >= 13 && currentHour <= 17) {
        session = "LONDON-NY OVERLAP";
        volatilityMultiplier = 2.0;
      } else if (currentHour >= 8 && currentHour <= 17) {
        session = "LONDON SESSION";
        volatilityMultiplier = 1.5;
      } else if (currentHour >= 13 && currentHour <= 22) {
        session = "NEW YORK SESSION";
        volatilityMultiplier = 1.5;
      } else if (currentHour >= 22 || currentHour <= 7) {
        session = "SYDNEY SESSION";
        volatilityMultiplier = 0.8;
      } else {
        session = "TOKYO SESSION";
        volatilityMultiplier = 1.0;
      }
      
      setMarketSession(session);
      
      // Generate live price tick
      const baseVolatility = symbol.includes("JPY") ? 0.05 : 
                            symbol.includes("BTC") ? 50 : 
                            symbol.includes("GOLD") ? 0.8 : 0.0005;
      
      const tickVolatility = baseVolatility * volatilityMultiplier;
      
      // News impact simulation (every 30 minutes)
      let newsImpact = 0;
      if (currentMinute === 0 || currentMinute === 30) {
        newsImpact = (Math.random() - 0.5) * tickVolatility * 3;
      }
      
      // Trend continuation bias
      const trendBias = priceChange > 0 ? tickVolatility * 0.1 : -tickVolatility * 0.1;
      
      // Final price calculation
      const tickChange = (Math.random() - 0.5) * tickVolatility + newsImpact + trendBias;
      const newLivePrice = Math.max(data.currentPrice + tickChange, 0.0001);
      
      // Update states
      setLivePrice(newLivePrice);
      setPriceChange(newLivePrice - data.currentPrice);
      setIsLive(true);
      setLastTick(Date.now());
      
    } catch (error) {
      console.error("Live price update error:", error);
      setIsLive(false);
    }
  }, [symbol, priceChange]);

  // Start live price updates
  useEffect(() => {
    if (!symbol) return;

    // Initial price fetch
    updateLivePrice();

    // Real-time updates every 1 second
    const interval = setInterval(updateLivePrice, 1000);

    return () => clearInterval(interval);
  }, [symbol, updateLivePrice]);

  // Market status monitoring
  useEffect(() => {
    const statusInterval = setInterval(() => {
      const now = Date.now();
      const timeSinceLastTick = now - lastTick;
      
      // Mark as offline if no updates for 5 seconds
      if (timeSinceLastTick > 5000) {
        setIsLive(false);
      }
    }, 2000);

    return () => clearInterval(statusInterval);
  }, [lastTick]);

  // Format price for display
  const formatPrice = (price: number): string => {
    if (symbol.includes("JPY")) return price.toFixed(2);
    if (symbol.includes("BTC") || symbol.includes("ETH")) return price.toFixed(2);
    if (symbol.includes("/")) return price.toFixed(5);
    return price.toFixed(2);
  };

  // Get price change color
  const getPriceChangeColor = (): string => {
    if (priceChange > 0) return "text-green-400";
    if (priceChange < 0) return "text-red-400";
    return "text-gray-400";
  };

  // Get market session color
  const getSessionColor = (): string => {
    switch (marketSession) {
      case "LONDON-NY OVERLAP": return "text-red-400";
      case "LONDON SESSION": return "text-blue-400";
      case "NEW YORK SESSION": return "text-green-400";
      case "SYDNEY SESSION": return "text-yellow-400";
      case "TOKYO SESSION": return "text-purple-400";
      default: return "text-gray-400";
    }
  };

  return {
    livePrice,
    priceChange,
    isLive,
    marketSession,
    lastTick,
    formatPrice,
    getPriceChangeColor,
    getSessionColor,
    updateLivePrice
  };
}