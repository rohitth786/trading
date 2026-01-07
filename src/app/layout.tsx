import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KUBERA TRADER - 100% Accuracy for Olymp Trade",
  description: "100% accurate trading signals synchronized with Olymp Trade platform. Real-time signals for indices, OTC, and currency pairs by Hanuman Trade signals.",
  keywords: "kubera trader, olymp trade, hanuman trade signals, 100% accuracy, trading signals, technical analysis, forex, indices, OTC",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen`}>
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <header className="bg-gray-800 border-b border-gray-700 px-4 py-3">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">KT</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">KUBERA TRADER</h1>
                    <p className="text-xs text-gray-400">By Hanuman Trade Signals</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-300">🔴 LIVE MARKET SYNC</span>
                </div>
                
                <div className="hidden lg:flex items-center space-x-2 bg-blue-900 px-3 py-1 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-blue-300">REAL-TIME FEEDS</span>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-mono text-green-400">98.7% Accuracy</div>
                  <div className="text-xs text-gray-400">Live Performance</div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 bg-gray-900">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-800 border-t border-gray-700 px-4 py-3">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
                <div className="flex items-center space-x-4 mb-2 md:mb-0">
                  <span>© 2025 KUBERA HANUMAN SIGNALS</span>
                  <span className="hidden md:inline">•</span>
                  <span className="text-yellow-400">Risk Warning: Trading involves risk</span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Server Online</span>
                  </div>
                  <span>•</span>
                  <span>Last Update: {new Date().toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}