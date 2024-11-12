'use client';

import { useState, useEffect } from 'react';
import CryptoPriceDisplay from '@/components/CryptoPriceDisplay';
import TradeSimulator from '@/components/TradeSimulator';
import RemoveTrackedCrypto from '@/components/RemoveTrackedCrypto';

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

  const removeCrypto = (symbol: string) => {
    setTrackedCryptos(trackedCryptos.filter((crypto) => crypto.symbol !== symbol));
  }

  return (
    <div>
      <div className="my-12 md:my-16">
        <div className="w-auto text-center">
          <h2 className="text-sm font-thin tracking-tighter text-white ml-[.1rem]">TRACK YOUR CRYPTOS</h2>
          <input
            type="text"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            placeholder="Enter Symbol"
          />
          <button
            onClick={addCrypto}
            className="button"
          >TRACK</button>
        </div>
      </div>

      <ul className="flex space-x-2">
        {trackedCryptos.map((crypto) => (
          <li key={crypto.symbol} className="box w-[385px]">
            <CryptoPriceDisplay symbol={crypto.symbol} />
            <TradeSimulator symbol={crypto.symbol} />
            <RemoveTrackedCrypto symbol={crypto.symbol} onRemove={removeCrypto} />
          </li>
        ))}
      </ul>
    </div>
  );
}