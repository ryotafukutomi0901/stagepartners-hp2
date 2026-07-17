import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "事業内容 | STAGE PARTNERS",
  description:
    "不動産事業と建築事業。物件を見つけ、空間をつくり、価値を守るまでを一社で担うSTAGE PARTNERSの事業をご紹介します。",
};

export default function BusinessPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="OUR BUSINESS"
          title="事業内容"
          description="「物件を見つける」「空間をつくる」「価値を守る」まで、一続きでご支援できる体制をご紹介するページです。現在準備を進めています。"
          breadcrumb={[{ label: "事業内容", href: "/business" }]}
        />
      </main>
      <Footer />
    </>
  );
}
