"use client";

import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { prefersReducedMotion, scrollTriggerDefaults } from "@/lib/animations";

/**
 * STAGE PARTNERSの強み(仕様書6.1)。
 *
 * 写真は使わず、4つの理由をカードの格子で見せる。
 * 前後の写真セクション(Business/Works)がネイビーの沈んだ面を担うため、
 * ここはグレージュ(stone)の明るい面にして単調な暗転の連続を避ける。
 */
const STRENGTHS = [
  {
    index: "01",
    title: "不動産と建築の一体対応",
    body: "仲介・買取から改修、そして管理まで。窓口を分けずに一社で担うから、判断も対応も速い。",
  },
  {
    index: "02",
    title: "幅広い施工力",
    body: "小さな原状回復から一棟のリノベーションまで。住まいにも収益物件にも柔軟に応えます。",
  },
  {
    index: "03",
    title: "買って終わりにしない",
    body: "売買や改修の後も、維持管理で長く伴走。資産の価値を、その先まで守り続けます。",
  },
  {
    index: "04",
    title: "グループ基盤と許認可",
    body: "宅地建物取引業・建設業の許認可に裏打ちされた体制で、安心してお任せいただけます。",
  },
];

export default function Strengths() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    if (prefersReducedMotion()) return;

    gsap.from("[data-strength-fade]", {
      opacity: 0,
      y: 22,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: { trigger: "[data-strength-head]", ...scrollTriggerDefaults },
    });

    gsap.from("[data-strength-card]", {
      opacity: 0,
      y: 26,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: { trigger: "[data-strength-grid]", ...scrollTriggerDefaults },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-stone px-6 py-24 sm:px-10 lg:px-14 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px]">
        <div
          data-strength-head
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p
              data-strength-fade
              className="flex items-center gap-4 font-latin text-[10px] tracking-[0.35em] text-ink-muted sm:text-[11px]"
            >
              <span aria-hidden className="inline-block h-px w-10 bg-ink/25" />
              OUR STRENGTHS
            </p>
            <h2
              data-strength-fade
              className="mt-8 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-normal leading-[1.5] text-ink"
            >
              選ばれる、
              <br />
              4つの理由。
            </h2>
          </div>
          <p
            data-strength-fade
            className="max-w-sm text-[13px] leading-loose text-ink-muted sm:text-sm"
          >
            不動産と建築、その両方を知る会社だからこそ提供できる価値があります。
          </p>
        </div>

        <div
          data-strength-grid
          className="mt-14 grid grid-cols-1 gap-px overflow-hidden bg-ink/15 sm:grid-cols-2 lg:mt-20"
        >
          {STRENGTHS.map((item) => (
            <div
              key={item.index}
              data-strength-card
              className="flex flex-col gap-5 bg-stone px-8 py-10 sm:px-10 sm:py-12"
            >
              <span className="font-latin text-[11px] tracking-[0.3em] text-navy-soft">
                {item.index}
              </span>
              <h3 className="font-display text-xl font-normal leading-snug text-ink sm:text-2xl">
                {item.title}
              </h3>
              <p className="max-w-md text-[13px] leading-loose text-ink-muted sm:text-sm">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
