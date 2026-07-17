import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "お問い合わせ | STAGE PARTNERS",
  description:
    "不動産の管理・活用、売買・賃貸、建築・改修、営繕・修繕まで。STAGE PARTNERSへのご相談はこちらから。ご相談は無料です。",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="CONTACT"
          title="お問い合わせ"
          description="不動産の管理・活用、売買・賃貸、建築・改修、営繕・修繕まで、ひとつのフォームで受け付けます。フォームは現在準備を進めています。"
          breadcrumb={[{ label: "お問い合わせ", href: "/contact" }]}
        />
      </main>
      <Footer />
    </>
  );
}
