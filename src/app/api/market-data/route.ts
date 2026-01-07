import { NextRequest, NextResponse } from "next/server";
import { MarketDataService } from "@/lib/market-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get("symbol");
    const type = searchParams.get("type");
    
    if (symbol) {
      // Get specific asset data
      const marketData = MarketDataService.getCurrentMarketData(symbol);
      return NextResponse.json(marketData);
    }
    
    if (type) {
      // Get assets by type
      const assets = MarketDataService.getAssetsByType(type.toUpperCase());
      return NextResponse.json(assets);
    }
    
    // Get all active assets
    const assets = MarketDataService.getActiveAssets();
    return NextResponse.json(assets);
    
  } catch (error) {
    console.error("Market data API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { symbols } = body;
    
    if (!symbols || !Array.isArray(symbols)) {
      return NextResponse.json(
        { error: "Invalid symbols array" },
        { status: 400 }
      );
    }
    
    // Get market data for multiple symbols
    const marketDataArray = symbols.map(symbol => 
      MarketDataService.getCurrentMarketData(symbol)
    );
    
    return NextResponse.json(marketDataArray);
    
  } catch (error) {
    console.error("Market data API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    );
  }
}