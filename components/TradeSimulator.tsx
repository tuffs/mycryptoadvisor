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
    <div className="mb-6">
      <h3 className="text-gray-300 text-lg"><span className="underline">{symbol}</span> Held: {holdings}</h3>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseFloat(e.target.value))}
        placeholder="Enter Quantity"
        className="m-[-.05rem] mr-1"
      />
      <button
        onClick={() => handleTrade('buy')}
        className="button"
      >Buy</button>
      <button
        onClick={() => handleTrade('sell')}
        className="button"
      >Sell</button>
    </div>
  );
}