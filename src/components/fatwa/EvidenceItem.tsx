import { ExternalLink } from 'lucide-react';
import type { Evidence } from '@/lib/types';
import ReferenceList from './ReferenceList';

interface EvidenceItemProps {
  evidence: Evidence;
}

function TypeBadge({ label, emoji }: { label: string; emoji: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-[var(--color-gold-light)] px-2 py-0.5 text-xs font-medium text-[var(--color-gold)]">
      <span>{emoji}</span>
      {label}
    </span>
  );
}

function GradingBadge({ grading }: { grading: string }) {
  const lower = grading.toLowerCase();
  let color = 'bg-gray-100 text-gray-600';
  if (lower.includes('صحيح') || lower.includes('ศอฮีฮฺ') || lower === 'sahih') {
    color = 'bg-green-100 text-green-700';
  } else if (lower.includes('حسن') || lower.includes('ฮะสัน') || lower === 'hasan') {
    color = 'bg-yellow-100 text-yellow-700';
  } else if (lower.includes('ضعيف') || lower.includes('เฎาะอีฟ') || lower === 'daif') {
    color = 'bg-red-100 text-red-700';
  }
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${color}`}>
      {grading}
    </span>
  );
}

export default function EvidenceItem({ evidence }: EvidenceItemProps) {
  return (
    <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
      {/* Quran */}
      {evidence.type === 'quran' && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge emoji="📖" label="อัลกุรอาน" />
            {evidence.surahName && (
              <span className="text-xs text-gray-500">
                สูเราะฮฺ {evidence.surahName} {evidence.surahNumber}:{evidence.ayahRange ?? evidence.ayahNumber}
              </span>
            )}
          </div>
          {evidence.textAr && (
            <div className="arabic-text rounded-md bg-white p-3 text-right text-lg leading-loose" dir="rtl">
              {evidence.textAr}
            </div>
          )}
          <p className="text-gray-700">{evidence.translationTh}</p>
          {evidence.references?.some(r => r.url) ? (
            evidence.references.filter(r => r.url).map((ref, i) => (
              <a
                key={i}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline"
              >
                อ่านใน Quran.com <ExternalLink className="h-3 w-3" />
              </a>
            ))
          ) : evidence.surahNumber && evidence.ayahNumber ? (
            <a
              href={`https://quran.com/${evidence.surahNumber}/${evidence.ayahNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline"
            >
              อ่านใน Quran.com <ExternalLink className="h-3 w-3" />
            </a>
          ) : null}
        </>
      )}

      {/* Hadith */}
      {evidence.type === 'hadith' && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge emoji="📜" label={evidence.hadithCollection ?? 'หะดีษ'} />
            {evidence.hadithNumber && (
              <span className="text-xs text-gray-500">
                หมายเลข {evidence.hadithNumber}
              </span>
            )}
            {evidence.grading && <GradingBadge grading={evidence.grading} />}
          </div>
          {evidence.narrator && (
            <p className="text-xs text-gray-500">ผู้รายงาน: {evidence.narrator}</p>
          )}
          {evidence.textAr && (
            <div className="arabic-text rounded-md bg-white p-3 text-right text-lg leading-loose" dir="rtl">
              {evidence.textAr}
            </div>
          )}
          <p className="text-gray-700">{evidence.translationTh}</p>
          {evidence.references?.some(r => r.url) ? (
            evidence.references.filter(r => r.url).map((ref, i) => (
              <a
                key={i}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline mr-3"
              >
                อ่านหะดีษต้นฉบับ ({ref.bookTh}) <ExternalLink className="h-3 w-3" />
              </a>
            ))
          ) : null}
        </>
      )}

      {/* Athar */}
      {evidence.type === 'athar' && (
        <>
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge emoji="👤" label="อาษาร" />
            {evidence.source && (
              <span className="text-xs text-gray-500">{evidence.source}</span>
            )}
          </div>
          {evidence.textAr && (
            <div className="arabic-text rounded-md bg-white p-3 text-right text-lg leading-loose" dir="rtl">
              {evidence.textAr}
            </div>
          )}
          <p className="text-gray-700">{evidence.translationTh}</p>
        </>
      )}

      {/* Ijma, Qiyas, Istihsan, Maslaha */}
      {['ijma', 'qiyas', 'istihsan', 'maslaha'].includes(evidence.type) && (
        <>
          <TypeBadge emoji="💡" label={evidence.type} />
          {evidence.reasoning && (
            <p className="text-gray-700">{evidence.reasoning}</p>
          )}
          <p className="text-gray-700">{evidence.translationTh}</p>
        </>
      )}

      {/* References */}
      {(evidence.references?.length ?? 0) > 0 && (
        <ReferenceList references={evidence.references} />
      )}
    </div>
  );
}
