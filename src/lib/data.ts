import categoriesData from '@/data/categories.json';
import type { Category, Fatwa } from './types';

// Import all fatwa files
import qunutFajr from '@/data/fatawa/qunut-fajr.json';
import wuduWipingSocks from '@/data/fatawa/wudu-wiping-socks.json';
import zakahJewelry from '@/data/fatawa/zakah-jewelry.json';
import combiningPrayers from '@/data/fatawa/combining-prayers-travel.json';
import tayammumConditions from '@/data/fatawa/tayammum-conditions.json';
import fastingInjection from '@/data/fatawa/fasting-injection.json';
import tawafWudu from '@/data/fatawa/tawaf-wudu.json';
import ribaBankInterest from '@/data/fatawa/riba-bank-interest.json';
import nikahWali from '@/data/fatawa/nikah-wali.json';
import musicRuling from '@/data/fatawa/music-ruling.json';

const allFatawa: Fatwa[] = [
  qunutFajr,
  wuduWipingSocks,
  zakahJewelry,
  combiningPrayers,
  tayammumConditions,
  fastingInjection,
  tawafWudu,
  ribaBankInterest,
  nikahWali,
  musicRuling,
] as Fatwa[];

export function getCategories(): Category[] {
  return categoriesData as Category[];
}

export function getAllFatawa(): Fatwa[] {
  return allFatawa;
}

export function getFatwaById(id: string): Fatwa | undefined {
  return allFatawa.find(f => f.id === id);
}

export function getFatawaByCategory(categoryId: string): Fatwa[] {
  return allFatawa.filter(f => f.categoryId === categoryId);
}

export function getCategory(id: string): Category | undefined {
  return (categoriesData as Category[]).find(c => c.id === id);
}
