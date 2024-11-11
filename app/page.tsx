import CryptoPriceDisplay from '@/components/CryptoPriceDisplay';

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to MyCryptoAdvisor</h1>
      <p>Your Cryptocurrency aggregation tool is under construction.</p>
      <br /><br />
      <CryptoPriceDisplay symbol="ETH" />
    </main>
  );
}