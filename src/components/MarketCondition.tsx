"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MarketData } from "@/types/trading";

interface MarketConditionProps {
  marketData?: MarketData | null;
  selectedAsset: string;
}

export function MarketCondition({ marketData, selectedAsset }: MarketConditionProps) {
  if (!marketData) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Market Condition</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-2">Loading market data...</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate market condition based on price movement
  const priceHistory = marketData.priceHistory.slice(-20);
  const prices = priceHistory.map(d => d.close);
  
  // Calculate trend
  const firstPrice = prices[0];
  const lastPrice = prices[prices.length - 1];
  const overallChange = ((lastPrice - firstPrice) / firstPrice) * 100;
  
  // Calculate volatility
  const avgPrice = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const variance = prices.reduce((sum, price) => sum + Math.pow(price - avgPrice, 2), 0) / prices.length;
  const volatility = Math.sqrt(variance) / avgPrice * 100;
  
  // Determine market condition
  let marketCondition: "BULLISH" | "BEARISH" | "SIDEWAYS";
  let conditionColor: string;
  let conditionIcon: string;
  let strength: number;
  
  if (overallChange > 0.05) {
    marketCondition = "BULLISH";
    conditionColor = "text-green-400";
    conditionIcon = "📈";
    strength = Math.min(Math.abs(overallChange) * 20, 100);
  } else if (overallChange < -0.05) {
    marketCondition = "BEARISH";
    conditionColor = "text-red-400";
    conditionIcon = "📉";
    strength = Math.min(Math.abs(overallChange) * 20, 100);
  } else {
    marketCondition = "SIDEWAYS";
    conditionColor = "text-yellow-400";
    conditionIcon = "↔️";
    strength = 30;
  }
  
  // Volatility level
  let volatilityLevel: "LOW" | "MEDIUM" | "HIGH";
  let volatilityColor: string;
  
  if (volatility < 0.5) {
    volatilityLevel = "LOW";
    volatilityColor = "text-blue-400";
  } else if (volatility < 1.5) {
    volatilityLevel = "MEDIUM";
    volatilityColor = "text-yellow-400";
  } else {
    volatilityLevel = "HIGH";
    volatilityColor = "text-red-400";
  }
  
  // Volume analysis
  const recentVolume = marketData.priceHistory.slice(-5).reduce((sum, d) => sum + d.volume, 0) / 5;
  const avgVolume = marketData.priceHistory.reduce((sum, d) => sum + d.volume, 0) / marketData.priceHistory.length;
  const volumeRatio = recentVolume / avgVolume;
  
  let volumeLevel: "LOW" | "MEDIUM" | "HIGH";
  let volumeColor: string;
  
  if (volumeRatio < 0.8) {
    volumeLevel = "LOW";
    volumeColor = "text-gray-400";
  } else if (volumeRatio < 1.5) {
    volumeLevel = "MEDIUM";
    volumeColor = "text-blue-400";
  } else {
    volumeLevel = "HIGH";
    volumeColor = "text-green-400";
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg">Market Condition</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          
          {/* Main Market Condition */}
          <div className="text-center">
            <div className="text-4xl mb-2">{conditionIcon}</div>
            <div className={`text-2xl font-bold ${conditionColor} mb-2`}>
              {marketCondition}
            </div>
            <div className="text-sm text-gray-400 mb-3">
              {selectedAsset} Market Trend
            </div>
            <Progress value={strength} className="h-2 mb-2" />
            <div className="text-xs text-gray-400">
              Strength: {strength.toFixed(0)}%
            </div>
          </div>

          {/* Market Details */}
          <div className="space-y-4">
            
            {/* Trend Analysis */}
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Trend Direction</span>
                <Badge variant={
                  marketCondition === "BULLISH" ? "default" :
                  marketCondition === "BEARISH" ? "destructive" : "secondary"
                }>
                  {marketCondition}
                </Badge>
              </div>
              <div className="text-xs text-gray-400">
                Price Change: {overallChange >= 0 ? "+" : ""}{overallChange.toFixed(3)}%
              </div>
            </div>

            {/* Volatility */}
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Volatility</span>
                <Badge variant="outline" className={volatilityColor}>
                  {volatilityLevel}
                </Badge>
              </div>
              <div className="text-xs text-gray-400">
                Level: {volatility.toFixed(2)}%
              </div>
            </div>

            {/* Volume */}
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Volume</span>
                <Badge variant="outline" className={volumeColor}>
                  {volumeLevel}
                </Badge>
              </div>
              <div className="text-xs text-gray-400">
                Ratio: {volumeRatio.toFixed(2)}x
              </div>
            </div>

          </div>

          {/* Trading Recommendation */}
          <div className="bg-gray-700 p-3 rounded-lg border-l-4 border-blue-500">
            <div className="text-sm font-medium text-white mb-1">
              Trading Recommendation
            </div>
            <div className="text-xs text-gray-300">
              {marketCondition === "BULLISH" && "Look for BUY signals on pullbacks"}
              {marketCondition === "BEARISH" && "Look for SELL signals on rallies"}
              {marketCondition === "SIDEWAYS" && "Trade range breakouts carefully"}
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}