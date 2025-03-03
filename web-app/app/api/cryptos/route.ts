import { NextResponse } from 'next/server';
import { fetchCryptoData } from '@/app/utils/cryptoApi';

export async function GET() {
  const cryptoData = await fetchCryptoData();
  return NextResponse.json(cryptoData);
}
