---
sidebar_position: 1
---

# Project Structure

This document outlines the overall structure of the Crypto Price Tracker application, explaining the purpose of key files and directories.

## Directory Structure

```
crypto-price-tracker/
├── app/
│   ├── api/
│   │   └── cryptos/
│   │       └── route.ts           # API route handler for cryptocurrency data
│   ├── components/
│   │   ├── ClientSearchWrapper.tsx # Client-side wrapper for search functionality
│   │   ├── CryptoCard.tsx         # Component for displaying individual crypto information
│   │   ├── CryptoList.tsx         # Component for rendering the list of cryptocurrencies
│   │   ├── LoadingSpinner.tsx     # Loading indicator component
│   │   └── SearchBar.tsx          # Search input component
│   ├── hooks/
│   │   └── useCryptoQuery.tsx     # Custom hook for crypto data fetching
│   ├── utils/
│   │   └── cryptoApi.tsx          # API interaction utilities
│   ├── globals.css                # Global CSS styles
│   ├── layout.tsx                 # Root layout component
│   ├── page.tsx                   # Home page component
│   ├── providers.tsx              # React Query provider setup
│   └── types.tsx                  # TypeScript type definitions
├── public/
│   └── ...                        # Static assets
├── .env.local                     # Environment variables (not in version control)
├── next.config.js                 # Next.js configuration
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
└── tailwind.config.js            # Tailwind CSS configuration
```

## Key Components

### API Layer

- **route.ts**: Handles the API route `/api/cryptos`, which fetches data from the CoinGecko API and returns it to the client.
- **cryptoApi.tsx**: Contains the `fetchCryptoData` function which interfaces with the CoinGecko API and handles the API responses and errors.

### UI Components

- **ClientSearchWrapper.tsx**: Client-side component that manages the search state and filtering of cryptocurrency data.
- **CryptoCard.tsx**: Card component that displays information about a single cryptocurrency, including price, change percentage, and market data.
- **CryptoList.tsx**: Grid component that renders multiple CryptoCard components.
- **SearchBar.tsx**: Input component with debounce functionality for searching cryptocurrencies.
- **LoadingSpinner.tsx**: Visual indicator shown during data loading.

### State Management

- **useCryptoQuery.tsx**: Custom React Query hook for fetching, caching, and refreshing cryptocurrency data.
- **providers.tsx**: Sets up the React Query provider with default configuration.

### Page Structure

- **layout.tsx**: Root layout component that wraps the entire application and includes global providers.
- **page.tsx**: Main page component with the application title and the ClientSearchWrapper component.

## Data Flow

1. The application starts with **page.tsx**, which renders the ClientSearchWrapper component.
2. ClientSearchWrapper uses the useCryptoQuery hook to fetch data from the /api/cryptos endpoint.
3. The API route in route.ts calls fetchCryptoData to get data from the CoinGecko API.
4. The cryptocurrency data is filtered based on the search term in ClientSearchWrapper.
5. The filtered data is passed to CryptoList, which renders a CryptoCard for each cryptocurrency.
6. The SearchBar component updates the URL search parameters, which triggers filtering in ClientSearchWrapper.