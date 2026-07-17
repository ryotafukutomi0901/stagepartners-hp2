import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "プライバシーポリシー | STAGE PARTNERS",
  description:
    "株式会社STAGE PARTNERSの個人情報の取扱いについて。取得情報、利用目的、第三者提供、Cookie・アクセス解析、開示等請求の窓口を記載します。",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="PRIVACY POLICY"
          title="プライバシーポリシー"
          description="取得情報、利用目的、第三者提供、委託、Cookie・アクセス解析、外部サービス、保管期間、安全管理措置、開示等請求の窓口を記載します。最終文面は法務確認を経て公開します。"
          breadcrumb={[{ label: "プライバシーポリシー", href: "/privacy" }]}
        />
      </main>
      <Footer />
    </>
  );
}
