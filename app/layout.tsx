import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho, Inter } from "next/font/google";
import PageLoader from "@/components/PageLoader";
import "./globals.css";

// 本文・UI。可読性重視のゴシック。
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

// 見出し・コーポレートメッセージ。明朝で「舞台」の格を出す。
const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

// 英字ラベル・連番。字間を開けて図面のような無機質さを担わせる。
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "STAGE PARTNERS | 株式会社STAGE PARTNERS",
  description:
    "挑戦する人が、輝ける場所を。STAGE PARTNERSは、不動産の仲介・管理から、店舗・ビル・住まいの設計、施工、改修、維持管理まで。場所の可能性を見つけ、そこで始まる挑戦を支えるパートナーです。",
  metadataBase: new URL("https://stagepartners.example.com"),
  icons: {
    icon: "/logo-color.png",
    apple: "/logo-color.png",
  },
  openGraph: {
    title: "STAGE PARTNERS | 株式会社STAGE PARTNERS",
    description:
      "不動産と建築を、一社でつなぐ。地主さま・オーナーさまの土地と建物の可能性を、構想から運用まで一貫して引き出します。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${shipporiMincho.variable} ${inter.variable}`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-navy focus:px-5 focus:py-3 focus:text-xs focus:tracking-[0.15em] focus:text-on-dark"
        >
          本文へスキップ
        </a>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
