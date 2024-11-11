'use client';

import { useState } from 'react';

interface TradeSimulatorProps {
  symbol: string;
}

export default function TradeSimulator({ symbol }: TradeSimulatorProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const [holdings, setHoldings] = useState<number>(0);

  // Handle a buy or sell trade
  const handleTrade = (type: 'buy' | 'sell') => {
    const numericQuantity = Math.abs(quantity);
    if (type === 'buy') {
      setHoldings(holdings + numericQuantity);
    } else if (type === 'sell') {
      setHoldings(holdings - numericQuantity);
    }

    setQuantity(0); // Reset input field after trade
  }

  return (
    <div>
      <h3>{symbol} Trade Simulator</h3>
      <p>Current Holdings: {holdings} {symbol}</p>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseFloat(e.target.value))}
        placeholder="Enter Quantity"
      />
      <button
        onClick={() => handleTrade('buy')}
      >Buy</button>
      <button
        onClick={() => handleTrade('sell')}
      >Sell</button>
    </div>
  );
}