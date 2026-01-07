import { PriceData, MarketData } from "@/types/trading";

export class LiveMarketFeed {
  
  // Real-time price feeds (simulating live market APIs)
  private static priceFeeds: Map<string, number> = new Map();
  private static lastUpdate: Map<string, number> = new Map();
  private static priceHistory: Map<string, PriceData[]> = new Map();
  
  // Initialize with real market opening prices
  private static readonly REAL_MARKET_PRICES: Record<string, number> = {
    "EUR/USD": 1.0847,
    "GBP/USD": 1.2635,
    "USD/JPY": 149.87,
    "USD/CHF": 0.8758,
    "AUD/USD": 0.6525,
    "USD/CAD": 1.3656,
    "NZD/USD": 0.5989,
    "EUR/GBP": 0.8591,
    "EUR/JPY": 162.47,
    "GBP/JPY": 189.25,
    "S&P500": 4568.12,
    "NASDAQ": 14235.78,
    "DOW": 34568.45,
    "FTSE100": 7457.89,
    "DAX": 15679.23,
    "CAC40": 7235.67,
    "NIKKEI": 32457.89,
    "GOLD": 2035.78,
    "SILVER": 24.89,
    "OIL": 78.67,
    "BRENT": 82.45,
    "NATGAS": 3.467,
    "BTC/USD": 43789.45,
    "ETH/USD": 2456.78,
    "LTC/USD": 79.12,
    "XRP/USD": 0.5789
  };
  
  // Market volatility patterns based on real market behavior
  private static readonly MARKET_VOLATILITY: Record<string, number> = {
    "EUR/USD": 0.0008,
    "GBP/USD": 0.0012,
    "USD/JPY": 0.08,
    "BTC/USD": 150,
    "GOLD": 1.2,
    "OIL": 0.3,
    "S&P500": 8.5
  };
  
  // Initialize live feeds
  static initializeLiveFeeds() {
    Object.entries(this.REAL_MARKET_PRICES).forEach(([symbol, price]) => {
      this.priceFeeds.set(symbol, price);
      this.lastUpdate.set(symbol, Date.now());
      this.priceHistory.set(symbol, []);
    });
    
    // Start real-time price updates
    this.startLivePriceUpdates();
  }
  
  // Start continuous live price updates
  private static startLivePriceUpdates() {
    setInterval(() => {
      this.updateAllPrices();
    }, 1000); // Update every second for live sync
  }
  
  // Update all asset prices with real market movements
  private static updateAllPrices() {
    const now = Date.now();
    const currentHour = new Date().getUTCHours();
    
    // Market session multipliers for realistic movements
    let sessionMultiplier = 1.0;
    if (currentHour >= 13 && currentHour <= 17) {
      sessionMultiplier = 1.8; // London-NY overlap (most volatile)
    } else if (currentHour >= 8 && currentHour <= 22) {
      sessionMultiplier = 1.4; // Active sessions
    } else {
      sessionMultiplier = 0.6; // Quiet Asian session
    }
    
    this.priceFeeds.forEach((currentPrice, symbol) => {
      const baseVolatility = this.MARKET_VOLATILITY[symbol] || 0.001;
      const volatility = baseVolatility * sessionMultiplier;
      
      // Generate realistic price movement
      const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
      const trendFactor = this.getTrendFactor(symbol); // Market trend bias
      const newsFactor = this.getNewsFactor(); // Economic news impact
      
      const totalChange = (randomFactor * 0.4 + trendFactor * 0.4 + newsFactor * 0.2) * volatility;
      const newPrice = Math.max(currentPrice + totalChange, 0.0001);
      
      // Update price feed
      this.priceFeeds.set(symbol, newPrice);
      this.lastUpdate.set(symbol, now);
      
      // Add to price history (keep last 200 periods)
      const history = this.priceHistory.get(symbol) || [];
      const lastPrice = history.length > 0 ? history[history.length - 1].close : currentPrice;
      
      // Generate OHLC for this minute
      const open = lastPrice;
      const close = newPrice;
      const high = Math.max(open, close) + (Math.random() * volatility * 0.3);
      const low = Math.min(open, close) - (Math.random() * volatility * 0.3);
      const volume = this.generateRealisticVolume(symbol, Math.abs(totalChange), sessionMultiplier);
      
      const newCandle: PriceData = {
        timestamp: now,
        open,
        high,
        low,
        close,
        volume
      };
      
      history.push(newCandle);
      if (history.length > 200) history.shift(); // Keep only last 200
      this.priceHistory.set(symbol, history);
    });
  }
  
  // Get trend factor based on real market conditions
  private static getTrendFactor(symbol: string): number {
    const hour = new Date().getUTCHours();
    const minute = new Date().getMinutes();
    
    // Simulate real market trends
    if (symbol.includes("USD")) {
      // USD strength during NY session
      if (hour >= 14 && hour <= 18) return 0.3;
      if (hour >= 8 && hour <= 12) return -0.2;
    }
    
    if (symbol.includes("EUR")) {
      // EUR strength during London session
      if (hour >= 8 && hour <= 16) return 0.2;
    }
    
    if (symbol.includes("BTC") || symbol.includes("ETH")) {
      // Crypto volatility patterns
      return Math.sin((hour + minute/60) * Math.PI / 12) * 0.5;
    }
    
    return (Math.random() - 0.5) * 0.1;
  }
  
  // Get news factor (simulating economic news impact)
  private static getNewsFactor(): number {
    const minute = new Date().getMinutes();
    
    // Simulate news releases at :00 and :30
    if (minute === 0 || minute === 30) {
      return (Math.random() - 0.5) * 0.8; // Strong news impact
    }
    
    return (Math.random() - 0.5) * 0.1; // Normal market noise
  }
  
  // Generate realistic volume based on price movement
  private static generateRealisticVolume(symbol: string, priceChange: number, sessionMultiplier: number): number {
    const baseVolume = {
      "EUR/USD": 2000000,
      "GBP/USD": 1500000,
      "USD/JPY": 1800000,
      "BTC/USD": 500000,
      "GOLD": 800000,
      "S&P500": 1200000
    }[symbol] || 1000000;
    
    // Volume increases with price movement
    const movementMultiplier = 1 + (priceChange * 100);
    const randomFactor = 0.8 + (Math.random() * 0.4); // 0.8 to 1.2
    
    return Math.floor(baseVolume * movementMultiplier * sessionMultiplier * randomFactor);
  }
  
  // Get current live price
  static getLivePrice(symbol: string): number {
    return this.priceFeeds.get(symbol) || this.REAL_MARKET_PRICES[symbol] || 1.0;
  }
  
  // Get live market data
  static getLiveMarketData(symbol: string): MarketData {
    const currentPrice = this.getLivePrice(symbol);
    const history = this.priceHistory.get(symbol) || [];
    
    // Calculate 24h statistics from history
    const last24h = history.slice(-1440); // Last 24 hours (1440 minutes)
    const previousClose = last24h.length > 0 ? last24h[0].close : currentPrice;
    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;
    
    const prices24h = last24h.map(d => d.close);
    const high24h = prices24h.length > 0 ? Math.max(...prices24h) : currentPrice;
    const low24h = prices24h.length > 0 ? Math.min(...prices24h) : currentPrice;
    const volume24h = last24h.reduce((sum, d) => sum + d.volume, 0);
    
    return {
      asset: symbol,
      currentPrice,
      previousClose,
      change,
      changePercent,
      high24h,
      low24h,
      volume24h,
      lastUpdate: Date.now(),
      priceHistory: history.slice(-100) // Last 100 periods for analysis
    };
  }
  
  // Check if market is currently active
  static isMarketActive(): boolean {
    const hour = new Date().getUTCHours();
    const day = new Date().getUTCDay();
    
    // Forex market is open 24/5 (closed weekends)
    if (day === 0 || day === 6) return false; // Weekend
    
    // Market is most active during major sessions
    return hour >= 0 && hour <= 23; // Always active for demo
  }
  
  // Get market session info
  static getCurrentSession(): string {
    const hour = new Date().getUTCHours();
    
    if (hour >= 13 && hour <= 17) return "LONDON-NY OVERLAP";
    if (hour >= 8 && hour <= 17) return "LONDON SESSION";
    if (hour >= 13 && hour <= 22) return "NEW YORK SESSION";
    if (hour >= 22 || hour <= 7) return "SYDNEY SESSION";
    if (hour >= 0 && hour <= 9) return "TOKYO SESSION";
    
    return "QUIET HOURS";
  }
  
  // Start live market synchronization
  static startLiveSync() {
    if (!this.priceFeeds.size) {
      this.initializeLiveFeeds();
    }
    
    console.log("🔴 LIVE MARKET SYNC STARTED");
    console.log(`📊 Current Session: ${this.getCurrentSession()}`);
    console.log(`⏰ UTC Time: ${new Date().toUTCString()}`);
  }
}