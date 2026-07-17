import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

export default function RecruitPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <ComingSoon
          eyebrow="RECRUIT"
          title="採用情報"
          description="STAGE PARTNERSの採用情報を近日公開いたします。"
        />
      </main>
      <Footer />
    </>
  );
}
