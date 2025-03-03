# Search Bar Component

The `SearchBar` component provides a user interface for searching cryptocurrencies and refreshing price data. It includes debounced search functionality that updates the URL parameters for seamless sharing and bookmarking of search results.

## Component Overview

The search bar consists of:
- A text input field for entering search terms
- A clear button that appears when text is entered
- A refresh button to update cryptocurrency prices

## Props

| Prop | Type | Description |
|------|------|-------------|
| searchTerm | string | The current search term from URL parameters |
| isLoading | boolean | Loading state to disable input during data fetching |
| onRefresh | function | Callback function to trigger data refresh |

## Features

### Debounced Search

The component implements a debounced search mechanism to prevent excessive URL updates and API calls while the user is typing:

```tsx
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

const debouncedSearchTerm = useDebounce(inputValue, 300);
```

### URL Parameter Management

The component automatically updates the URL search parameters when the search term changes:

```tsx
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

This approach enables:
- Shareable URLs with search results
- Browser history tracking of searches
- Persistence of search terms on page reload

### Clear Button

The component displays a clear button (✕) when text is entered in the search field:

```tsx
{inputValue && !isLoading && (
  <button
    type="button"
    onClick={handleClear}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
  >
    ✕
  </button>
)}
```

### Refresh Functionality

The refresh button allows users to manually update cryptocurrency prices:

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

## Styling

The component uses Tailwind CSS for styling:
- Responsive layout with flex column on small screens and row on larger screens
- Visual feedback for interactive elements
- Proper disabled states during loading
- Clean positioning of the clear button