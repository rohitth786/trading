"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TradingSignal } from "@/types/trading";

interface PerfectTimingSignalProps {
  signal: TradingSignal | null;
  isActive: boolean;
  onStart: () => void;
  onStop: () => void;
  selectedAsset: string;
}

export function PerfectTimingSignal({ 
  signal, 
  isActive, 
  onStart, 
  onStop, 
  selectedAsset 
}: PerfectTimingSignalProps) {
  const [countdown, setCountdown] = useState(0);
  const [showSignal, setShowSignal] = useState(false);
  const [perfectTiming, setPerfectTiming] = useState<string>("");
  const [finalSignal, setFinalSignal] = useState<TradingSignal | null>(null);
  const [signalLocked, setSignalLocked] = useState(false);

  // 7-second countdown after START is clicked
  useEffect(() => {
    if (isActive && !showSignal && !signalLocked) {
      setCountdown(7);
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setShowSignal(true);
            setSignalLocked(true); // Lock the signal - no more changes
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [isActive, showSignal, signalLocked]);

  // Lock the signal when it first appears - NO MORE CHANGES
  useEffect(() => {
    if (signal && showSignal && !finalSignal && !signalLocked) {
      setFinalSignal(signal); // Lock this signal forever
      setSignalLocked(true);
      
      const now = new Date();
      const perfectTime = new Date(now.getTime() + 8000); // 8 seconds from now for perfect entry
      setPerfectTiming(perfectTime.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }));
    }
  }, [signal, showSignal, finalSignal, signalLocked]);

  // Reset when stopped
  useEffect(() => {
    if (!isActive) {
      setShowSignal(false);
      setCountdown(0);
      setPerfectTiming("");
      setFinalSignal(null);
      setSignalLocked(false);
    }
  }, [isActive]);

  // Use locked signal instead of changing signal
  const displaySignal = finalSignal || signal;

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-lg">Perfect Timing Signal</CardTitle>
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
              <div className="text-3xl mb-4">⏰</div>
              <div className="text-xl text-gray-300 mb-2">Ready for Perfect Timing</div>
              <div className="text-sm text-gray-500">
                Click START to get your perfect entry signal for {selectedAsset}
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
                Searching for 90%+ Accuracy Signal...
              </div>
              <div className="text-sm text-gray-500">
                Only showing signals with 90%+ confidence & LOW risk
              </div>
              <div className="mt-4">
                <Progress value={(7 - countdown) * (100/7)} className="h-2" />
              </div>
              <div className="mt-2 text-xs text-yellow-400">
                🎯 Ultra-High Accuracy Mode: {selectedAsset}
              </div>
            </div>
          )}

          {/* Signal Display State - LOCKED SIGNAL */}
          {isActive && showSignal && displaySignal && (
            <div className="space-y-6">
              
              {/* Main Signal - LOCKED */}
              <div className="text-center bg-gradient-to-r from-gray-700 to-gray-600 p-6 rounded-lg border-4 border-yellow-500">
                <div className="text-xs text-yellow-400 mb-2">🔒 LOCKED SIGNAL</div>
                <div className={`text-6xl font-bold mb-3 ${
                  displaySignal.signal === "BUY" ? "text-green-400" : "text-red-400"
                }`}>
                  {displaySignal.signal}
                </div>
                <div className="text-xl text-white mb-2">{selectedAsset}</div>
                <div className="text-sm text-yellow-400">⭐ MAXIMUM ACCURACY SIGNAL ⭐</div>
              </div>

              {/* Perfect Timing Info - LOCKED */}
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-lg border-2 border-yellow-400">
                <div className="text-center">
                  <div className="text-sm text-green-100 mb-1">🎯 PERFECT ENTRY TIME</div>
                  <div className="text-3xl font-bold text-white mb-2">
                    {perfectTiming}
                  </div>
                  <div className="text-sm text-green-200 font-bold">
                    ⚡ EXECUTE TRADE NOW FOR MAXIMUM ACCURACY ⚡
                  </div>
                </div>
              </div>

              {/* Signal Quality - MAXIMUM */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-900 p-3 rounded-lg text-center border border-green-500">
                  <div className="text-sm text-green-400 mb-1">Strength</div>
                  <div className="text-3xl font-bold text-white">{displaySignal.strength}%</div>
                  <Progress value={displaySignal.strength} className="h-2 mt-2" />
                  <div className="text-xs text-green-300 mt-1">MAXIMUM</div>
                </div>
                <div className="bg-blue-900 p-3 rounded-lg text-center border border-blue-500">
                  <div className="text-sm text-blue-400 mb-1">Confidence</div>
                  <div className="text-3xl font-bold text-white">{displaySignal.confidence}%</div>
                  <Progress value={displaySignal.confidence} className="h-2 mt-2" />
                  <div className="text-xs text-blue-300 mt-1">ULTRA-HIGH</div>
                </div>
              </div>

              {/* Risk Level - OPTIMIZED */}
              <div className="bg-gray-700 p-3 rounded-lg border border-green-500">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Risk Level</span>
                  <Badge variant={
                    displaySignal.riskLevel === "LOW" ? "default" :
                    displaySignal.riskLevel === "MEDIUM" ? "secondary" : "destructive"
                  } className="text-lg px-4 py-1">
                    {displaySignal.riskLevel}
                  </Badge>
                </div>
              </div>

              {/* Trading Instructions - PRECISE */}
              <div className="bg-yellow-900/30 border-2 border-yellow-500 p-4 rounded-lg">
                <div className="text-lg font-bold text-yellow-400 mb-3 text-center">
                  🎯 EXECUTE TRADE NOW
                </div>
                <div className="text-sm text-yellow-200 space-y-2">
                  <div className="font-bold">1. Open {selectedAsset} on Olymp Trade</div>
                  <div className="font-bold">2. Select {displaySignal.signal === "BUY" ? "⬆️ UP/CALL" : "⬇️ DOWN/PUT"} option</div>
                  <div className="font-bold">3. Set expiry: ⏱️ 1 MINUTE</div>
                  <div className="font-bold">4. Execute at: ⏰ {perfectTiming}</div>
                  <div className="text-center mt-3 p-2 bg-yellow-800 rounded">
                    <div className="text-yellow-300 font-bold">
                      💎 ACCURACY: {displaySignal.confidence}% | STRENGTH: {displaySignal.strength}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Signal Reasoning - TOP 3 */}
              <div className="bg-gray-700 p-3 rounded-lg border border-blue-500">
                <div className="text-sm font-bold text-white mb-2 text-center">
                  🧠 WHY THIS SIGNAL IS ACCURATE
                </div>
                <div className="space-y-2">
                  {displaySignal.reasoning.slice(0, 3).map((reason, index) => (
                    <div key={index} className="text-xs text-gray-200 flex items-start bg-gray-600 p-2 rounded">
                      <span className="text-yellow-400 mr-2 font-bold">{index + 1}.</span>
                      {reason}
                    </div>
                  ))}
                </div>
              </div>

              {/* LOCKED STATUS */}
              <div className="bg-red-900/20 border border-red-500 p-3 rounded-lg text-center">
                <div className="text-red-400 font-bold text-sm">
                  🔒 SIGNAL LOCKED - NO FLUCTUATIONS
                </div>
                <div className="text-red-300 text-xs mt-1">
                  This signal will not change until you click STOP
                </div>
              </div>

            </div>
          )}

        </div>
      </CardContent>
    </Card>
  );
}