// app/utils/cryptoApi.tsx

export interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
  }
  
  const defaultCryptos = ['bitcoin', 'ethereum', 'ripple', 'cardano', 'solana'];
  
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
  