'use client';

import { useEffect, useState } from 'react';

interface Tab {
  id: string;
  nameTh: string;
  count: number;
}

interface SubcategoryTabsProps {
  tabs: Tab[];
}

export default function SubcategoryTabs({ tabs }: SubcategoryTabsProps) {
  const [activeId, setActiveId] = useState<string>(tabs[0]?.id ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    tabs.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: '-20% 0px -70% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [tabs]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // filter to only show tabs that have content
  const activeTabs = tabs.filter((t) => t.count > 0);
  if (activeTabs.length === 0) return null;

  return (
    <div className="sticky top-16 z-40 bg-[var(--color-paper)]/95 backdrop-blur border-b border-[var(--color-border,#e5e7eb)]">
      <div className="flex gap-1 overflow-x-auto scrollbar-hide px-1 py-2">
        {activeTabs.map(({ id, nameTh, count }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-all whitespace-nowrap ${
              activeId === id
                ? 'bg-[var(--color-primary)] text-white'
                : 'text-gray-600 hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)]'
            }`}
          >
            {nameTh}
            <span className={`ml-1.5 text-xs ${activeId === id ? 'text-white/70' : 'text-gray-400'}`}>
              {count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
