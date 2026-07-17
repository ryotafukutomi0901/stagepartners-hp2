import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "施工実績 | STAGE PARTNERS",
  description:
    "オフィス、店舗、住宅、ビル改修まで。STAGE PARTNERSが土地と建物に価値を加えてきた施工実績をご紹介します。",
};

export default function WorksPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="WORKS"
          title="施工実績"
          description="課題・提案・工事内容・完成後の変化まで、案件ごとの背景を含めてご紹介するページです。現在準備を進めています。"
          breadcrumb={[{ label: "施工実績", href: "/works" }]}
        />
      </main>
      <Footer />
    </>
  );
}
