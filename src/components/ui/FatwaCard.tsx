import Link from 'next/link';
import type { Fatwa } from '@/lib/types';

interface FatwaCardProps {
  fatwa: Fatwa;
}

export default function FatwaCard({ fatwa }: FatwaCardProps) {
  return (
    <Link href={`/fatwa/${fatwa.id}`} className="block group">
      <div className="rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 group-hover:shadow-md group-hover:border-[var(--color-primary)] group-hover:-translate-y-0.5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
            {fatwa.titleTh}
          </h3>
          {fatwa.opinions.length > 0 && (
            <span className="shrink-0 inline-flex items-center rounded-full bg-[var(--color-primary-light)] px-2.5 py-0.5 text-xs font-medium text-[var(--color-primary)]">
              {fatwa.opinions.length} ทัศนะ
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 line-clamp-3 mb-3">
          {fatwa.summaryTh}
        </p>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-md bg-[var(--color-gold-light)] px-2 py-0.5 text-xs font-medium text-[var(--color-gold)]">
            {fatwa.categoryId}
          </span>
        </div>
      </div>
    </Link>
  );
}
