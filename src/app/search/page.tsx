'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import SearchBar from '@/components/ui/SearchBar';
import FatwaCard from '@/components/ui/FatwaCard';
import { searchFatawa, type SearchResult } from '@/lib/search';
import { getAllFatawa } from '@/lib/data';
import type { Fatwa } from '@/lib/types';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';
  const [results, setResults] = useState<Fatwa[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      const searchResults: SearchResult[] = searchFatawa(query);
      setResults(searchResults.map((r) => r.fatwa));
      setSearched(true);
    } else {
      setResults(getAllFatawa());
      setSearched(false);
    }
  }, [query]);

  return (
    <div className="ebook-page">
      {/* Search bar */}
      <section className="py-8">
        <SearchBar size="sm" defaultValue={query} placeholder="ค้นหาฟัตวา..." />
      </section>

      {/* Results */}
      <section className="py-4 pb-16">
        {searched && (
          <p className="text-sm text-gray-500 mb-6">
            {results.length > 0
              ? `พบ ${results.length} ผลลัพธ์`
              : 'ไม่พบผลลัพธ์'}
          </p>
        )}

        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((fatwa) => (
              <FatwaCard key={fatwa.id} fatwa={fatwa} />
            ))}
          </div>
        ) : (
          searched && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg mb-2">ไม่พบผลลัพธ์</p>
              <p className="text-gray-400 text-sm">
                ลองค้นหาด้วยคำอื่น เช่น &quot;กุนูต&quot; หรือ &quot;ซะกาต&quot;
              </p>
            </div>
          )
        )}
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="ebook-page py-16 text-center text-gray-400">
          กำลังโหลด...
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
