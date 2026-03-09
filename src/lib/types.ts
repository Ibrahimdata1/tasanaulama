export interface Category {
  id: string;
  nameTh: string;
  nameAr: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  nameTh: string;
  nameAr: string;
  fatwaIds: string[];
}

export interface Fatwa {
  id: string;
  titleTh: string;
  titleAr: string;
  categoryId: string;
  subcategoryId: string;
  summaryTh: string;
  introduction: string;
  keywords: string[];
  opinions: Opinion[];
  relatedFatwaIds: string[];
  lastUpdated: string;
}

export interface Opinion {
  id: string;
  position: string;
  positionAr?: string;
  scholars: ScholarAttribution[];
  evidence: Evidence[];
  explanation: string;
}

export interface ScholarAttribution {
  name: string;
  nameAr?: string;
  era?: string;
  madhab?: 'hanafi' | 'maliki' | 'shafii' | 'hanbali' | null;
  type: 'madhab_founder' | 'classical_scholar' | 'contemporary_scholar';
}

export interface Evidence {
  type: 'quran' | 'hadith' | 'athar' | 'ijma' | 'qiyas' | 'istihsan' | 'maslaha';
  surahNumber?: number;
  surahName?: string;
  surahNameAr?: string;
  ayahNumber?: number;
  ayahRange?: string;
  textAr?: string;
  translationTh: string;
  hadithCollection?: string;
  hadithNumber?: number;
  narrator?: string;
  grading?: string;
  source?: string;
  reasoning?: string;
  references: Reference[];
}

export interface Reference {
  bookTh: string;
  bookAr?: string;
  author?: string;
  volume?: number;
  page?: number;
  url?: string;
}
