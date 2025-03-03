// app/components/SearchBar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  searchTerm: string;
  isLoading: boolean;
  onRefresh: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  isLoading,
  onRefresh
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchTerm);

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

  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search cryptocurrency..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          disabled={isLoading}
        />
        {inputValue && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
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
    </div>
  );
};

export default SearchBar;