import { getCategories, getAllFatawa } from '@/lib/data';
import SearchBar from '@/components/ui/SearchBar';
import CategoryCard from '@/components/ui/CategoryCard';
import FatwaCard from '@/components/ui/FatwaCard';

export default function Home() {
  const categories = getCategories();
  const allFatawa = getAllFatawa();

  return (
    <div className="ebook-page">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-ink)] mb-4 leading-tight">
          ทัศนะอุละมาอฺ
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
          ค้นหาทัศนะทางฟิกฮ์อิสลาม พร้อมหลักฐานและอ้างอิง
        </p>
        <SearchBar size="lg" placeholder="ค้นหาฟัตวา เช่น กุนูต, ซะกาต, วุฎูอฺ..." />
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Categories Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">
          หมวดหมู่
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-stretch">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Latest Fatwas Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold text-[var(--color-ink)] mb-6">
          ประเด็นล่าสุด
        </h2>
        <div className="space-y-4">
          {allFatawa.map((fatwa) => (
            <FatwaCard key={fatwa.id} fatwa={fatwa} />
          ))}
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      {/* Disclaimer */}
      <section className="py-8 pb-16">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-center">
          <p className="text-sm text-amber-800 leading-relaxed">
            &#9888;&#65039; ข้อมูลในเว็บไซต์นี้รวบรวมโดย AI เพื่อการศึกษา
            ควรตรวจสอบกับอุละมาอฺก่อนนำไปปฏิบัติ
          </p>
        </div>
      </section>
    </div>
  );
}
