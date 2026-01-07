import { Asset, MarketData, PriceData } from "@/types/trading";
import { LiveMarketFeed } from "@/lib/live-market-feed";

export class MarketDataService {
  
  // Olymp Trade Assets
  static readonly ASSETS: Asset[] = [
    // Major Currency Pairs
    { symbol: "EUR/USD", name: "Euro vs US Dollar", type: "CURRENCY", category: "Major", isActive: true, minTradeAmount: 1, maxTradeAmount: 5000, spread: 0.00015 },
    { symbol: "GBP/USD", name: "British Pound vs US Dollar", type: "CURRENCY", category: "Major", isActive: true, minTradeAmount: 1, maxTradeAmount: 5000, spread: 0.00020 },
    { symbol: "USD/JPY", name: "US Dollar vs Japanese Yen", type: "CURRENCY", category: "Major", isActive: true, minTradeAmount: 1, maxTradeAmount: 5000, spread: 0.015 },
    { symbol: "USD/CHF", name: "US Dollar vs Swiss Franc", type: "CURRENCY", category: "Major", isActive: true, minTradeAmount: 1, maxTradeAmount: 5000, spread: 0.00018 },
    { symbol: "AUD/USD", name: "Australian Dollar vs US Dollar", type: "CURRENCY", category: "Major", isActive: true, minTradeAmount: 1, maxTradeAmount: 5000, spread: 0.00022 },
    { symbol: "USD/CAD", name: "US Dollar vs Canadian Dollar", type: "CURRENCY", category: "Major", isActive: true, minTradeAmount: 1, maxTradeAmount: 5000, spread: 0.00025 },
    { symbol: "NZD/USD", name: "New Zealand Dollar vs US Dollar", type: "CURRENCY", category: "Major", isActive: true, minTradeAmount: 1, maxTradeAmount: 5000, spread: 0.00030 },
    
    // Minor Currency Pairs
    { symbol: "EUR/GBP", name: "Euro vs British Pound", type: "CURRENCY", category: "Minor", isActive: true, minTradeAmount: 1, maxTradeAmount: 3000, spread: 0.00025 },
    { symbol: "EUR/JPY", name: "Euro vs Japanese Yen", type: "CURRENCY", category: "Minor", isActive: true, minTradeAmount: 1, maxTradeAmount: 3000, spread: 0.025 },
    { symbol: "GBP/JPY", name: "British Pound vs Japanese Yen", type: "CURRENCY", category: "Minor", isActive: true, minTradeAmount: 1, maxTradeAmount: 3000, spread: 0.035 },
    
    // Indices
    { symbol: "S&P500", name: "S&P 500 Index", type: "INDEX", category: "US Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 10000, spread: 0.5 },
    { symbol: "NASDAQ", name: "NASDAQ 100", type: "INDEX", category: "US Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 10000, spread: 0.8 },
    { symbol: "DOW", name: "Dow Jones Industrial Average", type: "INDEX", category: "US Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 10000, spread: 1.0 },
    { symbol: "FTSE100", name: "FTSE 100 Index", type: "INDEX", category: "European Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 8000, spread: 1.2 },
    { symbol: "DAX", name: "DAX 30", type: "INDEX", category: "European Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 8000, spread: 1.5 },
    { symbol: "CAC40", name: "CAC 40", type: "INDEX", category: "European Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 8000, spread: 1.3 },
    { symbol: "NIKKEI", name: "Nikkei 225", type: "INDEX", category: "Asian Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 8000, spread: 2.0 },
    
    // Commodities
    { symbol: "GOLD", name: "Gold", type: "COMMODITY", category: "Precious Metals", isActive: true, minTradeAmount: 1, maxTradeAmount: 5000, spread: 0.30 },
    { symbol: "SILVER", name: "Silver", type: "COMMODITY", category: "Precious Metals", isActive: true, minTradeAmount: 1, maxTradeAmount: 3000, spread: 0.02 },
    { symbol: "OIL", name: "Crude Oil (WTI)", type: "COMMODITY", category: "Energy", isActive: true, minTradeAmount: 1, maxTradeAmount: 5000, spread: 0.05 },
    { symbol: "BRENT", name: "Brent Oil", type: "COMMODITY", category: "Energy", isActive: true, minTradeAmount: 1, maxTradeAmount: 5000, spread: 0.05 },
    { symbol: "NATGAS", name: "Natural Gas", type: "COMMODITY", category: "Energy", isActive: true, minTradeAmount: 1, maxTradeAmount: 3000, spread: 0.003 },
    
    // Cryptocurrencies
    { symbol: "BTC/USD", name: "Bitcoin", type: "CRYPTO", category: "Major Crypto", isActive: true, minTradeAmount: 1, maxTradeAmount: 2000, spread: 50 },
    { symbol: "ETH/USD", name: "Ethereum", type: "CRYPTO", category: "Major Crypto", isActive: true, minTradeAmount: 1, maxTradeAmount: 2000, spread: 2 },
    { symbol: "LTC/USD", name: "Litecoin", type: "CRYPTO", category: "Alt Crypto", isActive: true, minTradeAmount: 1, maxTradeAmount: 1000, spread: 0.5 },
    { symbol: "XRP/USD", name: "Ripple", type: "CRYPTO", category: "Alt Crypto", isActive: true, minTradeAmount: 1, maxTradeAmount: 1000, spread: 0.001 },
    
    // OTC (Over The Counter)
    { symbol: "OTC_EUR/USD", name: "EUR/USD OTC", type: "OTC", category: "OTC Currency", isActive: true, minTradeAmount: 1, maxTradeAmount: 3000, spread: 0.0003 },
    { symbol: "OTC_GBP/USD", name: "GBP/USD OTC", type: "OTC", category: "OTC Currency", isActive: true, minTradeAmount: 1, maxTradeAmount: 3000, spread: 0.0004 },
    { symbol: "OTC_USD/JPY", name: "USD/JPY OTC", type: "OTC", category: "OTC Currency", isActive: true, minTradeAmount: 1, maxTradeAmount: 3000, spread: 0.03 },
    { symbol: "OTC_GOLD", name: "Gold OTC", type: "OTC", category: "OTC Commodity", isActive: true, minTradeAmount: 1, maxTradeAmount: 2000, spread: 0.50 },
    { symbol: "OTC_OIL", name: "Oil OTC", type: "OTC", category: "OTC Commodity", isActive: true, minTradeAmount: 1, maxTradeAmount: 2000, spread: 0.08 },
    
    // Stocks
    { symbol: "AAPL", name: "Apple Inc.", type: "STOCK", category: "Tech Stocks", isActive: true, minTradeAmount: 1, maxTradeAmount: 1000, spread: 0.02 },
    { symbol: "GOOGL", name: "Alphabet Inc.", type: "STOCK", category: "Tech Stocks", isActive: true, minTradeAmount: 1, maxTradeAmount: 1000, spread: 0.05 },
    { symbol: "MSFT", name: "Microsoft Corporation", type: "STOCK", category: "Tech Stocks", isActive: true, minTradeAmount: 1, maxTradeAmount: 1000, spread: 0.03 },
    { symbol: "TSLA", name: "Tesla Inc.", type: "STOCK", category: "Auto Stocks", isActive: true, minTradeAmount: 1, maxTradeAmount: 1000, spread: 0.10 },
    { symbol: "AMZN", name: "Amazon.com Inc.", type: "STOCK", category: "Tech Stocks", isActive: true, minTradeAmount: 1, maxTradeAmount: 1000, spread: 0.08 },
    
    // Composite and Special Indices
    { symbol: "ASIA_COMPOSITE", name: "Asia Composite Index", type: "INDEX", category: "Composite Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 15000, spread: 2.5 },
    { symbol: "COMPOUND_INDEX", name: "Compound Index", type: "INDEX", category: "Composite Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 12000, spread: 2.0 },
    { symbol: "CRYPTO_COMPOSITE", name: "Crypto Composite Index", type: "INDEX", category: "Crypto Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 8000, spread: 5.0 },
    { symbol: "EUROPE_COMPOSITE", name: "Europe Composite Index", type: "INDEX", category: "Composite Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 15000, spread: 2.8 },
    { symbol: "ASTRO_INDEX", name: "Astro Index", type: "INDEX", category: "Special Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 10000, spread: 3.0 },
    { symbol: "MAHA_JANTAR", name: "Maha Jantar Index", type: "INDEX", category: "Special Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 12000, spread: 2.5 },
    { symbol: "MOONCH_INDEX", name: "Moonch Index", type: "INDEX", category: "Special Indices", isActive: true, minTradeAmount: 1, maxTradeAmount: 8000, spread: 3.5 }
  ];
  
  // Base prices for simulation
  private static readonly BASE_PRICES: Record<string, number> = {
    "EUR/USD": 1.0845,
    "GBP/USD": 1.2634,
    "USD/JPY": 149.85,
    "USD/CHF": 0.8756,
    "AUD/USD": 0.6523,
    "USD/CAD": 1.3654,
    "NZD/USD": 0.5987,
    "EUR/GBP": 0.8589,
    "EUR/JPY": 162.45,
    "GBP/JPY": 189.23,
    "S&P500": 4567.89,
    "NASDAQ": 14234.56,
    "DOW": 34567.12,
    "FTSE100": 7456.78,
    "DAX": 15678.90,
    "CAC40": 7234.56,
    "NIKKEI": 32456.78,
    "GOLD": 2034.56,
    "SILVER": 24.78,
    "OIL": 78.45,
    "BRENT": 82.34,
    "NATGAS": 3.456,
    "BTC/USD": 43567.89,
    "ETH/USD": 2345.67,
    "LTC/USD": 78.90,
    "XRP/USD": 0.5678,
    "OTC_EUR/USD": 1.0842,
    "OTC_GBP/USD": 1.2631,
    "OTC_USD/JPY": 149.82,
    "OTC_GOLD": 2033.45,
    "OTC_OIL": 78.42,
    "AAPL": 189.45,
    "GOOGL": 134.56,
    "MSFT": 378.90,
    "TSLA": 234.67,
    "AMZN": 145.78,
    
    // Composite and Special Indices Prices
    "ASIA_COMPOSITE": 8567.89,
    "COMPOUND_INDEX": 12345.67,
    "CRYPTO_COMPOSITE": 4567.12,
    "EUROPE_COMPOSITE": 9876.54,
    "ASTRO_INDEX": 6789.23,
    "MAHA_JANTAR": 11234.56,
    "MOONCH_INDEX": 7654.32
  };
  
  // ULTRA-REALISTIC PRICE DATA GENERATION
  static generatePriceData(symbol: string, periods: number = 100): PriceData[] {
    const basePrice = this.BASE_PRICES[symbol] || 100;
    const asset = this.ASSETS.find(a => a.symbol === symbol);
    const volatility = this.getVolatilityForAsset(asset?.type || "CURRENCY");
    
    const priceData: PriceData[] = [];
    let currentPrice = basePrice;
    const now = Date.now();
    
    // Market session influence
    const currentHour = new Date().getUTCHours();
    let sessionVolatility = volatility;
    
    // Adjust volatility based on market sessions
    if (currentHour >= 13 && currentHour <= 17) {
      sessionVolatility *= 1.5; // London-NY overlap
    } else if (currentHour >= 8 && currentHour <= 22) {
      sessionVolatility *= 1.2; // Active sessions
    } else {
      sessionVolatility *= 0.7; // Quiet sessions
    }
    
    // Generate trend bias
    const trendBias = (Math.random() - 0.5) * 0.1; // Overall trend direction
    
    for (let i = periods; i >= 0; i--) {
      const timestamp = now - (i * 60 * 1000); // 1 minute intervals
      
      // Enhanced realistic OHLC generation
      const trendInfluence = trendBias * (periods - i) / periods; // Gradual trend
      const randomChange = (Math.random() - 0.5) * sessionVolatility * currentPrice;
      const totalChange = randomChange + (trendInfluence * currentPrice);
      
      const open = currentPrice;
      
      // More realistic close price with trend bias
      let close = Math.max(open + totalChange, 0.0001);
      
      // Ensure price doesn't move too dramatically
      const maxMove = currentPrice * sessionVolatility * 2;
      close = Math.max(Math.min(close, currentPrice + maxMove), currentPrice - maxMove);
      
      // Generate realistic high and low
      const volatilityRange = sessionVolatility * currentPrice * 0.8;
      const baseHigh = Math.max(open, close);
      const baseLow = Math.min(open, close);
      
      const high = baseHigh + (Math.random() * volatilityRange * 0.6);
      const low = Math.max(baseLow - (Math.random() * volatilityRange * 0.6), 0.0001);
      
      // Enhanced volume with session influence
      const baseVolume = this.generateVolume(asset?.type || "CURRENCY");
      const priceMovement = Math.abs(close - open) / open;
      const volumeMultiplier = 1 + (priceMovement * 10); // Higher volume on bigger moves
      const sessionVolumeMultiplier = currentHour >= 8 && currentHour <= 22 ? 1.3 : 0.8;
      
      const volume = Math.floor(baseVolume * volumeMultiplier * sessionVolumeMultiplier);
      
      priceData.push({
        timestamp,
        open,
        high,
        low,
        close,
        volume
      });
      
      currentPrice = close;
    }
    
    return priceData;
  }
  
  // Get volatility based on asset type
  private static getVolatilityForAsset(type: string): number {
    switch (type) {
      case "CURRENCY": return 0.002;
      case "INDEX": return 0.015;
      case "COMMODITY": return 0.025;
      case "CRYPTO": return 0.05;
      case "STOCK": return 0.03;
      case "OTC": return 0.003;
      default: return 0.01;
    }
  }
  
  // Generate realistic volume
  private static generateVolume(type: string): number {
    const baseVolume = {
      "CURRENCY": 1000000,
      "INDEX": 500000,
      "COMMODITY": 200000,
      "CRYPTO": 100000,
      "STOCK": 300000,
      "OTC": 150000
    }[type] || 100000;
    
    return Math.floor(baseVolume * (0.5 + Math.random()));
  }
  
  // Get LIVE market data for an asset
  static getCurrentMarketData(symbol: string): MarketData {
    // Initialize live feeds if not started
    LiveMarketFeed.startLiveSync();
    
    // Get real-time live market data
    const liveData = LiveMarketFeed.getLiveMarketData(symbol);
    
    // If no live data available, generate realistic backup
    if (!liveData.priceHistory.length) {
      const backupData = this.generatePriceData(symbol, 100);
      return {
        ...liveData,
        priceHistory: backupData
      };
    }
    
    return liveData;
  }
  
  // Get all active assets
  static getActiveAssets(): Asset[] {
    return this.ASSETS.filter(asset => asset.isActive);
  }
  
  // Get assets by type
  static getAssetsByType(type: string): Asset[] {
    return this.ASSETS.filter(asset => asset.type === type && asset.isActive);
  }
  
  // Get asset by symbol
  static getAsset(symbol: string): Asset | undefined {
    return this.ASSETS.find(asset => asset.symbol === symbol);
  }
  
  // Simulate real-time price updates
  static updatePrice(currentPrice: number, volatility: number = 0.002): number {
    const change = (Math.random() - 0.5) * volatility * currentPrice;
    return Math.max(currentPrice + change, 0.0001);
  }
  
  // Check if market is open (simplified - always open for demo)
  static isMarketOpen(symbol: string): boolean {
    const asset = this.getAsset(symbol);
    if (!asset) return false;
    
    // For demo purposes, all markets are always open
    // In real implementation, this would check actual market hours
    return asset.isActive;
  }
  
  // Get market status
  static getMarketStatus(): { isOpen: boolean; nextOpen?: number; nextClose?: number } {
    // Simplified for demo - always open
    return { isOpen: true };
  }
}