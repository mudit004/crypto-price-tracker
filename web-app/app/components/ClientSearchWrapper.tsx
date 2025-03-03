// app/components/ClientSearchWrapper.tsx
'use client';

import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CryptoList from './CryptoList';
import SearchBar from './SearchBar';
import { useCryptoQuery } from '../hooks/useCryptoQuery';
import { CryptoData } from '../utils/cryptoApi';

const ClientSearchWrapper: React.FC = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { data, isLoading: isQueryLoading, error, refetch } = useCryptoQuery();
  
  // Combined loading state
  const isLoading = isQueryLoading || isRefreshing;

  const filteredCryptos = useMemo(() => {
    if (!data?.data || !searchTerm) return data?.data || [];

    const lowercaseSearch = searchTerm.toLowerCase();
    return data.data.filter((crypto: CryptoData) =>
      crypto.name.toLowerCase().includes(lowercaseSearch) ||
      crypto.symbol.toLowerCase().includes(lowercaseSearch)
    );
  }, [data, searchTerm]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      await refetch();
    } finally {
      setTimeout(() => {
        setIsRefreshing(false);
      }, 300);
    }
  };

  return (
    <>
      <SearchBar 
        searchTerm={searchTerm} 
        isLoading={isLoading} 
        onRefresh={handleRefresh}
      />
      
      <CryptoList 
        cryptos={filteredCryptos || []}
        loading={isLoading}
        error={error instanceof Error ? error.message : data?.error || null}
        refetch={refetch}
      />
    </>
  );
};

export default ClientSearchWrapper;