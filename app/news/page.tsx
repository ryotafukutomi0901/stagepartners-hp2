import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "お知らせ | STAGE PARTNERS",
  description:
    "STAGE PARTNERSからの最新情報、施工実績、現場の様子などをお届けします。",
};

export default function NewsPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="NEWS"
          title="お知らせ"
          description="お知らせ・施工実績・不動産・建築・メディアなど、カテゴリごとの記事を掲載するページです。現在準備を進めています。"
          breadcrumb={[{ label: "お知らせ", href: "/news" }]}
        />
      </main>
      <Footer />
    </>
  );
}
