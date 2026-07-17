"use client";

import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { prefersReducedMotion, scrollTriggerDefaults } from "@/lib/animations";

/**
 * 事業紹介(仕様書6.1「事業紹介」/ 6.2)。
 *
 * 2本柱を並列に見せるだけでは「別々の会社」に見えるため、
 * 写真と文章を重ねた見開きで各事業を提示したあと、
 * 「見つける → つくる → 守る」の連携フローで一続きであることを図解する。
 */
const DIVISIONS = [
  {
    index: "01",
    en: "REAL ESTATE",
    title: "不動産事業",
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
  },
  {
    index: "02",
    en: "ARCHITECTURE",
    title: "建築事業",
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
  },
];

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

    const rows = gsap.utils.toArray<HTMLElement>("[data-business-row]");
    rows.forEach((row) => {
      const fromLeft = row.dataset.businessRow === "even";
      const tl = gsap.timeline({
        scrollTrigger: { trigger: row, ...scrollTriggerDefaults },
      });

      tl.fromTo(
        row.querySelector("[data-business-image-wrap]"),
        {
          clipPath: fromLeft
            ? "inset(0% 0% 0% 100%)"
            : "inset(0% 100% 0% 0%)",
        },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" },
      )
        .from(
          row.querySelector("[data-business-image]"),
          { scale: 1.2, duration: 1.9, ease: "power2.out" },
          "<",
        )
        .from(
          row.querySelectorAll("[data-business-text]"),
          {
            opacity: 0,
            y: 22,
            duration: 0.9,
            stagger: 0.09,
            ease: "power2.out",
          },
          "-=0.9",
        );
    });

    // 連携フロー: 罫線を引いてから各ステップを起こす
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
    <section
      ref={sectionRef}
      id="business"
      className="w-full overflow-hidden bg-paper px-6 py-24 sm:px-10 lg:px-14 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px]">
        <div
          data-business-intro
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p
              data-business-fade
              className="flex items-center gap-4 font-latin text-[10px] tracking-[0.35em] text-ink-muted sm:text-[11px]"
            >
              <span aria-hidden className="inline-block h-px w-10 bg-ink/25" />
              OUR BUSINESS
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

        <div className="mt-16 flex flex-col gap-24 lg:mt-24 lg:gap-36">
          {DIVISIONS.map((division, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={division.index}
                data-business-row={reversed ? "even" : "odd"}
                className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-0"
              >
                <div
                  data-business-image-wrap
                  className={`media relative z-0 aspect-[4/3] w-full overflow-hidden bg-navy lg:col-span-7 lg:aspect-[16/11] ${
                    reversed ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    data-business-image
                    src={division.image}
                    alt={`${division.title}のイメージ`}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className={`object-cover ${division.imagePosition}`}
                  />
                  {/* 文章パネルが重なる側とは反対の角にラベルを置く */}
                  <span
                    className={`absolute top-6 font-latin text-[10px] tracking-[0.3em] text-white/85 ${
                      reversed ? "right-6" : "left-6"
                    }`}
                  >
                    {division.en}
                  </span>
                </div>

                {/* 写真の縁に文章の面を重ね、2事業が地続きであることを紙面でも示す。
                    パネルは行の高さいっぱいに伸ばし、重なりが切り欠きに見えないようにする。 */}
                <div
                  className={`relative z-10 flex flex-col justify-center bg-paper lg:col-span-5 lg:self-stretch lg:py-14 ${
                    reversed
                      ? "lg:order-1 lg:-mr-14 lg:pr-14 lg:pl-0"
                      : "lg:-ml-14 lg:pl-14"
                  }`}
                >
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

                  <ul data-business-text className="mt-8 space-y-3.5">
                    {division.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-4 text-[13px] leading-relaxed text-ink/80"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 inline-block h-px w-4 shrink-0 bg-navy-soft"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* 連携フロー: 2事業が一続きであることの図解(仕様書6.2) */}
        <div data-flow className="mt-24 lg:mt-36">
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
