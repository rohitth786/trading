// COMPLETE OLYMP TRADE ASSET LIST - ALL REAL ASSETS FROM OLYMP TRADE PLATFORM

export interface OlympTradeAssetSet {
  category: string;
  displayName: string;
  assets: {
    symbol: string;
    name: string;
    type: "CURRENCY" | "INDEX" | "COMMODITY" | "CRYPTO" | "OTC" | "STOCK";
    basePrice: number;
    spread: number;
    isActive: boolean;
  }[];
}

export class CompleteOlympTradeAssets {
  
  // ALL REAL OLYMP TRADE ASSET SETS
  static readonly ASSET_SETS: OlympTradeAssetSet[] = [
    
    // CURRENCIES SET
    {
      category: "CURRENCIES",
      displayName: "💱 Currency Pairs",
      assets: [
        { symbol: "EUR/USD", name: "Euro vs US Dollar", type: "CURRENCY", basePrice: 1.0847, spread: 0.00015, isActive: true },
        { symbol: "GBP/USD", name: "British Pound vs US Dollar", type: "CURRENCY", basePrice: 1.2635, spread: 0.00020, isActive: true },
        { symbol: "USD/JPY", name: "US Dollar vs Japanese Yen", type: "CURRENCY", basePrice: 149.87, spread: 0.015, isActive: true },
        { symbol: "AUD/USD", name: "Australian Dollar vs US Dollar", type: "CURRENCY", basePrice: 0.6525, spread: 0.00022, isActive: true },
        { symbol: "USD/CAD", name: "US Dollar vs Canadian Dollar", type: "CURRENCY", basePrice: 1.3656, spread: 0.00025, isActive: true },
        { symbol: "USD/CHF", name: "US Dollar vs Swiss Franc", type: "CURRENCY", basePrice: 0.8758, spread: 0.00018, isActive: true },
        { symbol: "NZD/USD", name: "New Zealand Dollar vs US Dollar", type: "CURRENCY", basePrice: 0.5989, spread: 0.00030, isActive: true },
        { symbol: "EUR/GBP", name: "Euro vs British Pound", type: "CURRENCY", basePrice: 0.8591, spread: 0.00025, isActive: true },
        { symbol: "EUR/JPY", name: "Euro vs Japanese Yen", type: "CURRENCY", basePrice: 162.47, spread: 0.025, isActive: true },
        { symbol: "GBP/JPY", name: "British Pound vs Japanese Yen", type: "CURRENCY", basePrice: 189.25, spread: 0.035, isActive: true },
        { symbol: "AUD/JPY", name: "Australian Dollar vs Japanese Yen", type: "CURRENCY", basePrice: 97.45, spread: 0.020, isActive: true },
        { symbol: "CAD/JPY", name: "Canadian Dollar vs Japanese Yen", type: "CURRENCY", basePrice: 109.78, spread: 0.018, isActive: true },
        { symbol: "CHF/JPY", name: "Swiss Franc vs Japanese Yen", type: "CURRENCY", basePrice: 171.23, spread: 0.022, isActive: true },
        { symbol: "EUR/AUD", name: "Euro vs Australian Dollar", type: "CURRENCY", basePrice: 1.6634, spread: 0.00035, isActive: true },
        { symbol: "GBP/AUD", name: "British Pound vs Australian Dollar", type: "CURRENCY", basePrice: 1.9378, spread: 0.00040, isActive: true },
        { symbol: "EUR/CAD", name: "Euro vs Canadian Dollar", type: "CURRENCY", basePrice: 1.4823, spread: 0.00030, isActive: true },
        { symbol: "GBP/CAD", name: "British Pound vs Canadian Dollar", type: "CURRENCY", basePrice: 1.7256, spread: 0.00035, isActive: true },
        { symbol: "AUD/CAD", name: "Australian Dollar vs Canadian Dollar", type: "CURRENCY", basePrice: 0.8912, spread: 0.00028, isActive: true },
        { symbol: "EUR/CHF", name: "Euro vs Swiss Franc", type: "CURRENCY", basePrice: 0.9501, spread: 0.00020, isActive: true },
        { symbol: "GBP/CHF", name: "British Pound vs Swiss Franc", type: "CURRENCY", basePrice: 1.1067, spread: 0.00025, isActive: true }
      ]
    },
    
    // INDICES SET
    {
      category: "INDICES",
      displayName: "📊 Stock Indices",
      assets: [
        { symbol: "S&P500", name: "S&P 500 Index", type: "INDEX", basePrice: 4568.12, spread: 0.5, isActive: true },
        { symbol: "NASDAQ", name: "NASDAQ 100", type: "INDEX", basePrice: 14235.78, spread: 0.8, isActive: true },
        { symbol: "DOW", name: "Dow Jones Industrial Average", type: "INDEX", basePrice: 34568.45, spread: 1.0, isActive: true },
        { symbol: "FTSE100", name: "FTSE 100 Index", type: "INDEX", basePrice: 7457.89, spread: 1.2, isActive: true },
        { symbol: "DAX", name: "DAX 30 Index", type: "INDEX", basePrice: 15679.23, spread: 1.5, isActive: true },
        { symbol: "CAC40", name: "CAC 40 Index", type: "INDEX", basePrice: 7235.67, spread: 1.3, isActive: true },
        { symbol: "NIKKEI", name: "Nikkei 225 Index", type: "INDEX", basePrice: 32457.89, spread: 2.0, isActive: true },
        { symbol: "ASX200", name: "ASX 200 Index", type: "INDEX", basePrice: 7123.45, spread: 1.8, isActive: true },
        { symbol: "HANG_SENG", name: "Hang Seng Index", type: "INDEX", basePrice: 17234.56, spread: 2.5, isActive: true },
        { symbol: "KOSPI", name: "KOSPI Index", type: "INDEX", basePrice: 2456.78, spread: 1.5, isActive: true },
        { symbol: "IBEX35", name: "IBEX 35 Index", type: "INDEX", basePrice: 9876.54, spread: 1.4, isActive: true },
        { symbol: "AEX", name: "AEX Index", type: "INDEX", basePrice: 789.12, spread: 0.8, isActive: true },
        { symbol: "SMI", name: "Swiss Market Index", type: "INDEX", basePrice: 11234.56, spread: 1.6, isActive: true },
        { symbol: "ASIA_COMPOSITE", name: "Asia Composite Index", type: "INDEX", basePrice: 8567.89, spread: 2.5, isActive: true },
        { symbol: "EUROPE_COMPOSITE", name: "Europe Composite Index", type: "INDEX", basePrice: 9876.54, spread: 2.8, isActive: true },
        { symbol: "CRYPTO_COMPOSITE", name: "Crypto Composite Index", type: "INDEX", basePrice: 4567.12, spread: 5.0, isActive: true },
        { symbol: "COMPOUND_INDEX", name: "Compound Index", type: "INDEX", basePrice: 12345.67, spread: 2.0, isActive: true },
        { symbol: "ASTRO_INDEX", name: "Astro Index", type: "INDEX", basePrice: 6789.23, spread: 3.0, isActive: true },
        { symbol: "MAHA_JANTAR", name: "Maha Jantar Index", type: "INDEX", basePrice: 11234.56, spread: 2.5, isActive: true },
        { symbol: "MOONCH_INDEX", name: "Moonch Index", type: "INDEX", basePrice: 7654.32, spread: 3.5, isActive: true }
      ]
    },
    
    // COMMODITIES SET
    {
      category: "COMMODITIES",
      displayName: "🥇 Commodities",
      assets: [
        { symbol: "GOLD", name: "Gold Spot", type: "COMMODITY", basePrice: 2035.78, spread: 0.30, isActive: true },
        { symbol: "SILVER", name: "Silver Spot", type: "COMMODITY", basePrice: 24.89, spread: 0.02, isActive: true },
        { symbol: "PLATINUM", name: "Platinum Spot", type: "COMMODITY", basePrice: 1023.45, spread: 0.50, isActive: true },
        { symbol: "PALLADIUM", name: "Palladium Spot", type: "COMMODITY", basePrice: 1567.89, spread: 0.80, isActive: true },
        { symbol: "OIL", name: "Crude Oil WTI", type: "COMMODITY", basePrice: 78.67, spread: 0.05, isActive: true },
        { symbol: "BRENT", name: "Brent Oil", type: "COMMODITY", basePrice: 82.45, spread: 0.05, isActive: true },
        { symbol: "NATGAS", name: "Natural Gas", type: "COMMODITY", basePrice: 3.467, spread: 0.003, isActive: true },
        { symbol: "COPPER", name: "Copper", type: "COMMODITY", basePrice: 4.123, spread: 0.008, isActive: true },
        { symbol: "WHEAT", name: "Wheat", type: "COMMODITY", basePrice: 567.89, spread: 2.0, isActive: true },
        { symbol: "CORN", name: "Corn", type: "COMMODITY", basePrice: 456.78, spread: 1.5, isActive: true },
        { symbol: "COFFEE", name: "Coffee", type: "COMMODITY", basePrice: 234.56, spread: 1.0, isActive: true },
        { symbol: "SUGAR", name: "Sugar", type: "COMMODITY", basePrice: 23.45, spread: 0.05, isActive: true }
      ]
    },
    
    // CRYPTOCURRENCIES SET
    {
      category: "CRYPTO",
      displayName: "₿ Cryptocurrencies",
      assets: [
        { symbol: "BTC/USD", name: "Bitcoin", type: "CRYPTO", basePrice: 43789.45, spread: 50, isActive: true },
        { symbol: "ETH/USD", name: "Ethereum", type: "CRYPTO", basePrice: 2456.78, spread: 2, isActive: true },
        { symbol: "LTC/USD", name: "Litecoin", type: "CRYPTO", basePrice: 79.12, spread: 0.5, isActive: true },
        { symbol: "XRP/USD", name: "Ripple", type: "CRYPTO", basePrice: 0.5789, spread: 0.001, isActive: true },
        { symbol: "ADA/USD", name: "Cardano", type: "CRYPTO", basePrice: 0.4567, spread: 0.001, isActive: true },
        { symbol: "DOT/USD", name: "Polkadot", type: "CRYPTO", basePrice: 7.89, spread: 0.01, isActive: true },
        { symbol: "LINK/USD", name: "Chainlink", type: "CRYPTO", basePrice: 14.56, spread: 0.02, isActive: true },
        { symbol: "UNI/USD", name: "Uniswap", type: "CRYPTO", basePrice: 8.91, spread: 0.01, isActive: true },
        { symbol: "MATIC/USD", name: "Polygon", type: "CRYPTO", basePrice: 0.89, spread: 0.001, isActive: true },
        { symbol: "AVAX/USD", name: "Avalanche", type: "CRYPTO", basePrice: 34.56, spread: 0.05, isActive: true },
        { symbol: "SOL/USD", name: "Solana", type: "CRYPTO", basePrice: 89.12, spread: 0.10, isActive: true },
        { symbol: "DOGE/USD", name: "Dogecoin", type: "CRYPTO", basePrice: 0.0789, spread: 0.0001, isActive: true }
      ]
    },
    
    // OTC SET
    {
      category: "OTC",
      displayName: "🔄 OTC Assets",
      assets: [
        { symbol: "OTC_EUR/USD", name: "EUR/USD OTC", type: "OTC", basePrice: 1.0842, spread: 0.0003, isActive: true },
        { symbol: "OTC_GBP/USD", name: "GBP/USD OTC", type: "OTC", basePrice: 1.2631, spread: 0.0004, isActive: true },
        { symbol: "OTC_USD/JPY", name: "USD/JPY OTC", type: "OTC", basePrice: 149.82, spread: 0.03, isActive: true },
        { symbol: "OTC_AUD/USD", name: "AUD/USD OTC", type: "OTC", basePrice: 0.6521, spread: 0.0005, isActive: true },
        { symbol: "OTC_USD/CAD", name: "USD/CAD OTC", type: "OTC", basePrice: 1.3652, spread: 0.0006, isActive: true },
        { symbol: "OTC_USD/CHF", name: "USD/CHF OTC", type: "OTC", basePrice: 0.8754, spread: 0.0004, isActive: true },
        { symbol: "OTC_NZD/USD", name: "NZD/USD OTC", type: "OTC", basePrice: 0.5985, spread: 0.0007, isActive: true },
        { symbol: "OTC_EUR/GBP", name: "EUR/GBP OTC", type: "OTC", basePrice: 0.8587, spread: 0.0005, isActive: true },
        { symbol: "OTC_EUR/JPY", name: "EUR/JPY OTC", type: "OTC", basePrice: 162.43, spread: 0.05, isActive: true },
        { symbol: "OTC_GBP/JPY", name: "GBP/JPY OTC", type: "OTC", basePrice: 189.21, spread: 0.06, isActive: true },
        { symbol: "OTC_GOLD", name: "Gold OTC", type: "OTC", basePrice: 2033.45, spread: 0.50, isActive: true },
        { symbol: "OTC_SILVER", name: "Silver OTC", type: "OTC", basePrice: 24.87, spread: 0.03, isActive: true },
        { symbol: "OTC_OIL", name: "Oil OTC", type: "OTC", basePrice: 78.42, spread: 0.08, isActive: true },
        { symbol: "OTC_BTC", name: "Bitcoin OTC", type: "OTC", basePrice: 43567.89, spread: 80, isActive: true },
        { symbol: "OTC_ETH", name: "Ethereum OTC", type: "OTC", basePrice: 2434.56, spread: 5, isActive: true }
      ]
    },
    
    // STOCKS SET
    {
      category: "STOCKS",
      displayName: "📈 Stock CFDs",
      assets: [
        { symbol: "AAPL", name: "Apple Inc.", type: "STOCK", basePrice: 189.45, spread: 0.02, isActive: true },
        { symbol: "GOOGL", name: "Alphabet Inc.", type: "STOCK", basePrice: 134.56, spread: 0.05, isActive: true },
        { symbol: "MSFT", name: "Microsoft Corporation", type: "STOCK", basePrice: 378.90, spread: 0.03, isActive: true },
        { symbol: "AMZN", name: "Amazon.com Inc.", type: "STOCK", basePrice: 145.78, spread: 0.08, isActive: true },
        { symbol: "TSLA", name: "Tesla Inc.", type: "STOCK", basePrice: 234.67, spread: 0.10, isActive: true },
        { symbol: "META", name: "Meta Platforms Inc.", type: "STOCK", basePrice: 298.45, spread: 0.06, isActive: true },
        { symbol: "NVDA", name: "NVIDIA Corporation", type: "STOCK", basePrice: 456.78, spread: 0.12, isActive: true },
        { symbol: "NFLX", name: "Netflix Inc.", type: "STOCK", basePrice: 389.12, spread: 0.08, isActive: true },
        { symbol: "AMD", name: "Advanced Micro Devices", type: "STOCK", basePrice: 123.45, spread: 0.04, isActive: true },
        { symbol: "INTC", name: "Intel Corporation", type: "STOCK", basePrice: 45.67, spread: 0.02, isActive: true },
        { symbol: "BABA", name: "Alibaba Group", type: "STOCK", basePrice: 78.90, spread: 0.05, isActive: true },
        { symbol: "JNJ", name: "Johnson & Johnson", type: "STOCK", basePrice: 167.89, spread: 0.03, isActive: true }
      ]
    },
    
    // COMMODITIES EXTENDED SET
    {
      category: "ENERGY",
      displayName: "⚡ Energy & Metals",
      assets: [
        { symbol: "WTI_OIL", name: "WTI Crude Oil", type: "COMMODITY", basePrice: 78.67, spread: 0.05, isActive: true },
        { symbol: "BRENT_OIL", name: "Brent Crude Oil", type: "COMMODITY", basePrice: 82.45, spread: 0.05, isActive: true },
        { symbol: "NATURAL_GAS", name: "Natural Gas", type: "COMMODITY", basePrice: 3.467, spread: 0.003, isActive: true },
        { symbol: "HEATING_OIL", name: "Heating Oil", type: "COMMODITY", basePrice: 2.567, spread: 0.005, isActive: true },
        { symbol: "GASOLINE", name: "Gasoline", type: "COMMODITY", basePrice: 2.234, spread: 0.004, isActive: true },
        { symbol: "GOLD_SPOT", name: "Gold Spot", type: "COMMODITY", basePrice: 2035.78, spread: 0.30, isActive: true },
        { symbol: "SILVER_SPOT", name: "Silver Spot", type: "COMMODITY", basePrice: 24.89, spread: 0.02, isActive: true },
        { symbol: "COPPER_SPOT", name: "Copper Spot", type: "COMMODITY", basePrice: 4.123, spread: 0.008, isActive: true },
        { symbol: "ALUMINUM", name: "Aluminum", type: "COMMODITY", basePrice: 2.345, spread: 0.005, isActive: true },
        { symbol: "ZINC", name: "Zinc", type: "COMMODITY", basePrice: 2.789, spread: 0.006, isActive: true }
      ]
    },
    
    // CRYPTO EXTENDED SET
    {
      category: "DEFI",
      displayName: "🚀 DeFi & Altcoins",
      assets: [
        { symbol: "BNB/USD", name: "Binance Coin", type: "CRYPTO", basePrice: 312.45, spread: 1.0, isActive: true },
        { symbol: "XLM/USD", name: "Stellar", type: "CRYPTO", basePrice: 0.1234, spread: 0.0001, isActive: true },
        { symbol: "TRX/USD", name: "TRON", type: "CRYPTO", basePrice: 0.0678, spread: 0.0001, isActive: true },
        { symbol: "EOS/USD", name: "EOS", type: "CRYPTO", basePrice: 0.789, spread: 0.001, isActive: true },
        { symbol: "XTZ/USD", name: "Tezos", type: "CRYPTO", basePrice: 0.891, spread: 0.001, isActive: true },
        { symbol: "ATOM/USD", name: "Cosmos", type: "CRYPTO", basePrice: 9.12, spread: 0.01, isActive: true },
        { symbol: "ALGO/USD", name: "Algorand", type: "CRYPTO", basePrice: 0.234, spread: 0.0001, isActive: true },
        { symbol: "VET/USD", name: "VeChain", type: "CRYPTO", basePrice: 0.0234, spread: 0.00001, isActive: true }
      ]
    }
  ];
  
  // GET ALL ASSETS BY CATEGORY
  static getAssetsByCategory(category: string): OlympTradeAssetSet | undefined {
    return this.ASSET_SETS.find(set => set.category === category);
  }
  
  // GET ALL ASSET CATEGORIES
  static getAllCategories(): string[] {
    return this.ASSET_SETS.map(set => set.category);
  }
  
  // GET ALL ASSETS FLATTENED
  static getAllAssets() {
    const allAssets: any[] = [];
    this.ASSET_SETS.forEach(set => {
      set.assets.forEach(asset => {
        allAssets.push({
          ...asset,
          category: set.category,
          displayCategory: set.displayName
        });
      });
    });
    return allAssets;
  }
  
  // GET ASSET COUNT BY CATEGORY
  static getAssetCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    this.ASSET_SETS.forEach(set => {
      counts[set.category] = set.assets.length;
    });
    return counts;
  }
  
  // CHECK IF ASSET EXISTS
  static assetExists(symbol: string): boolean {
    return this.getAllAssets().some(asset => asset.symbol === symbol);
  }
  
  // GET ASSET DETAILS
  static getAssetDetails(symbol: string) {
    return this.getAllAssets().find(asset => asset.symbol === symbol);
  }
}