import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="ebook-page">
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-6xl font-bold text-[var(--color-gold)] mb-4">404</p>
        <h1 className="text-2xl font-bold text-[var(--color-ink)] mb-2">
          ไม่พบหน้าที่ค้นหา
        </h1>
        <p className="text-gray-500 mb-8">
          หน้าที่คุณต้องการอาจถูกลบหรือเปลี่ยนที่อยู่แล้ว
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[var(--color-primary)]/90"
        >
          กลับหน้าแรก
        </Link>
      </div>
    </div>
  );
}
