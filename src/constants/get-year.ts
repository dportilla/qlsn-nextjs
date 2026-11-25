import { cacheLife } from 'next/cache';

export async function getYear(): Promise<number> {
  'use cache';
  cacheLife('weeks');
  return new Date().getFullYear();
}
