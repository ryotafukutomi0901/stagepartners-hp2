import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "建築事業 | STAGE PARTNERS",
  description:
    "店舗デザイン施工、リノベーション、ビル改修から日常の営繕工事まで。規模を問わず対応するSTAGE PARTNERSの建築事業をご紹介します。",
};

export default function ArchitecturePage() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="ARCHITECTURE"
          title="つくって終わりではなく、使われ続ける空間へ。"
          description="店舗設計・施工、オフィス改修、ビル改修、リノベーション、住宅リフォーム、施設営繕まで。対応領域と施工の流れをご紹介するページです。現在準備を進めています。"
          breadcrumb={[
            { label: "事業内容", href: "/business" },
            { label: "建築事業", href: "/business/architecture" },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
