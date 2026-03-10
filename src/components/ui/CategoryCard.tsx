import Link from 'next/link';
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
import type { Category } from '@/lib/types';

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

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] ?? BookOpen;

  return (
    <Link href={`/category/${category.id}`} className="block group h-full">
      <div className="h-full rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 group-hover:shadow-md group-hover:border-[var(--color-primary)] group-hover:-translate-y-0.5">
        <div className="mb-3 inline-flex items-center justify-center h-10 w-10 rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)]">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-semibold text-[var(--color-ink)] mb-1">
          {category.nameTh}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2" title={category.description}>
          {category.description}
        </p>
      </div>
    </Link>
  );
}
