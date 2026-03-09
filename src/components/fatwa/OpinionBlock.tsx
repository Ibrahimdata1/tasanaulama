import type { Opinion } from '@/lib/types';
import ScholarTag from './ScholarTag';
import EvidenceItem from './EvidenceItem';

interface OpinionBlockProps {
  opinion: Opinion;
  index: number;
}

const madhabBorderColors: Record<string, string> = {
  hanafi: 'border-l-[var(--color-hanafi)]',
  shafii: 'border-l-[var(--color-shafii)]',
  maliki: 'border-l-[var(--color-maliki)]',
  hanbali: 'border-l-[var(--color-hanbali)]',
};

export default function OpinionBlock({ opinion, index }: OpinionBlockProps) {
  const firstScholarMadhab = opinion.scholars[0]?.madhab;
  const borderColor = firstScholarMadhab
    ? madhabBorderColors[firstScholarMadhab] ?? 'border-l-gray-400'
    : 'border-l-gray-400';

  return (
    <div className={`rounded-lg border border-gray-200 bg-white border-l-4 ${borderColor} overflow-hidden`}>
      <div className="p-5 space-y-4">
        {/* Header */}
        <h3 className="font-bold text-[var(--color-ink)] text-lg">
          ทัศนะที่ {index + 1}: {opinion.position}
        </h3>

        {/* Scholars */}
        {opinion.scholars.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {opinion.scholars.map((scholar, i) => (
              <ScholarTag key={`${scholar.name}-${i}`} scholar={scholar} />
            ))}
          </div>
        )}

        {/* Evidence */}
        {opinion.evidence.length > 0 && (
          <details className="group">
            <summary className="cursor-pointer select-none text-sm font-medium text-[var(--color-primary)] hover:underline">
              หลักฐาน ({opinion.evidence.length} รายการ)
            </summary>
            <div className="mt-3 space-y-3">
              {opinion.evidence.map((ev, i) => (
                <EvidenceItem key={`${ev.type}-${i}`} evidence={ev} />
              ))}
            </div>
          </details>
        )}

        {/* Explanation */}
        {opinion.explanation && (
          <p className="text-sm text-gray-600 italic leading-relaxed border-t border-gray-100 pt-3">
            {opinion.explanation}
          </p>
        )}
      </div>
    </div>
  );
}
