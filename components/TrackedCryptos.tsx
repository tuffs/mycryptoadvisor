'use client';

import { useState } from 'react';
import CryptoPriceDisplay from '@/components/CryptoPriceDisplay';
import TradeSimulator from '@/components/TradeSimulator';

interface TrackedCrypto {
  symbol: string;
}

export default function TrackedCryptos() {
  const [trackedCryptos, setTrackedCryptos] = useState<TrackedCrypto[]>([]);
  const [newSymbol, setNewSymbol] = useState<string>('');

  // Add a cryptocurrency to the tracked cryptos list
  const addCrypto = () => {
    if (newSymbol && !trackedCryptos.find((crypto) => crypto.symbol === newSymbol.toUpperCase())) {
      setTrackedCryptos([...trackedCryptos, { symbol: newSymbol.toUpperCase() }]);
      setNewSymbol('');
    };
  }

  // Remove a cryptocurrency from the tracked cryptos list
  const removeCrypto = (symbol: string) => {
    setTrackedCryptos(trackedCryptos.filter((crypto) => crypto.symbol !== symbol));
  }

  return (
    <div>
      <h2>Tracked Cryptocurrencies</h2>
      <div>
        <input
          type="text"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          placeholder="Enter symbol (e.g. BTC, ETH)"
        />

        <button
          onClick={addCrypto}
        >Add</button>
      </div>

      <ul>
        {trackedCryptos.map((crypto) => (
          <li key={crypto.symbol}>
            <CryptoPriceDisplay symbol={crypto.symbol} />
            <TradeSimulator symbol={crypto.symbol} />
            <button
              onClick={() => removeCrypto(crypto.symbol)}
            >Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}