'use client';

import { useState, useEffect } from 'react';
import CryptoPriceDisplay from '@/components/CryptoPriceDisplay';
import TradeSimulator from '@/components/TradeSimulator';

interface TrackedCrypto {
  id: number;
  symbol: string;
}

export default function TrackedCryptos() {
  const [trackedCryptos, setTrackedCryptos] = useState<TrackedCrypto[]>([]);
  const [newSymbol, setNewSymbol] = useState<string>('');

  async function fetchTrackedCryptos() {
    const response = await fetch('/api/user/tracked-cryptos');
    const data = await response.json() as TrackedCrypto[];
    setTrackedCryptos(data);
  }

  useEffect(() => {
    fetchTrackedCryptos(); // Load tracked cryptos on mount
  }, []);

  const addCrypto = async () => {
    if (!newSymbol) return;

    // Ensure that the API call uses POST and includes the symbol in the body of the request
    await fetch('/api/user/tracked-cryptos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol: newSymbol.toUpperCase() }),
    });

    // Reset the Symbol input field and refetch tracked cryptos
    setNewSymbol('');
    await fetchTrackedCryptos();
  }

  return (
    <div>
      <h2 className="heading">Tracked Cryptocurrencies</h2>

      <div>
        <h3 className="text-xl font-semibold text-white">Add New Crypto</h3>
        <input
          type="text"
          value={newSymbol}
          onChange={(e) => setNewSymbol(e.target.value)}
          placeholder="Enter symbol (e.g. BTC, ETH, DOGE)"
        />
        <button
          onClick={addCrypto}
          className="button"
        >Add</button>
      </div>

      <ul>
        {trackedCryptos.map((crypto) => (
          <li key={crypto.symbol}>
            <CryptoPriceDisplay symbol={crypto.symbol} />
            <TradeSimulator symbol={crypto.symbol} />
          </li>
        ))}
      </ul>
    </div>
  );
}