// app/page.tsx
import React, { Suspense } from 'react';
import ClientSearchWrapper from './components/ClientSearchWrapper';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-extrabold mb-4 text-center">Crypto Price Tracker</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 text-center">
        Live prices of top cryptocurrencies
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <ClientSearchWrapper />
      </Suspense>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Data provided by CoinGecko API</p>
      </footer>
    </main>
  );
}
