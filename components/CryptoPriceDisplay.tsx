'use client';

import { useState, useEffect } from 'react';

interface CryptoPriceDisplayProps {
  symbol: string;
}

export default function CryptoPriceDisplay({ symbol }: CryptoPriceDisplayProps) {
  const [price, setPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      try {
        setLoading(true);

        const response = await fetch(`/api/crypto/price?symbol=${symbol}`);
        const data = await response.json();

        if (response.ok) {
          setPrice(data.amount);
          setError(null);
        } else {
          setError(data.error || 'Failed to load price data');
        }
      } catch (error) {
        console.error('Error fetching price data: ', error);
        setError('Error fetching price data');
      } finally {
        setLoading(false);
      }
    }

    fetchPrice();
  }, [symbol]);

  return (
    <div className="">
      <h2 className="heading">{symbol} Price:&nbsp;
        {loading && <span className="loading">Loading...</span>}
        {error && <span className="error">{error}</span>}
        {price && !error && <span className="price">${price}</span>}
      </h2 >
    </div >
  );
}