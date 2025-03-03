---
sidebar_position: 2
---

# API Integration

This document explains how the Crypto Price Tracker application integrates with external APIs to fetch cryptocurrency data.

## CoinGecko API

The application uses the [CoinGecko API](https://www.coingecko.com/en/api/documentation) as its primary data source for cryptocurrency information. CoinGecko provides comprehensive cryptocurrency data including prices, market caps, and volume.

### API Endpoint

The main endpoint used is:

```
GET /coins/markets
```

This endpoint returns a list of coins with market data.

### Parameters Used

- `vs_currency`: USD (US Dollar)
- `ids`: List of cryptocurrency IDs (e.g., bitcoin, ethereum)
- `order`: market_cap_desc (ordered by market capitalization)
- `per_page`: 100 (maximum number of results per page)
- `page`: 1 (page number)
- `sparkline`: false (exclude sparkline data to reduce payload size)

## API Integration Implementation

### Backend Implementation

The API integration is implemented in two main files:

1. **app/utils/cryptoApi.tsx**: Contains the logic for fetching data from the CoinGecko API.
2. **app/api/cryptos/route.ts**: Creates a Next.js API route that serves as a middleware between the frontend and CoinGecko API.

Here's how the data is fetched from the CoinGecko API:

```typescript
export async function fetchCryptoData(searchTerm?: string): Promise<{
  data: CryptoData[];
  error?: string;
}> {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${defaultCryptos.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json() as CryptoData[];
    const filteredData = searchTerm 
      ? data.filter(crypto =>
          crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()))
      : data;
      
    return { data: filteredData };
  } catch (err) {
    console.error('Error fetching data:', err);
    return { 
      data: [],
      error: 'Failed to fetch cryptocurrency data'
    };
  }
}
```

The API route simply calls this function and returns the result:

```typescript
export async function GET() {
  const cryptoData = await fetchCryptoData();
  return NextResponse.json(cryptoData);
}
```

### Frontend Implementation

On the frontend, the application uses React Query to fetch, cache, and manage the cryptocurrency data:

```typescript
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
```

## Data Refresh Strategy

The application employs multiple strategies to keep data fresh:

1. **Server-Side Revalidation**: The API request to CoinGecko includes `{ next: { revalidate: 60 } }` which leverages Next.js's Incremental Static Regeneration to refresh the data every 60 seconds.

2. **Client-Side Polling**: React Query's `refetchInterval: 60000` setting ensures that data is refreshed every 60 seconds on the client-side.

3. **Manual Refresh**: The UI includes a "Refresh Prices" button that allows users to manually trigger a data refresh using React Query's `refetch` function.

## Error Handling

The API integration includes comprehensive error handling:

1. **Network Errors**: Caught and transformed into user-friendly error messages.
2. **API Response Validation**: The response is checked with `response.ok` to ensure successful API calls.
3. **UI Error States**: Error messages are displayed to users when API calls fail, with options to retry.

## Rate Limiting Considerations

CoinGecko's free API has rate limits. To avoid exceeding these limits, the application:

1. Limits the number of cryptocurrencies fetched
2. Implements caching with React Query
3. Uses server-side revalidation to reduce the number of direct API calls
4. Sets reasonable refresh intervals

## Future Improvements

Potential improvements to the API integration include:

1. Implementing a more robust caching strategy
2. Adding support for more cryptocurrencies
3. Integrating additional endpoints for detailed cryptocurrency information
4. Adding API key authentication for higher rate limits
5. Implementing fallback data sources if the primary API is unavailable