"use client";

import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { prefersReducedMotion, scrollTriggerDefaults } from "@/lib/animations";

/**
 * 注目の施工実績(仕様書6.1「施工実績」)。
 *
 * 実運用では管理画面で手動選択し、未選択時は新着順で出す想定のためモックの3件。
 * 実写・実績が用意でき次第、image と各テキストを差し替える。
 */
const WORKS = [
  {
    category: "RENOVATION",
    title: "賃貸マンション 全面リノベーション",
    place: "東京都",
    image: "/real-estateimage1.png",
    position: "object-[60%_70%]",
  },
  {
    category: "REAL ESTATE",
    title: "戸建て 買取・再販リフォーム",
    place: "神奈川県",
    image: "/constructimage1.jpg",
    position: "object-center",
  },
  {
    category: "RENOVATION",
    title: "収益物件 原状回復・改修",
    place: "東京都",
    image: "/companyimage1.png",
    position: "object-[30%_center]",
  },
];

export default function Works() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    if (prefersReducedMotion()) return;

    gsap.from("[data-works-fade]", {
      opacity: 0,
      y: 22,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: { trigger: "[data-works-head]", ...scrollTriggerDefaults },
    });

    const cards = gsap.utils.toArray<HTMLElement>("[data-works-card]");
    cards.forEach((card, i) => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: "top 85%" },
      });

      tl.fromTo(
        card.querySelector("[data-works-image-wrap]"),
        { clipPath: "inset(0% 0% 100% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.2,
          delay: i * 0.08,
          ease: "power4.inOut",
        },
      )
        .from(
          card.querySelector("[data-works-image]"),
          { scale: 1.2, duration: 1.8, ease: "power2.out" },
          "<",
        )
        .from(
          card.querySelectorAll("[data-works-text]"),
          { opacity: 0, y: 16, duration: 0.7, stagger: 0.06, ease: "power2.out" },
          "-=0.8",
        );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-paper px-6 py-24 sm:px-10 lg:px-14 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px]">
        <div
          data-works-head
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p
              data-works-fade
              className="flex items-center gap-4 font-latin text-[10px] tracking-[0.35em] text-ink-muted sm:text-[11px]"
            >
              <span aria-hidden className="inline-block h-px w-10 bg-ink/25" />
              WORKS
            </p>
            <h2
              data-works-fade
              className="mt-8 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-normal leading-[1.5] text-ink"
            >
              施工実績
            </h2>
          </div>

          <div
            data-works-fade
            className="flex flex-col gap-6 sm:max-w-sm lg:items-end"
          >
            <p className="text-[13px] leading-loose text-ink-muted sm:text-sm">
              土地と建物に価値を加えてきた、私たちの仕事の一部をご紹介します。
            </p>
            <Link
              href="/works"
              className="group inline-flex items-center gap-4 text-xs tracking-[0.18em] text-ink transition-colors hover:text-navy-mid"
            >
              実績一覧を見る
              <span
                aria-hidden
                className="inline-block h-px w-10 bg-ink/50 transition-all duration-300 group-hover:w-14 group-hover:bg-navy-mid"
              />
            </Link>
          </div>
        </div>

        {/* 高さをずらして並べ、規則正しい格子になりすぎないようにする */}
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-x-10">
          {WORKS.map((work, i) => (
            <article
              key={work.title}
              data-works-card
              className={i === 1 ? "lg:mt-20" : i === 2 ? "lg:mt-10" : ""}
            >
              <Link href="/works" className="group block">
                <div
                  data-works-image-wrap
                  className="media relative aspect-[4/5] w-full overflow-hidden bg-navy"
                >
                  <Image
                    data-works-image
                    src={work.image}
                    alt={`${work.title}の施工実績`}
                    fill
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                    className={`object-cover ${work.position}`}
                  />
                </div>

                <span
                  data-works-text
                  className="mt-6 block font-latin text-[10px] tracking-[0.3em] text-navy-soft"
                >
                  {work.category}
                </span>
                <h3
                  data-works-text
                  className="mt-3 font-display text-lg font-normal leading-snug text-ink transition-colors group-hover:text-navy-mid sm:text-xl"
                >
                  {work.title}
                </h3>
                <p
                  data-works-text
                  className="mt-2 font-latin text-[11px] tracking-[0.12em] text-ink-muted"
                >
                  {work.place}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
