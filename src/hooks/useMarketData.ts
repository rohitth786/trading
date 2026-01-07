"use client";

import { useState, useEffect, useCallback } from "react";
import { MarketData, Asset } from "@/types/trading";

export function useMarketData(symbol?: string) {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = useCallback(async (assetSymbol: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/market-data?symbol=${assetSymbol}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setMarketData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch market data");
      console.error("Market data fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAssets = useCallback(async (type?: string) => {
    try {
      const url = type ? `/api/market-data?type=${type}` : "/api/market-data";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAssets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch assets");
      console.error("Assets fetch error:", err);
    }
  }, []);

  const fetchMultipleAssets = useCallback(async (symbols: string[]) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("/api/market-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbols }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch multiple assets");
      console.error("Multiple assets fetch error:", err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-refresh market data
  useEffect(() => {
    if (!symbol) return;

    fetchMarketData(symbol);

    // Set up real-time updates every 5 seconds
    const interval = setInterval(() => {
      fetchMarketData(symbol);
    }, 5000);

    return () => clearInterval(interval);
  }, [symbol, fetchMarketData]);

  // Fetch assets on mount
  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return {
    marketData,
    assets,
    loading,
    error,
    fetchMarketData,
    fetchAssets,
    fetchMultipleAssets,
    refetch: () => symbol && fetchMarketData(symbol),
  };
}