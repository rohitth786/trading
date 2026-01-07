"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TradingSignal } from "@/types/trading";

interface SignalPanelProps {
  signal: TradingSignal | null;
  loading?: boolean;
  onRefresh?: () => void;
}

export function SignalPanel({ signal, loading = false, onRefresh }: SignalPanelProps) {
  const [countdown, setCountdown] = useState(120);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Countdown timer for next signal
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => prev > 0 ? prev - 1 : 120);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Play sound for new signals
  useEffect(() => {
    if (signal && soundEnabled) {
      // In a real app, you would play an audio file here
      console.log(`🔊 New ${signal.signal} signal for ${signal.asset}`);
    }
  }, [signal, soundEnabled]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSignalColor = (signalType: string) => {
    switch (signalType) {
      case "BUY": return "text-green-400";
      case "SELL": return "text-red-400";
      default: return "text-yellow-400";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "LOW": return "text-green-400";
      case "MEDIUM": return "text-yellow-400";
      case "HIGH": return "text-red-400";
      default: return "text-gray-400";
    }
  };

  if (loading) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Generating Signal...</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Analyzing market conditions...</p>
        </CardContent>
      </Card>
    );
  }

  if (!signal) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">1-Minute Signal Ready</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-gray-400">Start signals to view live 1-minute trading signals</p>
        </CardContent>
      </Card>
    );
  }



  return (
    <div className="space-y-6">
      {/* Main Signal Display */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Current Signal</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={onRefresh}
                className="text-xs"
              >
                Refresh
              </Button>
              <Button
                size="sm"
                variant={soundEnabled ? "default" : "outline"}
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-xs"
              >
                {soundEnabled ? "🔊" : "🔇"}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="text-center space-y-4">
            {/* Signal Type */}
            <div className={`text-6xl font-bold ${getSignalColor(signal.signal)}`}>
              {signal.signal}
            </div>
            
            {/* Asset */}
            <div className="text-xl text-white font-medium">
              {signal.asset}
            </div>
            
            {/* Signal Strength */}
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Signal Strength</div>
              <Progress value={signal.strength} className="h-3" />
              <div className="text-lg font-mono text-white">{signal.strength}%</div>
            </div>
            
            {/* Confidence Level */}
            <div className="space-y-2">
              <div className="text-sm text-gray-400">Confidence Level</div>
              <Progress value={signal.confidence} className="h-2" />
              <div className="text-sm font-mono text-white">{signal.confidence}%</div>
            </div>
            
            {/* Risk Assessment */}
            <div className="flex items-center justify-center space-x-4">
              <div className="text-sm text-gray-400">Risk Level:</div>
              <Badge variant="outline" className={getRiskColor(signal.riskLevel)}>
                {signal.riskLevel}
              </Badge>
            </div>
            
            {/* Next Signal Countdown */}
            <div className="pt-4 border-t border-gray-700">
              <div className="text-sm text-gray-400">Next Signal Update</div>
              <div className="text-2xl font-mono text-blue-400">
                {formatTime(countdown)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Signal Reasoning */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Signal Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Reasoning</h4>
              <ul className="space-y-1">
                {signal.reasoning.map((reason, index) => (
                  <li key={index} className="text-sm text-gray-400 flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-3 border-t border-gray-700">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Trade Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Timeframe:</span>
                  <span className="text-white ml-2">{signal.timeframe}</span>
                </div>
                <div>
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white ml-2">{signal.expectedDuration}s</span>
                </div>
                <div>
                  <span className="text-gray-400">Timestamp:</span>
                  <span className="text-white ml-2">
                    {new Date(signal.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Valid:</span>
                  <Badge variant={signal.confidence > 70 ? "default" : "destructive"} className="ml-2">
                    {signal.confidence > 70 ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Indicators Summary */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg">Indicator Consensus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {signal.indicators.map((indicator, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-white min-w-[80px]">
                    {indicator.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {typeof indicator.value === "number" 
                      ? indicator.value.toFixed(2) 
                      : indicator.value
                    }
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={
                      indicator.signal === "BUY" ? "default" :
                      indicator.signal === "SELL" ? "destructive" : "secondary"
                    }
                    className="text-xs"
                  >
                    {indicator.signal}
                  </Badge>
                  {indicator.strength > 0 && (
                    <div className="w-16">
                      <Progress value={indicator.strength} className="h-1" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Overall Consensus */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Overall Consensus</span>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-white">
                  {signal.indicators.filter(i => i.signal === "BUY").length} BUY / {" "}
                  {signal.indicators.filter(i => i.signal === "SELL").length} SELL / {" "}
                  {signal.indicators.filter(i => i.signal === "NEUTRAL").length} NEUTRAL
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}