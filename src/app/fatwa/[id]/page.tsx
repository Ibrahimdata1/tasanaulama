import { notFound } from 'next/navigation';
import {
  getAllFatawa,
  getFatwaById,
  getCategory,
} from '@/lib/data';
import ReadingProgress from '@/components/ui/ReadingProgress';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SummaryBox from '@/components/fatwa/SummaryBox';
import OpinionBlock from '@/components/fatwa/OpinionBlock';
import FatwaCard from '@/components/ui/FatwaCard';
import { ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

export function generateStaticParams() {
  const fatwas = getAllFatawa();
  return fatwas.map((f) => ({ id: f.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const fatwa = getFatwaById(id);
  if (!fatwa) {
    return { title: 'ไม่พบฟัตวา' };
  }
  return {
    title: `${fatwa.titleTh} — ฟัตวาออนไลน์`,
    description: fatwa.summaryTh,
    keywords: fatwa.keywords,
  };
}

export default async function FatwaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fatwaData = getFatwaById(id);

  if (!fatwaData) {
    notFound();
  }

  const fatwa = fatwaData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sourceUrl = (fatwa as any).sourceUrl as string | undefined;
  const category = getCategory(fatwa.categoryId);
  const relatedFatwas = (fatwa.relatedFatwaIds ?? [])
    .map((rid) => getFatwaById(rid))
    .filter(Boolean);

  return (
    <>
      <ReadingProgress />

      <article className="ebook-page">
        {/* Breadcrumb */}
        <div className="pt-6 pb-2">
          <Breadcrumb
            items={[
              { label: 'หน้าแรก', href: '/' },
              ...(category
                ? [
                    {
                      label: category.nameTh,
                      href: `/category/${category.id}`,
                    },
                  ]
                : []),
              { label: fatwa.titleTh },
            ]}
          />
        </div>

        {/* Title */}
        <header className="py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-ink)] leading-snug mb-3">
            {fatwa.titleTh}
          </h1>
          <p className="arabic-text text-xl md:text-2xl text-gray-400">
            {fatwa.titleAr}
          </p>
        </header>

        {/* Summary */}
        <SummaryBox summary={fatwa.summaryTh} />

        <div className="section-divider" aria-hidden="true" />

        {/* Introduction */}
        <section className="py-6">
          <p className="text-base md:text-lg leading-loose text-[var(--color-ink)]/90 first-letter:text-3xl first-letter:font-bold first-letter:text-[var(--color-primary)] first-letter:mr-1">
            {fatwa.introduction}
          </p>
        </section>

        <div className="section-divider" aria-hidden="true" />

        {/* Opinions */}
        <section className="py-6">
          <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-2">
            ทัศนะของอุละมาอฺ
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            ประเด็นนี้มี {fatwa.opinions.length} ทัศนะ
          </p>

          <div className="space-y-2">
            {fatwa.opinions.map((opinion, index) => (
              <div key={opinion.id}>
                <OpinionBlock opinion={opinion} index={index} />
                {index < fatwa.opinions.length - 1 && (
                  <div className="section-divider" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Related Fatwas */}
        {relatedFatwas.length > 0 && (
          <>
            <div className="section-divider" aria-hidden="true" />

            <section className="py-6">
              <h2 className="text-xl font-bold text-[var(--color-ink)] mb-6">
                ประเด็นที่เกี่ยวข้อง
              </h2>
              <div className="space-y-4">
                {relatedFatwas.map(
                  (related) =>
                    related && (
                      <FatwaCard key={related.id} fatwa={related} />
                    )
                )}
              </div>
            </section>
          </>
        )}

        <div className="section-divider" aria-hidden="true" />

        {/* Source verification link */}
        {sourceUrl && (
          <section className="py-4">
            <div className="rounded-lg border border-[var(--color-primary)]/20 bg-[var(--color-primary-light)] p-4">
              <p className="text-sm font-medium text-[var(--color-primary)] mb-2">
                ตรวจสอบข้อมูลจากแหล่งอ้างอิง
              </p>
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline font-medium"
              >
                ดูข้อมูลฉบับเต็มที่ dorar.net (สารานุกรมฟิกฮ์) <ExternalLink className="h-4 w-4" />
              </a>
              <p className="text-xs text-gray-500 mt-2">
                dorar.net เป็นสารานุกรมฟิกฮ์เปรียบเทียบที่รวบรวมทัศนะของอุละมาอฺพร้อมหลักฐาน
              </p>
            </div>
          </section>
        )}

        {/* Disclaimer */}
        <section className="py-4">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs text-amber-700">
              ⚠️ ข้อมูลในหน้านี้รวบรวมโดย AI เพื่อการศึกษา ควรตรวจสอบกับอุละมาอฺ (ผู้รู้) ก่อนนำไปปฏิบัติ
              ลิงก์อ้างอิงทั้งหมดสามารถกดไปดูข้อมูลต้นฉบับได้
            </p>
          </div>
        </section>

        {/* Last Updated */}
        <footer className="py-6 pb-16 text-center">
          <p className="text-xs text-gray-400">
            ปรับปรุงล่าสุด: {fatwa.lastUpdated}
          </p>
        </footer>
      </article>
    </>
  );
}
