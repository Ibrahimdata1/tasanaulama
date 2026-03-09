export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-[var(--color-paper)]">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center space-y-3">
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
          ข้อมูลในเว็บไซต์นี้รวบรวมโดย AI เพื่อการศึกษา
          ควรตรวจสอบกับผู้รู้ (อุละมาอฺ) ก่อนนำไปปฏิบัติ
        </p>
        <p className="text-xs text-gray-400">
          &copy; 2024 ฟัตวาออนไลน์. สงวนลิขสิทธิ์.
        </p>
      </div>
    </footer>
  );
}
