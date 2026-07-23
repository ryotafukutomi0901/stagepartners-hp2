import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Message from "@/components/Message";
import ChapterIntro from "@/components/ChapterIntro";
import Challenges from "@/components/Challenges";
import Business from "@/components/Business";
import Strengths from "@/components/Strengths";
import Works from "@/components/Works";
import News from "@/components/News";
import ContactCta from "@/components/ContactCta";
import Footer from "@/components/Footer";

/**
 * TOPページ。仕様書6.1のセクションを「舞台(STAGE)」の章立てに再構成する。
 *
 * 序(Hero/Message)に続き、内容セクションを3つの幕にまとめ、各幕の扉として
 * フルスクリーンの ChapterIntro(ネイビー)を挟む。明色(paper/stone)の内容面と
 * 暗色(navy)の扉が交互に入れ替わり、上から下へ読み進めるほど幕が進む構成。
 *
 *   序   Hero → Message
 *   一幕 ISSUE     ChapterIntro → Challenges
 *   二幕 SOLUTION  ChapterIntro → Business → Strengths
 *   三幕 PROOF     ChapterIntro → Works → News
 *   終幕 CONTACT   ContactCta
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col">
        <Hero />
        <Message />

        <ChapterIntro
          no="01"
          en="ISSUE"
          act="第一幕"
          lines={["はじまりは、", "いつも課題から。"]}
          lead="地主さま・オーナーさまが直面する現実を、不動産と建築の両面から解きほぐします。"
        />
        <Challenges />

        <ChapterIntro
          no="02"
          en="SOLUTION"
          act="第二幕"
          lines={["見つけ、つくり、", "そして守る。"]}
          lead="仲介で終わらせず、価値を高め、その先まで。事業を分けずに一気通貫で担います。"
        />
        <Business />
        <Strengths />

        <ChapterIntro
          no="03"
          en="PROOF"
          act="第三幕"
          lines={["手がけた仕事が、", "信頼のすべて。"]}
          lead="土地と建物に価値を加えてきた、私たちの仕事の記録です。"
        />
        <Works />
        <News />

        <ContactCta />
      </main>
      <Footer />
    </>
  );
}
