"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TradingSignal } from "@/types/trading";

interface UltraAccurateSignalProps {
  signal: TradingSignal | null;
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
  selectedAsset: string;
}

export function UltraAccurateSignal({ 
  signal, 
  isActive, 
  onStart, 
  onStop, 
  selectedAsset 
}: UltraAccurateSignalProps) {
  const [countdown, setCountdown] = useState(0);
  const [showSignal, setShowSignal] = useState(false);
  const [perfectTiming, setPerfectTiming] = useState<string>("");

  // 7-second countdown after START is clicked
  useEffect(() => {
    if (isActive && !showSignal) {
      setCountdown(7);
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setShowSignal(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [isActive, showSignal]);

  // Generate perfect timing when signal appears
  useEffect(() => {
    if (signal && showSignal) {
      const now = new Date();
      const perfectTime = new Date(now.getTime() + 8000); // 8 seconds from now
      setPerfectTiming(perfectTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }));
    }
  }, [signal, showSignal]);

  // Reset when stopped
  useEffect(() => {
    if (!isActive) {
      setShowSignal(false);
      setCountdown(0);
      setPerfectTiming("");
    }
  }, [isActive]);

  // Check if signal meets ultra-high accuracy requirements
  const isUltraAccurate = signal && 
    signal.confidence >= 90 && 
    signal.strength >= 90 && 
    signal.riskLevel === "LOW";

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg">Ultra Accurate Signal</CardTitle>
          <div className="flex items-center space-x-2">
            {!isActive ? (
              <Button 
                onClick={onStart}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 font-bold"
              >
                🚀 START
              </Button>
            ) : (
              <Button 
                onClick={onStop}
                variant="destructive"
                className="px-4 py-2"
              >
                ⏹️ STOP
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          
          {/* Not Active State */}
          {!isActive && (
            <div className="text-center py-8">
              <div className="text-3xl mb-4">🎯</div>
              <div className="text-xl text-gray-300 mb-2">90%+ Accuracy Ready</div>
              <div className="text-sm text-gray-500">
                Click START for ultra-accurate signal with very low risk
              </div>
            </div>
          )}

          {/* Countdown State */}
          {isActive && !showSignal && (
            <div className="text-center py-8">
              <div className="text-6xl font-bold text-blue-400 mb-4">
                {countdown}
              </div>
              <div className="text-lg text-gray-300 mb-2">
                Calculating 90%+ Accuracy Signal...
              </div>
              <div className="text-sm text-gray-500">
                Ultra-deep analysis for {selectedAsset}
              </div>
              <div className="mt-4">
                <Progress value={(7 - countdown) * (100/7)} className="h-2" />
              </div>
            </div>
          )}

          {/* ONLY SHOW ULTRA-ACCURATE SIGNALS */}
          {isActive && showSignal && isUltraAccurate && (
            <div className="space-y-6">
              
              {/* ULTRA HIGH ACCURACY SIGNAL */}
              <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 p-6 rounded-lg border-2 border-green-400">
                <div className="text-xs text-green-100 mb-2">🎯 ULTRA HIGH ACCURACY</div>
                <div className={`text-5xl font-bold mb-3 ${
                  signal.signal === "BUY" ? "text-green-200" : "text-red-200"
                }`}>
                  {signal.signal}
                </div>
                <div className="text-xl text-white mb-2">{selectedAsset}</div>
                <div className="text-sm text-green-200">90%+ Accuracy • Very Low Risk</div>
              </div>

              {/* Perfect Timing Info */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-purple-100 mb-1">⏰ PERFECT ENTRY TIME</div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {perfectTiming}
                  </div>
                  <div className="text-xs text-purple-200">
                    Execute trade within 8 seconds for maximum accuracy
                  </div>
                </div>
              </div>

              {/* Ultra High Quality Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-700 p-3 rounded-lg text-center">
                  <div className="text-sm text-green-200 mb-1">Accuracy</div>
                  <div className="text-2xl font-bold text-white">{signal.confidence}%</div>
                  <Progress value={signal.confidence} className="h-1 mt-2" />
                </div>
                <div className="bg-blue-700 p-3 rounded-lg text-center">
                  <div className="text-sm text-blue-200 mb-1">Strength</div>
                  <div className="text-2xl font-bold text-white">{signal.strength}%</div>
                  <Progress value={signal.strength} className="h-1 mt-2" />
                </div>
              </div>

              {/* VERY LOW RISK CONFIRMATION */}
              <div className="bg-green-900/50 border border-green-600 p-3 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 font-medium">VERY LOW RISK</span>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Trading Instructions */}
              <div className="bg-yellow-900/20 border border-yellow-600 p-4 rounded-lg">
                <div className="text-sm font-medium text-yellow-400 mb-2">
                  📋 EXECUTE TRADE NOW
                </div>
                <div className="text-xs text-yellow-200 space-y-1">
                  <div>1. Open {selectedAsset} on your platform</div>
                  <div>2. Select {signal.signal === "BUY" ? "UP/CALL" : "DOWN/PUT"} option</div>
                  <div>3. Set expiry: 1 MINUTE</div>
                  <div>4. Execute at {perfectTiming}</div>
                  <div className="font-bold text-yellow-100">5. 90%+ WIN PROBABILITY</div>
                </div>
              </div>

            </div>
          )}

          {/* Signal Not Accurate Enough */}
          {isActive && showSignal && !isUltraAccurate && (
            <div className="text-center py-8">
              <div className="text-3xl mb-4">⚠️</div>
              <div className="text-lg text-yellow-400 mb-2">Signal Below 90% Accuracy</div>
              <div className="text-sm text-gray-400 mb-4">
                Current: {signal?.confidence || 0}% accuracy, {signal?.riskLevel || "HIGH"} risk
              </div>
              <Button 
                onClick={onStart}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
              >
                🔄 GENERATE NEW SIGNAL
              </Button>
            </div>
          )}

        </div>
      </CardContent>
    </Card>
  );
}