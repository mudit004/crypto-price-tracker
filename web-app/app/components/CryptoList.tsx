// app/components/CryptoList.tsx
'use client';

import React from 'react';
import CryptoCard from './CryptoCard';
import LoadingSpinner from './LoadingSpinner';
import { CryptoData } from '../utils/cryptoApi';

interface CryptoListProps {
  cryptos: CryptoData[];
  loading: boolean;
  error?: string | null;
  refetch?: () => void;
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptos, loading, error, refetch }) => {
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">{error}</p>
        <p className="mt-2">Please try again later.</p>
        {refetch && (
          <button 
            onClick={() => refetch()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }
  
  if (cryptos.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">No cryptocurrencies found.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cryptos.map(crypto => (
        <CryptoCard key={crypto.id} crypto={crypto} />
      ))}
    </div>
  );
};

export default CryptoList;
