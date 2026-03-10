import categoriesData from '@/data/categories.json';
import allFatawaData from '@/data/all-fatawa.json';
import type { Category, Fatwa } from './types';

const allFatawa = allFatawaData as Fatwa[];

export function getCategories(): Category[] {
  return categoriesData as Category[];
}

export function getAllFatawa(): Fatwa[] {
  return allFatawa;
}

export function getFatwaById(id: string): Fatwa | undefined {
  return allFatawa.find((f) => f.id === id);
}

export function getFatawaByCategory(categoryId: string): Fatwa[] {
  return allFatawa.filter((f) => f.categoryId === categoryId);
}

export function getFatawaBySubcategory(categoryId: string, subcategoryId: string): Fatwa[] {
  return allFatawa.filter(
    (f) => f.categoryId === categoryId && f.subcategoryId === subcategoryId
  );
}

export function getCategory(id: string): Category | undefined {
  return (categoriesData as Category[]).find((c) => c.id === id);
}
