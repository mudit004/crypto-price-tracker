// app/hooks/useCryptoQuery.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { CryptoData } from '../utils/cryptoApi';

export function useCryptoQuery() {
  return useQuery<{ data: CryptoData[], error?: string }>({
    queryKey: ['cryptoData'],
    queryFn: async () => {
      const response = await fetch('/api/cryptos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    refetchInterval: 60000,
  });
}

