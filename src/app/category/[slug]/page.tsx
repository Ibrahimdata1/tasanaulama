import { notFound } from 'next/navigation';
import { getCategories, getCategory, getFatawaBySubcategory } from '@/lib/data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FatwaCard from '@/components/ui/FatwaCard';
import SubcategoryTabs from '@/components/ui/SubcategoryTabs';
import {
  Droplets,
  Moon,
  Coins,
  Sun,
  Mountain,
  Briefcase,
  Heart,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import type { Metadata } from 'next';

const iconMap: Record<string, LucideIcon> = {
  Droplets, Moon, Coins, Sun, Mountain, Briefcase, Heart, BookOpen,
};

export function generateStaticParams() {
  return getCategories().map((cat) => ({ slug: cat.id }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const category = getCategory(slug);
    return {
      title: category ? `${category.nameTh} — ทัศนะอุละมาอฺ` : 'ไม่พบหมวดหมู่',
      description: category?.description,
    };
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();

  const Icon = iconMap[category.icon] ?? BookOpen;

  // pre-compute fatawa per subcategory
  const subsWithData = category.subcategories.map((sub) => ({
    ...sub,
    fatwas: getFatawaBySubcategory(category.id, sub.id),
  }));

  const tabs = subsWithData.map((s) => ({
    id: s.id,
    nameTh: s.nameTh,
    count: s.fatwas.length,
  }));

  return (
    <div className="ebook-page">
      {/* Breadcrumb */}
      <div className="pt-6 pb-2">
        <Breadcrumb
          items={[
            { label: 'หน้าแรก', href: '/' },
            { label: 'หมวดหมู่', href: '/category' },
            { label: category.nameTh },
          ]}
        />
      </div>

      {/* Category Header */}
      <section className="py-8 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)] mb-4">
          <Icon className="h-8 w-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-ink)] mb-2">
          {category.nameTh}
        </h1>
        <p className="arabic-text text-xl text-gray-400 mb-4">{category.nameAr}</p>
        <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
          {category.description}
        </p>
      </section>

      {/* Sticky subcategory tab bar */}
      <SubcategoryTabs tabs={tabs} />

      {/* Subcategory sections */}
      {subsWithData.map((sub) => (
        <section key={sub.id} id={sub.id} className="py-6 scroll-mt-24">
          <h2 className="text-xl font-bold text-[var(--color-ink)] mb-1">{sub.nameTh}</h2>
          <p className="arabic-text text-sm text-gray-400 mb-4">{sub.nameAr}</p>

          {sub.fatwas.length > 0 ? (
            <div className="space-y-4">
              {sub.fatwas.map((fatwa) => (
                <FatwaCard key={fatwa.id} fatwa={fatwa} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm py-4 text-center">ยังไม่มีข้อมูล</p>
          )}

          <div className="section-divider" aria-hidden="true" />
        </section>
      ))}
    </div>
  );
}
