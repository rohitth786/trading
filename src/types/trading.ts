export interface PriceData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TechnicalIndicator {
  name: string;
  value: number | string;
  signal: "BUY" | "SELL" | "NEUTRAL";
  strength: number; // 0-100
  description: string;
}

export interface TradingSignal {
  asset: string;
  signal: "BUY" | "SELL";
  strength: number; // 0-100
  confidence: number; // 0-100
  timestamp: number;
  timeframe: string;
  indicators: TechnicalIndicator[];
  reasoning: string[];
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  expectedDuration: number; // in seconds
}

export interface Asset {
  symbol: string;
  name: string;
  type: "CURRENCY" | "INDEX" | "COMMODITY" | "CRYPTO" | "STOCK" | "OTC";
  category: string;
  isActive: boolean;
  minTradeAmount: number;
  maxTradeAmount: number;
  spread: number;
}

export interface MarketData {
  asset: string;
  currentPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  lastUpdate: number;
  priceHistory: PriceData[];
}

export interface IndicatorConfig {
  rsi: {
    period: number;
    overbought: number;
    oversold: number;
  };
  macd: {
    fastPeriod: number;
    slowPeriod: number;
    signalPeriod: number;
  };
  bollinger: {
    period: number;
    standardDeviations: number;
  };
  stochastic: {
    kPeriod: number;
    dPeriod: number;
    overbought: number;
    oversold: number;
  };
  williams: {
    period: number;
  };
  cci: {
    period: number;
    overbought: number;
    oversold: number;
  };
  adx: {
    period: number;
    trendThreshold: number;
  };
  ema: {
    periods: number[];
  };
  sma: {
    periods: number[];
  };
}

export interface TradingPerformance {
  totalSignals: number;
  successfulSignals: number;
  failedSignals: number;
  winRate: number;
  accuracy: number;
  totalProfit: number;
  averageProfit: number;
  maxDrawdown: number;
  sharpeRatio: number;
  profitFactor: number;
  dailyStats: {
    date: string;
    signals: number;
    wins: number;
    losses: number;
    profit: number;
  }[];
}

export interface SignalHistory {
  id: string;
  timestamp: number;
  asset: string;
  signal: "BUY" | "SELL";
  strength: number;
  entryPrice: number;
  exitPrice?: number;
  result?: "WIN" | "LOSS" | "PENDING";
  profit?: number;
  duration: number;
  indicators: TechnicalIndicator[];
}

export interface MarketCondition {
  trend: "BULLISH" | "BEARISH" | "SIDEWAYS";
  volatility: "LOW" | "MEDIUM" | "HIGH";
  volume: "LOW" | "MEDIUM" | "HIGH";
  sentiment: "BULLISH" | "BEARISH" | "NEUTRAL";
  strength: number; // 0-100
  description: string;
}

export interface AlertSettings {
  enabled: boolean;
  signalTypes: ("BUY" | "SELL")[];
  minimumStrength: number;
  assets: string[];
  soundEnabled: boolean;
  emailEnabled: boolean;
  pushEnabled: boolean;
}

export interface UserSettings {
  defaultTimeframe: string;
  signalSensitivity: "LOW" | "MEDIUM" | "HIGH";
  riskTolerance: "CONSERVATIVE" | "MODERATE" | "AGGRESSIVE";
  preferredAssets: string[];
  indicatorConfig: IndicatorConfig;
  alertSettings: AlertSettings;
  theme: "DARK" | "LIGHT";
  autoRefresh: boolean;
  refreshInterval: number; // in seconds
}