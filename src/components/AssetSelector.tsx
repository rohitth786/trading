"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Asset, MarketData } from "@/types/trading";
import { CompleteOlympTradeAssets } from "@/lib/olymp-trade/complete-assets";

interface AssetSelectorProps {
  assets: Asset[];
  selectedAsset: string;
  onAssetSelect: (symbol: string) => void;
  marketData?: Record<string, MarketData>;
}

export function AssetSelector({ assets, selectedAsset, onAssetSelect, marketData }: AssetSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("ALL");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"name" | "change" | "volume">("name");

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("trading-favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (symbol: string) => {
    const newFavorites = favorites.includes(symbol)
      ? favorites.filter(f => f !== symbol)
      : [...favorites, symbol];
    
    setFavorites(newFavorites);
    localStorage.setItem("trading-favorites", JSON.stringify(newFavorites));
  };

  // Filter and sort assets
  const filteredAssets = assets
    .filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           asset.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "ALL" || asset.type === selectedType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "change":
          const changeA = marketData?.[a.symbol]?.changePercent || 0;
          const changeB = marketData?.[b.symbol]?.changePercent || 0;
          return changeB - changeA;
        case "volume":
          const volumeA = marketData?.[a.symbol]?.volume24h || 0;
          const volumeB = marketData?.[b.symbol]?.volume24h || 0;
          return volumeB - volumeA;
        default:
          return 0;
      }
    });

  const favoriteAssets = assets.filter(asset => favorites.includes(asset.symbol));

  const assetTypes = [
    { value: "ALL", label: "All Assets", count: assets.length },
    { value: "CURRENCY", label: "Currencies", count: assets.filter(a => a.type === "CURRENCY").length },
    { value: "INDEX", label: "Indices", count: assets.filter(a => a.type === "INDEX").length },
    { value: "COMMODITY", label: "Commodities", count: assets.filter(a => a.type === "COMMODITY").length },
    { value: "CRYPTO", label: "Crypto", count: assets.filter(a => a.type === "CRYPTO").length },
    { value: "STOCK", label: "Stocks", count: assets.filter(a => a.type === "STOCK").length },
    { value: "OTC", label: "OTC", count: assets.filter(a => a.type === "OTC").length },
  ];

  const formatPrice = (price: number, symbol: string) => {
    if (symbol.includes("JPY")) return price.toFixed(2);
    if (symbol.includes("BTC") || symbol.includes("ETH")) return price.toFixed(2);
    if (symbol.includes("/")) return price.toFixed(5);
    return price.toFixed(2);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}B`;
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`;
    return volume.toString();
  };

  const AssetRow = ({ asset }: { asset: Asset }) => {
    const data = marketData?.[asset.symbol];
    const isSelected = selectedAsset === asset.symbol;
    const isFavorite = favorites.includes(asset.symbol);

    return (
      <div
        className={`p-3 rounded-lg cursor-pointer transition-colors ${
          isSelected 
            ? "bg-blue-600 border border-blue-500" 
            : "bg-gray-700 hover:bg-gray-600 border border-gray-600"
        }`}
        onClick={() => onAssetSelect(asset.symbol)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(asset.symbol);
              }}
              className="p-1 h-6 w-6"
            >
              {isFavorite ? "⭐" : "☆"}
            </Button>
            
            <div>
              <div className="font-medium text-white">{asset.symbol}</div>
              <div className="text-xs text-gray-400">{asset.name}</div>
            </div>
          </div>
          
          <div className="text-right">
            {data && (
              <>
                <div className="font-mono text-white">
                  {formatPrice(data.currentPrice, asset.symbol)}
                </div>
                <div className={`text-xs ${
                  data.changePercent >= 0 ? "text-green-400" : "text-red-400"
                }`}>
                  {data.changePercent >= 0 ? "+" : ""}{data.changePercent.toFixed(2)}%
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <Badge variant="outline" className="text-xs">
            {asset.type}
          </Badge>
          
          {data && (
            <div className="text-xs text-gray-400">
              Vol: {formatVolume(data.volume24h)}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="pb-3">
        <CardTitle className="text-white">Asset Selection</CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Search and Filters */}
        <div className="space-y-4 mb-4">
          <Input
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
          
          <div className="flex space-x-2">
            <Select value={sortBy} onValueChange={(value: "name" | "change" | "volume") => setSortBy(value)}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white flex-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="name" className="text-white">Sort by Name</SelectItem>
                <SelectItem value="change" className="text-white">Sort by Change</SelectItem>
                <SelectItem value="volume" className="text-white">Sort by Volume</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Asset Tabs */}
        <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full">
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 bg-gray-700 mb-4">
            {assetTypes.map((type) => (
              <TabsTrigger 
                key={type.value} 
                value={type.value} 
                className="text-white text-xs"
              >
                {type.label}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {type.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Favorites Tab */}
          <TabsContent value="FAVORITES" className="mt-0">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {favoriteAssets.length > 0 ? (
                favoriteAssets.map((asset) => (
                  <AssetRow key={asset.symbol} asset={asset} />
                ))
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No favorite assets yet. Click ☆ to add favorites.
                </div>
              )}
            </div>
          </TabsContent>

          {/* All Other Tabs */}
          {assetTypes.filter(t => t.value !== "FAVORITES").map((type) => (
            <TabsContent key={type.value} value={type.value} className="mt-0">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredAssets.length > 0 ? (
                  filteredAssets.map((asset) => (
                    <AssetRow key={asset.symbol} asset={asset} />
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    No assets found matching your criteria.
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Total Assets:</span>
              <span className="text-white ml-2">{assets.length}</span>
            </div>
            <div>
              <span className="text-gray-400">Favorites:</span>
              <span className="text-white ml-2">{favorites.length}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}