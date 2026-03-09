import Fuse, { type IFuseOptions, type FuseResultMatch } from 'fuse.js';
import type { Fatwa } from './types';
import { getAllFatawa } from './data';

const fuseOptions: IFuseOptions<Fatwa> = {
  keys: [
    { name: 'titleTh', weight: 2.0 },
    { name: 'titleAr', weight: 1.5 },
    { name: 'keywords', weight: 1.8 },
    { name: 'summaryTh', weight: 1.2 },
    { name: 'introduction', weight: 0.8 },
    { name: 'opinions.position', weight: 1.0 },
    { name: 'opinions.positionAr', weight: 0.8 },
    { name: 'opinions.scholars.name', weight: 1.0 },
    { name: 'opinions.scholars.nameAr', weight: 0.8 },
    { name: 'opinions.explanation', weight: 0.6 },
    { name: 'opinions.evidence.translationTh', weight: 0.5 },
  ],
  threshold: 0.4,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  useExtendedSearch: false,
  ignoreLocation: true,
};

let fuseInstance: Fuse<Fatwa> | null = null;

function getFuseInstance(): Fuse<Fatwa> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(getAllFatawa(), fuseOptions);
  }
  return fuseInstance;
}

export interface SearchResult {
  fatwa: Fatwa;
  score: number;
  matches: readonly FuseResultMatch[] | undefined;
}

export function searchFatawa(query: string): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const fuse = getFuseInstance();
  const results = fuse.search(query.trim());

  return results.map((result) => ({
    fatwa: result.item,
    score: result.score ?? 1,
    matches: result.matches ?? undefined,
  }));
}

export function searchByKeyword(keyword: string): Fatwa[] {
  const allFatawa = getAllFatawa();
  const lowerKeyword = keyword.toLowerCase();

  return allFatawa.filter(
    (fatwa) =>
      fatwa.keywords.some((k) => k.toLowerCase().includes(lowerKeyword)) ||
      fatwa.titleTh.toLowerCase().includes(lowerKeyword) ||
      fatwa.titleAr.includes(keyword)
  );
}
