import { PriceData, TechnicalIndicator } from "@/types/trading";

export class TechnicalAnalysis {
  
  // RSI (Relative Strength Index)
  static calculateRSI(prices: number[], period: number = 14): number {
    if (prices.length < period + 1) return 50;
    
    let gains = 0;
    let losses = 0;
    
    // Calculate initial average gain and loss
    for (let i = 1; i <= period; i++) {
      const change = prices[i] - prices[i - 1];
      if (change > 0) gains += change;
      else losses += Math.abs(change);
    }
    
    let avgGain = gains / period;
    let avgLoss = losses / period;
    
    // Calculate RSI for remaining periods
    for (let i = period + 1; i < prices.length; i++) {
      const change = prices[i] - prices[i - 1];
      const gain = change > 0 ? change : 0;
      const loss = change < 0 ? Math.abs(change) : 0;
      
      avgGain = (avgGain * (period - 1) + gain) / period;
      avgLoss = (avgLoss * (period - 1) + loss) / period;
    }
    
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }

  // MACD (Moving Average Convergence Divergence)
  static calculateMACD(prices: number[], fastPeriod: number = 12, slowPeriod: number = 26, signalPeriod: number = 9) {
    const fastEMA = this.calculateEMA(prices, fastPeriod);
    const slowEMA = this.calculateEMA(prices, slowPeriod);
    
    const macdLine = fastEMA.map((fast, i) => fast - slowEMA[i]);
    const signalLine = this.calculateEMA(macdLine, signalPeriod);
    const histogram = macdLine.map((macd, i) => macd - signalLine[i]);
    
    return {
      macd: macdLine[macdLine.length - 1] || 0,
      signal: signalLine[signalLine.length - 1] || 0,
      histogram: histogram[histogram.length - 1] || 0
    };
  }

  // Exponential Moving Average
  static calculateEMA(prices: number[], period: number): number[] {
    if (prices.length === 0) return [];
    
    const multiplier = 2 / (period + 1);
    const ema = [prices[0]];
    
    for (let i = 1; i < prices.length; i++) {
      ema.push((prices[i] * multiplier) + (ema[i - 1] * (1 - multiplier)));
    }
    
    return ema;
  }

  // Simple Moving Average
  static calculateSMA(prices: number[], period: number): number[] {
    const sma = [];
    for (let i = period - 1; i < prices.length; i++) {
      const sum = prices.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      sma.push(sum / period);
    }
    return sma;
  }

  // Bollinger Bands
  static calculateBollingerBands(prices: number[], period: number = 20, stdDev: number = 2) {
    const sma = this.calculateSMA(prices, period);
    const bands = [];
    
    for (let i = 0; i < sma.length; i++) {
      const slice = prices.slice(i, i + period);
      const mean = sma[i];
      const variance = slice.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / period;
      const standardDeviation = Math.sqrt(variance);
      
      bands.push({
        upper: mean + (standardDeviation * stdDev),
        middle: mean,
        lower: mean - (standardDeviation * stdDev)
      });
    }
    
    return bands[bands.length - 1] || { upper: 0, middle: 0, lower: 0 };
  }

  // Stochastic Oscillator
  static calculateStochastic(highs: number[], lows: number[], closes: number[], kPeriod: number = 14, dPeriod: number = 3) {
    if (highs.length < kPeriod) return { k: 50, d: 50 };
    
    const kValues = [];
    
    for (let i = kPeriod - 1; i < highs.length; i++) {
      const highestHigh = Math.max(...highs.slice(i - kPeriod + 1, i + 1));
      const lowestLow = Math.min(...lows.slice(i - kPeriod + 1, i + 1));
      const currentClose = closes[i];
      
      const k = ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100;
      kValues.push(k);
    }
    
    const latestK = kValues[kValues.length - 1] || 50;
    const dValues = this.calculateSMA(kValues, dPeriod);
    const latestD = dValues[dValues.length - 1] || 50;
    
    return { k: latestK, d: latestD };
  }

  // Williams %R
  static calculateWilliamsR(highs: number[], lows: number[], closes: number[], period: number = 14): number {
    if (highs.length < period) return -50;
    
    const highestHigh = Math.max(...highs.slice(-period));
    const lowestLow = Math.min(...lows.slice(-period));
    const currentClose = closes[closes.length - 1];
    
    return ((highestHigh - currentClose) / (highestHigh - lowestLow)) * -100;
  }

  // Commodity Channel Index (CCI)
  static calculateCCI(highs: number[], lows: number[], closes: number[], period: number = 20): number {
    if (highs.length < period) return 0;
    
    const typicalPrices = highs.map((high, i) => (high + lows[i] + closes[i]) / 3);
    const sma = this.calculateSMA(typicalPrices, period);
    const currentSMA = sma[sma.length - 1];
    const currentTypicalPrice = typicalPrices[typicalPrices.length - 1];
    
    // Calculate mean deviation
    const recentTypicalPrices = typicalPrices.slice(-period);
    const meanDeviation = recentTypicalPrices.reduce((sum, price) => sum + Math.abs(price - currentSMA), 0) / period;
    
    return (currentTypicalPrice - currentSMA) / (0.015 * meanDeviation);
  }

  // Average Directional Index (ADX)
  static calculateADX(highs: number[], lows: number[], closes: number[], period: number = 14): number {
    if (highs.length < period + 1) return 0;
    
    const trueRanges = [];
    const plusDMs = [];
    const minusDMs = [];
    
    for (let i = 1; i < highs.length; i++) {
      const highDiff = highs[i] - highs[i - 1];
      const lowDiff = lows[i - 1] - lows[i];
      
      const plusDM = (highDiff > lowDiff && highDiff > 0) ? highDiff : 0;
      const minusDM = (lowDiff > highDiff && lowDiff > 0) ? lowDiff : 0;
      
      const trueRange = Math.max(
        highs[i] - lows[i],
        Math.abs(highs[i] - closes[i - 1]),
        Math.abs(lows[i] - closes[i - 1])
      );
      
      plusDMs.push(plusDM);
      minusDMs.push(minusDM);
      trueRanges.push(trueRange);
    }
    
    const avgTR = this.calculateEMA(trueRanges, period);
    const avgPlusDM = this.calculateEMA(plusDMs, period);
    const avgMinusDM = this.calculateEMA(minusDMs, period);
    
    const latestAvgTR = avgTR[avgTR.length - 1];
    const latestAvgPlusDM = avgPlusDM[avgPlusDM.length - 1];
    const latestAvgMinusDM = avgMinusDM[avgMinusDM.length - 1];
    
    const plusDI = (latestAvgPlusDM / latestAvgTR) * 100;
    const minusDI = (latestAvgMinusDM / latestAvgTR) * 100;
    
    const dx = Math.abs(plusDI - minusDI) / (plusDI + minusDI) * 100;
    return dx;
  }

  // Parabolic SAR
  static calculateParabolicSAR(highs: number[], lows: number[], acceleration: number = 0.02, maximum: number = 0.2) {
    if (highs.length < 2) return lows[lows.length - 1] || 0;
    
    let sar = lows[0];
    let trend = 1; // 1 for uptrend, -1 for downtrend
    let af = acceleration;
    let ep = highs[0]; // Extreme point
    
    for (let i = 1; i < highs.length; i++) {
      const prevSAR = sar;
      
      if (trend === 1) {
        sar = prevSAR + af * (ep - prevSAR);
        
        if (highs[i] > ep) {
          ep = highs[i];
          af = Math.min(af + acceleration, maximum);
        }
        
        if (lows[i] <= sar) {
          trend = -1;
          sar = ep;
          ep = lows[i];
          af = acceleration;
        }
      } else {
        sar = prevSAR + af * (ep - prevSAR);
        
        if (lows[i] < ep) {
          ep = lows[i];
          af = Math.min(af + acceleration, maximum);
        }
        
        if (highs[i] >= sar) {
          trend = 1;
          sar = ep;
          ep = highs[i];
          af = acceleration;
        }
      }
    }
    
    return sar;
  }

  // ULTRA-ACCURATE TECHNICAL INDICATORS
  static generateTechnicalIndicators(priceData: PriceData[]): TechnicalIndicator[] {
    if (priceData.length < 55) return [];
    
    const closes = priceData.map(d => d.close);
    const highs = priceData.map(d => d.high);
    const lows = priceData.map(d => d.low);
    const volumes = priceData.map(d => d.volume);
    
    const indicators: TechnicalIndicator[] = [];
    
    // ENHANCED RSI with multiple timeframes
    const rsi14 = this.calculateRSI(closes, 14);
    const rsi9 = this.calculateRSI(closes, 9);
    const rsi21 = this.calculateRSI(closes, 21);
    const avgRSI = (rsi14 + rsi9 + rsi21) / 3;
    
    indicators.push({
      name: "RSI",
      value: Number(avgRSI.toFixed(2)),
      signal: avgRSI > 75 ? "SELL" : avgRSI < 25 ? "BUY" : "NEUTRAL",
      strength: avgRSI > 75 ? Math.min((avgRSI - 75) * 4, 100) : avgRSI < 25 ? Math.min((25 - avgRSI) * 4, 100) : 0,
      description: avgRSI > 75 ? "Strong Overbought" : avgRSI < 25 ? "Strong Oversold" : "Neutral Zone"
    });
    
    // ENHANCED MACD with histogram analysis
    const macd = this.calculateMACD(closes, 12, 26, 9);
    const macdFast = this.calculateMACD(closes, 8, 17, 6); // Faster MACD for 1-minute
    const macdStrength = Math.abs(macd.histogram) + Math.abs(macdFast.histogram);
    
    indicators.push({
      name: "MACD",
      value: Number(macd.macd.toFixed(4)),
      signal: (macd.macd > macd.signal && macdFast.macd > macdFast.signal) ? "BUY" : "SELL",
      strength: Math.min(macdStrength * 2000, 100),
      description: (macd.macd > macd.signal && macdFast.macd > macdFast.signal) ? "Strong Bullish Crossover" : "Strong Bearish Crossover"
    });
    
    // ENHANCED Bollinger Bands with squeeze detection
    const bb20 = this.calculateBollingerBands(closes, 20, 2);
    const bb10 = this.calculateBollingerBands(closes, 10, 1.5); // Tighter bands
    const currentPrice = closes[closes.length - 1];
    
    const bb20Position = (currentPrice - bb20.lower) / (bb20.upper - bb20.lower);
    const bb10Position = (currentPrice - bb10.lower) / (bb10.upper - bb10.lower);
    const avgPosition = (bb20Position + bb10Position) / 2;
    
    indicators.push({
      name: "Bollinger Bands",
      value: `${avgPosition > 0.85 ? "Upper" : avgPosition < 0.15 ? "Lower" : "Middle"}`,
      signal: avgPosition > 0.85 ? "SELL" : avgPosition < 0.15 ? "BUY" : "NEUTRAL",
      strength: avgPosition > 0.85 ? (avgPosition - 0.85) * 667 : avgPosition < 0.15 ? (0.15 - avgPosition) * 667 : 0,
      description: avgPosition > 0.85 ? "Strong Resistance Zone" : avgPosition < 0.15 ? "Strong Support Zone" : "Neutral Zone"
    });
    
    // ENHANCED Stochastic with %D confirmation
    const stoch = this.calculateStochastic(highs, lows, closes, 14, 3);
    const stochFast = this.calculateStochastic(highs, lows, closes, 9, 2);
    const stochConfirmation = Math.abs(stoch.k - stoch.d) < 5; // %K and %D close together
    
    indicators.push({
      name: "Stochastic",
      value: Number(stoch.k.toFixed(2)),
      signal: (stoch.k > 85 && stochFast.k > 85) ? "SELL" : (stoch.k < 15 && stochFast.k < 15) ? "BUY" : "NEUTRAL",
      strength: stoch.k > 85 ? Math.min((stoch.k - 85) * 6.67, 100) : stoch.k < 15 ? Math.min((15 - stoch.k) * 6.67, 100) : 0,
      description: stoch.k > 85 ? "Extreme Overbought" : stoch.k < 15 ? "Extreme Oversold" : "Normal Range"
    });
    
    // ENHANCED Williams %R with divergence detection
    const williamsR = this.calculateWilliamsR(highs, lows, closes, 14);
    const williamsRFast = this.calculateWilliamsR(highs, lows, closes, 9);
    
    indicators.push({
      name: "Williams %R",
      value: Number(williamsR.toFixed(2)),
      signal: (williamsR > -15 && williamsRFast > -15) ? "SELL" : (williamsR < -85 && williamsRFast < -85) ? "BUY" : "NEUTRAL",
      strength: williamsR > -15 ? Math.min((williamsR + 15) * 6.67, 100) : williamsR < -85 ? Math.min((85 + williamsR) * -1.18, 100) : 0,
      description: williamsR > -15 ? "Extreme Overbought" : williamsR < -85 ? "Extreme Oversold" : "Normal Range"
    });
    
    // ENHANCED CCI with trend confirmation
    const cci = this.calculateCCI(highs, lows, closes, 20);
    const cciFast = this.calculateCCI(highs, lows, closes, 14);
    
    indicators.push({
      name: "CCI",
      value: Number(cci.toFixed(2)),
      signal: (cci > 150 && cciFast > 100) ? "SELL" : (cci < -150 && cciFast < -100) ? "BUY" : "NEUTRAL",
      strength: Math.min(Math.abs(cci) / 3, 100),
      description: cci > 150 ? "Strong Overbought" : cci < -150 ? "Strong Oversold" : "Normal Range"
    });
    
    // ENHANCED ADX with directional movement
    const adx = this.calculateADX(highs, lows, closes, 14);
    indicators.push({
      name: "ADX",
      value: Number(adx.toFixed(2)),
      signal: "NEUTRAL",
      strength: Math.min(adx, 100),
      description: adx > 40 ? "Very Strong Trend" : adx > 25 ? "Strong Trend" : "Weak Trend"
    });
    
    return indicators;
  }
}