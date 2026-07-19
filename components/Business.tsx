"use client";

import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { prefersReducedMotion, scrollTriggerDefaults } from "@/lib/animations";

/**
 * 事業紹介(仕様書6.1「事業紹介」/ 6.2)。
 *
 * stagepartners-hpの「写真とテキストを横並びにしたカード」から離れ、
 * 全幅の写真帯の下にテキストを置くエディトリアルな構成にする。
 * 2事業をpaper/stoneで面替えし、一続きの記事のように読ませたあと、
 * 「見つける → つくる → 守る」の連携フローで一続きであることを図解する。
 */
const DIVISIONS = [
  {
    index: "01",
    en: "REAL ESTATE",
    title: "不動産ソリューション",
    lead: "仲介・管理・買取再販",
    description:
      "地主さま・オーナーさまの「貸したい・売りたい」に応え、確かな価値へとつなぎます。",
    points: [
      "土地・建物を買い上げ、リフォーム等で価値を高めて次の所有者へ",
      "オーナーさまと入居者の間に立つ、賃貸の仲介と管理",
      "ご要望に沿って、最適な借主・買主をお探しする",
    ],
    image: "/real-estateimage1.png",
    imagePosition: "object-[70%_80%]",
    href: "/business/real-estate",
    tone: "paper",
  },
  {
    index: "02",
    en: "ARCHITECTURE",
    title: "建築ソリューション",
    lead: "設計・施工・リノベーション",
    description:
      "空室・老朽化・資産価値の低下といった課題を、建物への手入れで解決します。",
    points: [
      "空室対策・原状回復から本格的なリノベーションまで",
      "費用対効果を見据えた、無理のない改修プラン",
      "自社で不動産まで見通すからこそ描ける、活かす前提の設計",
    ],
    image: "/constructimage1.jpg",
    imagePosition: "object-center",
    href: "/business/architecture",
    tone: "stone",
  },
] as const;

const FLOW = [
  { step: "01", title: "見つける", body: "物件の調査・仲介・買取" },
  { step: "02", title: "つくる", body: "設計・施工・改修" },
  { step: "03", title: "守る", body: "管理・営繕・維持管理" },
];

export default function Business() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    if (prefersReducedMotion()) return;

    gsap.from("[data-business-fade]", {
      opacity: 0,
      y: 22,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: { trigger: "[data-business-intro]", ...scrollTriggerDefaults },
    });

    const divisions = gsap.utils.toArray<HTMLElement>("[data-business-division]");
    divisions.forEach((division) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: division, ...scrollTriggerDefaults },
      });

      tl.fromTo(
        division.querySelector("[data-business-image-wrap]"),
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" },
      )
        .from(
          division.querySelector("[data-business-image]"),
          { scale: 1.15, duration: 1.9, ease: "power2.out" },
          "<",
        )
        .from(
          division.querySelectorAll("[data-business-text]"),
          { opacity: 0, y: 22, duration: 0.9, stagger: 0.09, ease: "power2.out" },
          "-=0.9",
        );
    });

    gsap.from("[data-flow-rule]", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: { trigger: "[data-flow]", ...scrollTriggerDefaults },
    });

    gsap.from("[data-flow-step]", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.12,
      ease: "power2.out",
      scrollTrigger: { trigger: "[data-flow]", ...scrollTriggerDefaults },
    });
  }, []);

  return (
    <section ref={sectionRef} id="business" className="w-full overflow-hidden bg-paper">
      <div
        data-business-intro
        className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-24 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-14 lg:py-36 lg:pb-24"
      >
        <div>
          <p
            data-business-fade
            className="flex items-center gap-4 font-latin text-[10px] tracking-[0.35em] text-ink-muted sm:text-[11px]"
          >
            <span aria-hidden className="inline-block h-px w-10 bg-ink/25" />
            OUR SOLUTIONS
          </p>
          <h2
            data-business-fade
            className="mt-8 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-normal leading-[1.5] text-ink"
          >
            不動産と建築を、
            <br />
            一社でつなぐ。
          </h2>
        </div>
        <p
          data-business-fade
          className="max-w-md text-[13px] leading-loose text-ink-muted sm:text-sm"
        >
          仲介で終わらせず、リフォームで価値を高め、管理まで。事業を分けずに一気通貫で担うからこそ、土地と建物の可能性を最大限に引き出せます。
        </p>
      </div>

      {DIVISIONS.map((division) => (
        <article
          key={division.index}
          data-business-division
          className={`w-full ${division.tone === "stone" ? "bg-stone" : "bg-paper"}`}
        >
          <div
            data-business-image-wrap
            className="media relative aspect-[16/10] w-full overflow-hidden bg-navy sm:aspect-[21/9]"
          >
            <Image
              data-business-image
              src={division.image}
              alt={`${division.title}のイメージ`}
              fill
              sizes="100vw"
              className={`object-cover ${division.imagePosition}`}
            />
            <span className="absolute left-6 top-6 font-latin text-[10px] tracking-[0.3em] text-white/85 sm:left-10 lg:left-14">
              {division.en}
            </span>
          </div>

          <div className="mx-auto max-w-[1600px] px-6 py-14 sm:px-10 lg:px-14 lg:py-20">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <span
                  data-business-text
                  className="block font-latin text-[11px] tracking-[0.25em] text-ink-muted"
                >
                  {division.index}　{division.lead}
                </span>
                <h3 data-business-text className="mt-5">
                  <Link
                    href={division.href}
                    className="group inline-flex items-baseline gap-3 font-display text-3xl font-normal text-ink transition-colors hover:text-navy-mid sm:text-4xl"
                  >
                    {division.title}
                    <span
                      aria-hidden
                      className="text-lg transition-transform duration-300 group-hover:translate-x-1.5"
                    >
                      →
                    </span>
                  </Link>
                </h3>
                <p
                  data-business-text
                  className="mt-6 max-w-md text-[13px] leading-loose text-ink-muted sm:text-sm"
                >
                  {division.description}
                </p>
              </div>

              <ul
                data-business-text
                className="space-y-5 border-t border-ink/15 pt-8 lg:col-span-8 lg:border-t-0 lg:border-l lg:pl-16 lg:pt-0"
              >
                {division.points.map((point) => (
                  <li
                    key={point}
                    className="flex gap-4 text-[13px] leading-relaxed text-ink/80 sm:text-sm"
                  >
                    <span
                      aria-hidden
                      className="mt-2.5 inline-block h-px w-6 shrink-0 bg-navy-soft"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}

      {/* 連携フロー: 2事業が一続きであることの図解(仕様書6.2) */}
      <div className="mx-auto max-w-[1600px] px-6 pb-24 pt-4 sm:px-10 lg:px-14 lg:pb-36 lg:pt-6">
        <div data-flow>
          <p className="font-latin text-[10px] tracking-[0.3em] text-ink-muted">
            ONE PARTNER, ONE FLOW
          </p>
          <span
            data-flow-rule
            aria-hidden
            className="mt-6 block h-px w-full bg-ink/15"
          />
          <ol className="grid grid-cols-1 sm:grid-cols-3">
            {FLOW.map((item, i) => (
              <li
                key={item.step}
                data-flow-step
                className={`flex items-baseline gap-5 border-b border-ink/15 py-8 sm:border-b-0 sm:py-10 ${
                  i > 0 ? "sm:border-l sm:border-ink/15 sm:pl-8" : ""
                }`}
              >
                <span className="font-latin text-[11px] tracking-[0.25em] text-navy-soft">
                  {item.step}
                </span>
                <span>
                  <span className="block font-display text-xl text-ink sm:text-2xl">
                    {item.title}
                  </span>
                  <span className="mt-2 block text-xs leading-relaxed text-ink-muted">
                    {item.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
