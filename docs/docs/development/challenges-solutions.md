---
sidebar_position: 1
---

# Challenges & Solutions

During the development of the Crypto Price Tracker application, we encountered several challenges. This document outlines these challenges and how we addressed them.

## API Rate Limiting

### Challenge

The CoinGecko free API has strict rate limits (10-50 calls/minute depending on server load), which initially caused our application to hit rate limits during development and testing.

### Solution

1. **Implemented Server-Side Revalidation**: Used Next.js's `{ next: { revalidate: 60 } }` option to cache API responses for 60 seconds on the server.

2. **Optimized React Query Settings**: Set appropriate `staleTime` and `refetchInterval` values to prevent unnecessary API calls.

3. **Limited Default Cryptocurrencies**: Initially fetch only the top 5 cryptocurrencies to reduce data load.

4. **Added Error Handling**: Implemented robust error handling to gracefully handle rate limit errors.

```typescript
const response = await fetch(
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${defaultCryptos.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
  { next: { revalidate: 60 } }
);
```

## Search Performance

### Challenge

Initial implementation of search filtering caused performance issues when typing quickly, as it triggered API calls and state updates with each keystroke.

### Solution

1. **Debounced Search Input**: Implemented a custom debounce hook to delay search updates until typing pauses.

2. **Client-Side Filtering**: Moved filtering logic to the client side instead of requesting filtered data from the API.

3. **Memoized Filtered Results**: Used `useMemo` to prevent unnecessary re-filtering when unrelated state changes.

```typescript
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const filteredCryptos = useMemo(() => {
  if (!data?.data || !searchTerm) return data?.data || [];

  const lowercaseSearch = searchTerm.toLowerCase();
  return data.data.filter((crypto: CryptoData) =>
    crypto.name.toLowerCase().includes(lowercaseSearch) ||
    crypto.symbol.toLowerCase().includes(lowercaseSearch)
  );
}, [data, searchTerm]);
```

## Loading State Management

### Challenge

Multiple loading states (initial load, refresh, search) created a confusing user experience with flickering UI elements and multiple spinners.

### Solution

1. **Unified Loading State**: Combined different loading sources into a single `isLoading` state.

2. **Delayed Loading State Changes**: Added minimum durations for loading states to prevent flickering.

3. **Skeleton Loading**: Initially implemented skeleton loading placeholders for a smoother user experience.

```typescript
const isLoading = isQueryLoading || isRefreshing;

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
```

## URL-Based State Management

### Challenge

Implementing URL-based search state while maintaining a smooth user experience was challenging, especially with the interaction between URL updates and React Query refetching.

### Solution

1. **Next.js App Router Integration**: Used Next.js's new App Router and its hooks for cleaner URL parameter management.

2. **URL-Search Synchronization**: Implemented a clean pattern to keep input state and URL search parameters synchronized.

3. **Parallel State Tracking**: Maintained local input state alongside URL state for a responsive UI.

```typescript
useEffect(() => {
  const params = new URLSearchParams(searchParams.toString());

  if (debouncedSearchTerm) {
    params.set('search', debouncedSearchTerm);
  } else {
    params.delete('search');
  }

  const newUrl = `${pathname}?${params.toString()}`;
  router.push(newUrl);
}, [debouncedSearchTerm, pathname, router, searchParams]);
```

## Mobile Responsiveness

### Challenge

Creating a consistent experience across desktop and mobile devices was challenging, especially with the data-dense nature of cryptocurrency information.

### Solution

1. **Tailwind Responsive Classes**: Used Tailwind's responsive utility classes for adaptive layouts.

2. **Mobile-First Design**: Adopted a mobile-first approach to ensure the application works well on small screens first.

3. **Responsive Grid System**: Implemented a responsive grid that adjusts the number of columns based on screen size.

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {cryptos.map(crypto => (
    <CryptoCard key={crypto.id} crypto={crypto} />
  ))}
</div>
```

## Refresh Animation UX

### Challenge

Users needed visual feedback when manually refreshing data, but React Query's refetch operation is often too fast to show meaningful loading states.

### Solution

1. **Minimum Loading Duration**: Enforced a minimum duration for loading states during manual refresh.

2. **Button State Changes**: Changed button text and appearance during the refresh operation.

3. **Optimistic UI Updates**: Implemented optimistic UI updates for certain interactions.

```tsx
<button
  type="button"
  onClick={onRefresh}
  className={`${
    isLoading
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-green-600 hover:bg-green-700'
  } text-white font-medium py-3 px-6 rounded-lg transition-colors`}
  disabled={isLoading}
>
  {isLoading ? 'Refreshing...' : 'Refresh Prices'}
</button>
```

## Type Safety Across Boundaries

### Challenge

Maintaining type safety between the API layer, component props, and state management was challenging, with potential for type inconsistencies.

### Solution

1. **Shared Type Definitions**: Created a central `types.tsx` file with shared interfaces.

2. **TypeScript Generic Usage**: Used TypeScript generics with React Query to ensure type safety.

3. **Strict Type Checking**: Enabled strict type checking in the TypeScript configuration.

```typescript
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
```

## Lessons Learned

1. **API Integration Strategy**: Planning your API integration strategy early with considerations for rate limiting is crucial.

2. **State Management Decisions**: Choosing the right tool for each state management need (React Query for server state, URL for sharable state) improves code clarity.

3. **Performance Optimization**: Implementing debouncing, memoization, and optimistic UI updates significantly improves the user experience.

4. **Type Safety Investment**: Investing time in proper TypeScript types pays dividends in reduced bugs and improved developer experience.

5. **User Experience Details**: Small details like minimum loading durations and clear feedback for user actions make a big difference in perceived application quality.