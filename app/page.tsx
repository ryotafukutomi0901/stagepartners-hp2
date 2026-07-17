import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Message from "@/components/Message";
import Challenges from "@/components/Challenges";
import Business from "@/components/Business";
import Strengths from "@/components/Strengths";
import Works from "@/components/Works";
import News from "@/components/News";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";

/**
 * TOPページ。セクション構成は仕様書6.1に準拠する。
 *
 * 明色(paper) → グレージュ(stone) → ネイビー(navy) を交互に敷き、
 * スクロールに合わせて面の明暗が入れ替わるようにしている。
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <Hero />
        <Message />
        <Challenges />
        <Business />
        <Strengths />
        <Works />
        <News />
        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
