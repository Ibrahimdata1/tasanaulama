import { getCategories } from '@/lib/data';
import CategoryCard from '@/components/ui/CategoryCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'หมวดหมู่ — ทัศนะอุละมาอฺ',
  description: 'เลือกหมวดหมู่ฟิกฮ์อิสลาม',
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <div className="ebook-page py-8">
      <h1 className="text-3xl font-bold text-[var(--color-ink)] mb-2">หมวดหมู่</h1>
      <p className="text-gray-500 mb-8">เลือกหมวดหมู่เพื่อดูประเด็นฟิกฮ์</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
