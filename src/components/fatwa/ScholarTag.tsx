import type { ScholarAttribution } from '@/lib/types';

interface ScholarTagProps {
  scholar: ScholarAttribution;
}

const madhabColors: Record<string, string> = {
  hanafi: 'bg-[#22863A]/10 text-[#22863A] border-[#22863A]/30',
  shafii: 'bg-[#6F42C1]/10 text-[#6F42C1] border-[#6F42C1]/30',
  maliki: 'bg-[#0366D6]/10 text-[#0366D6] border-[#0366D6]/30',
  hanbali: 'bg-[#E36209]/10 text-[#E36209] border-[#E36209]/30',
};

const defaultColor = 'bg-gray-100 text-gray-600 border-gray-300/30';

export default function ScholarTag({ scholar }: ScholarTagProps) {
  const colorClass = scholar.madhab
    ? madhabColors[scholar.madhab] ?? defaultColor
    : defaultColor;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${colorClass}`}
      title={scholar.era ? `ยุค: ${scholar.era}` : undefined}
    >
      {scholar.name}
      {scholar.era && (
        <span className="opacity-60 text-[0.65rem]">({scholar.era})</span>
      )}
    </span>
  );
}
