# Crypto Card Component

The `CryptoCard` component displays detailed information about a cryptocurrency in an attractive card format. Each card is clickable and links to the relevant blockchain explorer for that cryptocurrency.

## Component Overview

The component renders a card with the following information:
- Cryptocurrency logo
- Name and symbol
- Current price in USD
- 24-hour price change percentage (with color coding)
- Market cap
- 24-hour trading volume
- A link to the cryptocurrency's blockchain explorer

## Props

| Prop | Type | Description |
|------|------|-------------|
| crypto | CryptoData | Object containing cryptocurrency data |

The `CryptoData` interface is imported from `../utils/cryptoApi` and includes:
- `id`: Unique identifier for the cryptocurrency
- `name`: Full name of the cryptocurrency
- `symbol`: Trading symbol (e.g., BTC, ETH)
- `image`: URL to the cryptocurrency logo
- `current_price`: Current price in USD
- `price_change_percentage_24h`: 24-hour price change percentage
- `market_cap`: Total market capitalization
- `total_volume`: 24-hour trading volume

## Usage Example

```tsx
import CryptoCard from './CryptoCard';
import { CryptoData } from '../utils/cryptoApi';

const bitcoin: CryptoData = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'btc',
  image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  current_price: 45000,
  price_change_percentage_24h: 2.5,
  market_cap: 850000000000,
  total_volume: 25000000000
};

<CryptoCard crypto={bitcoin} />
```

## Features

### Dynamic Explorer Links

The component includes a `getExplorerUrl` function that returns the appropriate blockchain explorer URL based on the cryptocurrency ID:

```tsx
const getExplorerUrl = (id: string) => {
  switch (id) {
    case 'bitcoin':
      return 'https://www.blockchain.com/explorer';
    case 'ethereum':
      return 'https://etherscan.io/';
    case 'ripple':
      return 'https://xrpscan.com/';
    case 'cardano':
      return 'https://cardanoscan.io/';
    case 'solana':
      return 'https://solscan.io/';
    default:
      return `https://www.coingecko.com/en/coins/${id}`;
  }
};
```

### Price Change Color Coding

The component visually indicates positive (green) or negative (red) price changes:

```tsx
const priceChangeClass = crypto.price_change_percentage_24h >= 0
  ? 'text-green-600'
  : 'text-red-600';
```

## Styling

The component uses Tailwind CSS for styling, providing:
- Responsive hover effects
- Clean typography
- Proper spacing and alignment
- Grid layout for market data