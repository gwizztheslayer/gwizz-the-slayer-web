"use client";
import { useEffect, useState } from "react";

export default function MarketOracle() {
  const [market, setMarket] = useState<any>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true");
        if (res.ok) {
          const data = await res.json();
          setMarket(data);
        }
      } catch (error) {
        console.error("Oracle Uplink Failed");
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!market) {
    return (
      <div className="w-full bg-black border-y border-toxic/20 py-2 text-center text-[10px] font-mono text-toxic animate-pulse tracking-widest">
        [ ESTABLISHING CONNECTION TO FINANCIAL ORACLE... ]
      </div>
    );
  }

  const formatData = (coin: any) => {
    if (!coin) return null;
    const isUp = coin.usd_24h_change >= 0;
    const color = isUp ? "text-toxic" : "text-red-500";
    const sign = isUp ? "+" : "";
    return (
      <span className={`font-bold ${color}`}>
        ${coin.usd} ({sign}{coin.usd_24h_change?.toFixed(2)}%)
      </span>
    );
  };

  return (
    <div className="w-full bg-black/90 backdrop-blur-md border-y border-toxic/20 py-2 overflow-hidden shadow-[0_0_10px_rgba(57,255,20,0.1)]">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 sm:gap-12 text-[10px] sm:text-xs font-mono tracking-widest uppercase">
        <span className="text-toxic/70">BTC: {formatData(market.bitcoin)}</span>
        <span className="text-toxic/70">ETH: {formatData(market.ethereum)}</span>
        <span className="text-toxic/70">SOL: {formatData(market.solana)}</span>
      </div>
    </div>
  );
}
