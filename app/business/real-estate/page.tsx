import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "不動産事業 | STAGE PARTNERS",
  description:
    "賃貸・売買の仲介から、建物管理、空室対策、テナント誘致まで。地主さま・オーナーさまの資産に長く寄り添う不動産事業をご紹介します。",
};

export default function RealEstatePage() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="REAL ESTATE"
          title="建物を、持つだけの資産から、選ばれ続ける舞台へ。"
          description="仲介・管理に建築の視点を掛け合わせ、空室対策からテナント誘致、修繕・改修、日々の維持管理までをご紹介するページです。現在準備を進めています。"
          breadcrumb={[
            { label: "事業内容", href: "/business" },
            { label: "不動産事業", href: "/business/real-estate" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
