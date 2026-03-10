import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Naskh_Arabic } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-thai",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "ทัศนะอุละมาอฺ — ค้นหาทัศนะทางฟิกฮ์อิสลาม",
  description:
    "ค้นหาและศึกษาทัศนะทางฟิกฮ์อิสลามจากสำนักคิดต่าง ๆ พร้อมหลักฐานจากอัลกุรอานและซุนนะห์",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.setAttribute('data-theme',d?'dark':'light');}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${notoSansThai.variable} ${notoNaskhArabic.variable} antialiased`}
        style={{ background: 'var(--color-paper)', color: 'var(--color-ink)' }}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
