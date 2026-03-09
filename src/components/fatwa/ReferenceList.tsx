import { ExternalLink } from 'lucide-react';
import type { Reference } from '@/lib/types';

interface ReferenceListProps {
  references: Reference[];
}

export default function ReferenceList({ references }: ReferenceListProps) {
  if (references.length === 0) return null;

  return (
    <div className="mt-3 border-t border-gray-200 pt-3">
      <p className="text-xs font-semibold text-gray-500 mb-2">📚 อ้างอิง:</p>
      <ol className="list-decimal list-inside space-y-2">
        {references.map((ref, i) => (
          <li key={i} className="text-xs text-gray-600 leading-relaxed">
            <span className="font-bold text-gray-800">{ref.bookTh}</span>
            {ref.bookAr && (
              <span className="text-gray-400 mr-1"> ({ref.bookAr})</span>
            )}
            {ref.author && <span> — {ref.author}</span>}
            {ref.volume != null && <span>, เล่ม {ref.volume}</span>}
            {ref.page != null && <span>, หน้า {ref.page}</span>}
            {ref.url && (
              <a
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-md bg-[var(--color-primary-light)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-colors font-medium"
              >
                กดอ่าน <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
