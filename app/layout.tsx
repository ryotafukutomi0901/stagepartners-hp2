import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "STAGE PARTNERS | 株式会社STAGE PARTNERS",
  description:
    "STAGE PARTNERSは、建物の価値を最大限に引き出し、オーナー・テナント・地域社会のすべてをつなぐプロパティマネジメント企業です。",
  openGraph: {
    title: "STAGE PARTNERS | 株式会社STAGE PARTNERS",
    description:
      "街の価値を守り、未来へつなぐ運営パートナー。STAGE PARTNERSは建物の運営を支え、すべての関係者に価値を届けます。",
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
    <html lang="ja" className={notoSansJP.variable}>
      <body className="min-h-full flex flex-col bg-background text-ink">
        {children}
      </body>
    </html>
  );
}
