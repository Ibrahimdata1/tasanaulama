import { notFound } from 'next/navigation';
import { getCategories, getCategory, getFatawaBySubcategory } from '@/lib/data';
import Breadcrumb from '@/components/ui/Breadcrumb';
import FatwaCard from '@/components/ui/FatwaCard';
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
  Droplets,
  Moon,
  Coins,
  Sun,
  Mountain,
  Briefcase,
  Heart,
  BookOpen,
};

export function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({ slug: cat.id }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const category = getCategory(slug);
    return {
      title: category
        ? `${category.nameTh} — ทัศนะอุละมาอฺ`
        : 'ไม่พบหมวดหมู่',
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

  if (!category) {
    notFound();
  }

  const Icon = iconMap[category.icon] ?? BookOpen;

  return (
    <div className="ebook-page">
      {/* Breadcrumb */}
      <div className="pt-6 pb-2">
        <Breadcrumb
          items={[
            { label: 'หน้าแรก', href: '/' },
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
        <p className="arabic-text text-xl text-gray-400 mb-4">
          {category.nameAr}
        </p>
        <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
          {category.description}
        </p>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Subcategories */}
      {category.subcategories.map((sub) => {
        const fatwas = getFatawaBySubcategory(category.id, sub.id);

        return (
          <section key={sub.id} className="py-6">
            <h2 className="text-xl font-bold text-[var(--color-ink)] mb-1">
              {sub.nameTh}
            </h2>
            <p className="arabic-text text-sm text-gray-400 mb-4">
              {sub.nameAr}
            </p>

            {fatwas.length > 0 ? (
              <div className="space-y-4">
                {fatwas.map((fatwa) => (
                  <FatwaCard key={fatwa.id} fatwa={fatwa} />
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm py-4 text-center">
                ยังไม่มีข้อมูล
              </p>
            )}

            <div className="section-divider" aria-hidden="true" />
          </section>
        );
      })}
    </div>
  );
}
