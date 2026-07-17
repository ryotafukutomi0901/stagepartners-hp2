import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Company from "@/components/Company";

export const metadata: Metadata = {
  title: "会社概要 | STAGE PARTNERS",
  description:
    "株式会社STAGE PARTNERSの会社情報。会社名・代表者・所在地・資本金・事業内容・許認可番号をご紹介します。",
};

export default function CompanyPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <Company />
      </main>
      <Footer />
    </>
  );
}
