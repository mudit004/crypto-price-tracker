---
sidebar_position: 3
---

# State Management

This document explains the state management approach used in the Crypto Price Tracker application, focusing on the decision to use React Query for server state management.

## State Management Needs

The Crypto Price Tracker application has several state management requirements:

1. **Server State**: Cryptocurrency data fetched from external APIs
2. **UI State**: Loading states, error messages, and search input
3. **URL State**: Search parameters that should be shareable and bookmarkable

## React Query for Server State

### Why React Query?

We chose [React Query](https://tanstack.com/query/latest) for managing server state in this application for several key reasons:

1. **Declarative Data Fetching**: React Query provides a declarative way to fetch, cache, and update data with minimal boilerplate.

2. **Automatic Caching**: It automatically caches query results and provides them instantly while refetching in the background.

3. **Background Polling**: Easy implementation of automatic data refreshing at regular intervals.

4. **Loading & Error States**: Built-in loading and error states that eliminate the need for manual tracking.

5. **Refetch Capabilities**: Simple API for manual refetching when needed (e.g., "Refresh Prices" button).

6. **Stale Data Handling**: Smart handling of stale data with configurable staleTime.

### Implementation

The React Query setup is implemented in two main files:

1. **app/providers.tsx**: Sets up the QueryClient and QueryClientProvider.

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,      
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

2. **app/hooks/useCryptoQuery.tsx**: Custom hook for fetching cryptocurrency data.

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

## URL-Based Search State

For search functionality, we chose to use URL-based state management:

1. **Search Parameters in URL**: Search terms are stored in the URL's query parameters.
2. **Next.js Router Hooks**: We use `useSearchParams`, `usePathname`, and `useRouter` to read and update the URL.

This approach has several advantages:
- Search results are shareable via URL
- Browser navigation (back/forward) works with search history
- Page refreshes maintain the search state

Implementation in **app/components/SearchBar.tsx**:

```typescript
const router = useRouter();
const pathname = usePathname();
const searchParams = useSearchParams();
const [inputValue, setInputValue] = useState(searchTerm);

const debouncedSearchTerm = useDebounce(inputValue, 300);

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

## Local UI State

For local UI state that doesn't need to be persisted or shared, we use React's built-in `useState` hook:

1. **Loading States**: Additional loading states for UI operations (e.g., manual refresh).
2. **Input Values**: Temporary input values before they're committed to URL state.

Example from **app/components/ClientSearchWrapper.tsx**:

```typescript
const [isRefreshing, setIsRefreshing] = useState(false);

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

## Memoization for Derived State

For derived state based on existing state, we use React's `useMemo` hook to optimize performance:

```typescript
const filteredCryptos = useMemo(() => {
  if (!data?.data || !searchTerm) return data?.data || [];

  const lowercaseSearch = searchTerm.toLowerCase();
  return data.data.filter((crypto: CryptoData) =>
    crypto.name.toLowerCase().includes(lowercaseSearch) ||
    crypto.symbol.toLowerCase().includes(lowercaseSearch)
  );
}, [data, searchTerm]);
```

## Why Not Other State Management Solutions?

### Why Not Redux?

1. **Overhead**: Redux would introduce unnecessary complexity for this application.
2. **Boilerplate**: Redux requires more boilerplate code for async operations.
3. **Server State**: Redux is not specialized for handling server state with caching, refetching, etc.

### Why Not Context API Alone?

1. **Caching**: Context API doesn't provide caching mechanisms for API data.
2. **Refetching Logic**: Would require custom implementation of refetching logic.
3. **Loading/Error States**: Would need manual tracking of loading and error states.

### Why Not Zustand?

1. **Server State Focus**: While Zustand is excellent for client state, it doesn't specialize in server state.
2. **Built-in Features**: Lacks the built-in features of React Query for data fetching, caching, and refetching.

## Summary

Our state management approach combines:

1. **React Query** for server state (API data, loading states, errors)
2. **URL Query Parameters** for shareable, persistent UI state (search terms)
3. **React's useState** for local, ephemeral UI state
4. **useMemo** for efficiently derived state

This combination provides a clean, efficient, and maintainable approach to state management that meets all the requirements of the Crypto Price Tracker application without introducing unnecessary complexity.