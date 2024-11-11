import fetch from 'node-fetch';

const COINBASE_API_URL = process.env.COINBASE_API_URL;

// Interface for the specific price data we need
export interface CryptoPrice {
  base: string;
  currency: string;
  amount: string;
}

// Interface for the full response from Coinbase
interface CoinbaseResponse {
  data: CryptoPrice;
}

export async function getCoinbasePrice(cryptoSymbol: string, currency: string) : Promise<CryptoPrice | null> {
  try {
    const response = await fetch(`${COINBASE_API_URL}/prices/${cryptoSymbol}-${currency}/spot`);

    if (!response.ok) {
      console.error('Error fetching Coinbase price: ', response.statusText);
      return null;
    }

    const data = (await response.json()) as CoinbaseResponse;

    return data.data ?? null;
  } catch(error) {
    console.error('Error fetching Coinbase price: ', error);

    return null;
  }
}
