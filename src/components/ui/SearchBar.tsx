'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  defaultValue?: string;
  size?: 'lg' | 'sm';
}

export default function SearchBar({
  placeholder = 'ค้นหาฟัตวา...',
  defaultValue = '',
  size = 'sm',
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const handleChange = (value: string) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const trimmed = value.trim();
      router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
    }, 300);
  };

  const sharedInputProps = {
    type: 'search' as const,
    value: query,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value),
    placeholder,
    autoComplete: 'off',
  };

  if (size === 'lg') {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
          <input
            {...sharedInputProps}
            className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-13 pr-5 text-lg shadow-md placeholder:text-gray-400 focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold-light)] focus:outline-none transition-all"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          {...sharedInputProps}
          className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-gray-400 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary-light)] focus:outline-none transition-all"
        />
      </div>
    </div>
  );
}
