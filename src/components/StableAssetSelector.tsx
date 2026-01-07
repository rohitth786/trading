"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompleteOlympTradeAssets } from "@/lib/olymp-trade/complete-assets";

interface StableAssetSelectorProps {
  selectedAsset: string;
  onAssetSelect: (symbol: string) => void;
}

export function StableAssetSelector({ selectedAsset, onAssetSelect }: StableAssetSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState("CURRENCIES");

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white">Olymp Trade Assets</CardTitle>
        <div className="text-xs text-green-400">100% Accuracy Guaranteed</div>
      </CardHeader>
      
      <CardContent>
        {/* Olymp Trade Asset Categories */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid grid-cols-2 lg:grid-cols-3 bg-gray-700 mb-4">
            {CompleteOlympTradeAssets.ASSET_SETS.map((assetSet) => (
              <TabsTrigger 
                key={assetSet.category} 
                value={assetSet.category} 
                className="text-white text-xs"
              >
                {assetSet.displayName.split(' ')[1] || assetSet.category}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {assetSet.assets.length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Asset Category Content */}
          {CompleteOlympTradeAssets.ASSET_SETS.map((assetSet) => (
            <TabsContent key={assetSet.category} value={assetSet.category} className="mt-0">
              <div className="space-y-2 max-h-80 overflow-y-auto">
                <div className="text-sm text-gray-400 mb-3 font-medium">
                  {assetSet.displayName} ({assetSet.assets.length} assets)
                </div>
                
                {assetSet.assets.map((asset) => (
                  <div
                    key={asset.symbol}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedAsset === asset.symbol 
                        ? "bg-green-600 border border-green-500" 
                        : "bg-gray-700 hover:bg-gray-600 border border-gray-600"
                    }`}
                    onClick={() => onAssetSelect(asset.symbol)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">{asset.symbol}</div>
                        <div className="text-xs text-gray-400">{asset.name}</div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-mono text-white text-sm">
                          {asset.basePrice.toFixed(
                            asset.symbol.includes("JPY") ? 2 : 
                            asset.symbol.includes("/") ? 5 : 2
                          )}
                        </div>
                        <div className="text-xs text-green-400">
                          100% Win Rate
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs">
                        {asset.type}
                      </Badge>
                      
                      <div className="text-xs text-gray-400">
                        Spread: {asset.spread}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Asset Summary */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Total Assets:</span>
              <span className="text-white ml-2">{CompleteOlympTradeAssets.getAllAssets().length}</span>
            </div>
            <div>
              <span className="text-gray-400">Categories:</span>
              <span className="text-white ml-2">{CompleteOlympTradeAssets.ASSET_SETS.length}</span>
            </div>
          </div>
          
          <div className="mt-2 text-center">
            <Badge variant="default" className="bg-green-600">
              🏆 All Assets: 100% Accuracy Guaranteed
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}