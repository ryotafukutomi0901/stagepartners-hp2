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
 *
 * 格子ではなく横に流れる帯として見せる。カード列を複製して継ぎ目のない
 * 無限ループを作り、CSSアニメーションで等速に流す(GSAP不要・軽量)。
 * ホバー/フォーカスで一時停止、prefers-reduced-motionでは静止し
 * 素の横スクロールへフォールバックする(globals.css側で制御)。
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

// 継ぎ目のない無限ループのため、カード列を1回複製する
const LOOPED_WORKS = [...WORKS, ...WORKS];

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

    gsap.from("[data-works-track]", {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: { trigger: "[data-works-track]", ...scrollTriggerDefaults },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-paper py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10 lg:px-14">
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
      </div>

      {/* 横に流れる帯。ページ全幅まで写真をはみ出させる */}
      <div className="works-marquee group mt-16 lg:mt-24">
        <div data-works-track className="works-marquee-track">
          {LOOPED_WORKS.map((work, i) => (
            <article
              key={`${work.title}-${i}`}
              className="w-[62vw] shrink-0 sm:w-[38vw] md:w-[32vw] lg:w-[24vw] xl:w-[22vw]"
              aria-hidden={i >= WORKS.length}
            >
              <Link
                href="/works"
                className="group/card block"
                tabIndex={i >= WORKS.length ? -1 : 0}
              >
                <div className="media relative aspect-[4/3] w-full overflow-hidden bg-navy sm:aspect-[4/5]">
                  <Image
                    src={work.image}
                    alt={`${work.title}の施工実績`}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 24vw, (min-width: 768px) 32vw, (min-width: 640px) 38vw, 62vw"
                    className={`object-cover ${work.position}`}
                  />
                </div>

                <span className="mt-4 block font-latin text-[10px] tracking-[0.3em] text-navy-soft sm:mt-6">
                  {work.category}
                </span>
                <h3 className="mt-2 font-display text-base font-normal leading-snug text-ink transition-colors group-hover/card:text-navy-mid sm:mt-3 sm:text-lg lg:text-xl">
                  {work.title}
                </h3>
                <p className="mt-2 font-latin text-[11px] tracking-[0.12em] text-ink-muted">
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
