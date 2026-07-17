"use client";

import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { prefersReducedMotion, scrollTriggerDefaults } from "@/lib/animations";

/**
 * STAGE PARTNERSの強み(仕様書6.1)。
 *
 * 見出しを左に貼り付けたまま項目だけを流し、4つの理由を落ち着いて読ませる。
 * 面をネイビーで沈めることで、前後の明色セクションとの境目を作る。
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

    const items = gsap.utils.toArray<HTMLElement>("[data-strength-item]");
    items.forEach((item) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: item, start: "top 85%" },
      });

      tl.from(item.querySelector("[data-strength-rule]"), {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power3.inOut",
      }).from(
        item.querySelectorAll("[data-strength-text]"),
        { opacity: 0, y: 18, duration: 0.8, stagger: 0.06, ease: "power2.out" },
        "-=0.7",
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="on-dark w-full bg-navy px-6 py-24 text-on-dark sm:px-10 lg:px-14 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-14 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-24">
        <div data-strength-head className="lg:sticky lg:top-32 lg:self-start">
          <p
            data-strength-fade
            className="flex items-center gap-4 font-latin text-[10px] tracking-[0.35em] text-on-dark/55 sm:text-[11px]"
          >
            <span aria-hidden className="inline-block h-px w-10 bg-on-dark/30" />
            OUR STRENGTHS
          </p>
          <h2
            data-strength-fade
            className="mt-8 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-normal leading-[1.5]"
          >
            選ばれる、
            <br />
            4つの理由。
          </h2>
          <p
            data-strength-fade
            className="mt-7 max-w-sm text-[13px] leading-loose text-on-dark/60 sm:text-sm"
          >
            不動産と建築、その両方を知る会社だからこそ提供できる価値があります。
          </p>
        </div>

        <ul>
          {STRENGTHS.map((item) => (
            <li key={item.index} data-strength-item className="relative">
              <span
                data-strength-rule
                aria-hidden
                className="block h-px w-full bg-on-dark/20"
              />
              <div className="grid grid-cols-[auto_1fr] gap-6 py-9 sm:gap-12 sm:py-12">
                <span
                  data-strength-text
                  className="font-latin text-[11px] tracking-[0.3em] text-on-dark/40"
                >
                  {item.index}
                </span>
                <div>
                  <h3
                    data-strength-text
                    className="font-display text-xl font-normal sm:text-2xl"
                  >
                    {item.title}
                  </h3>
                  <p
                    data-strength-text
                    className="mt-4 max-w-xl text-[13px] leading-loose text-on-dark/60 sm:text-sm"
                  >
                    {item.body}
                  </p>
                </div>
              </div>
            </li>
          ))}
          <li aria-hidden className="block h-px w-full bg-on-dark/20" />
        </ul>
      </div>
    </section>
  );
}
