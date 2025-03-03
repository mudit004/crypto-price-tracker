// app/components/CryptoCard.tsx
import React from 'react';
import Link from 'next/link';
import { CryptoData } from '../utils/cryptoApi';

interface CryptoCardProps {
  crypto: CryptoData;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  const priceChangeClass = crypto.price_change_percentage_24h >= 0
    ? 'text-green-600'
    : 'text-red-600';
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

  return (
    <Link
      href={getExplorerUrl(crypto.id)}
      target="_blank"
      className="block"
    >
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-center gap-3">
          <img
            src={crypto.image}
            alt={`${crypto.name} logo`}
            className="w-10 h-10"
          />
          <div>
            <h3 className="font-bold text-lg">{crypto.name}</h3>
            <p className="text-gray-500 uppercase">{crypto.symbol}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-2xl font-bold">${crypto.current_price.toLocaleString()}</p>
          <p className={`font-semibold ${priceChangeClass}`}>
            {crypto.price_change_percentage_24h.toFixed(2)}% (24h)
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Market Cap</p>
            <p className="font-medium">${crypto.market_cap.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Volume (24h)</p>
            <p className="font-medium">${crypto.total_volume.toLocaleString()}</p>
          </div>
        </div>

        <div className="mt-3 text-center">
          <span className="text-blue-600 text-sm font-medium">
            View {crypto.name} Explorer →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CryptoCard;