"use client";

import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { prefersReducedMotion, scrollTriggerDefaults } from "@/lib/animations";

/**
 * お知らせ(仕様書6.1「News」)。
 *
 * Instagram由来・手動記事を区別せず同じデザインで表示する。
 * 実運用では管理画面/連携から取得するため、当面はモックの3件。
 */
const NEWS = [
  {
    date: "2026.07.01",
    category: "お知らせ",
    title: "夏季休業期間のお知らせ",
  },
  {
    date: "2026.06.15",
    category: "施工実績",
    title: "賃貸マンションのリノベーション事例を公開しました",
  },
  {
    date: "2026.05.28",
    category: "Instagram",
    title: "現場の様子を更新しました",
  },
];

export default function News() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    if (prefersReducedMotion()) return;

    gsap.from("[data-news-fade]", {
      opacity: 0,
      y: 22,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: { trigger: "[data-news-head]", ...scrollTriggerDefaults },
    });

    gsap.from("[data-news-row]", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.09,
      ease: "power2.out",
      scrollTrigger: { trigger: "[data-news-list]", ...scrollTriggerDefaults },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="news"
      className="w-full bg-stone px-6 py-24 sm:px-10 lg:px-14 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-24">
        <div data-news-head className="lg:sticky lg:top-32 lg:self-start">
          <p
            data-news-fade
            className="flex items-center gap-4 font-latin text-[10px] tracking-[0.35em] text-ink-muted sm:text-[11px]"
          >
            <span aria-hidden className="inline-block h-px w-10 bg-ink/25" />
            NEWS
          </p>
          <h2
            data-news-fade
            className="mt-8 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-normal leading-[1.5] text-ink"
          >
            お知らせ
          </h2>
          <Link
            data-news-fade
            href="/news"
            className="group mt-9 inline-flex items-center gap-4 text-xs tracking-[0.18em] text-ink transition-colors hover:text-navy-mid"
          >
            お知らせ一覧を見る
            <span
              aria-hidden
              className="inline-block h-px w-10 bg-ink/50 transition-all duration-300 group-hover:w-14 group-hover:bg-navy-mid"
            />
          </Link>
        </div>

        <ul data-news-list className="border-t border-ink/15">
          {NEWS.map((item) => (
            <li key={item.title} data-news-row>
              <Link
                href="/news"
                className="group grid grid-cols-1 gap-x-8 gap-y-3 border-b border-ink/15 py-7 transition-colors duration-500 hover:border-ink/40 sm:grid-cols-[auto_auto_1fr_auto] sm:items-center sm:py-8"
              >
                <span className="font-latin text-[11px] tracking-[0.14em] text-ink-muted">
                  {item.date}
                </span>
                <span className="inline-flex w-fit items-center justify-center border border-navy-soft/40 px-3 py-1 text-[10px] tracking-[0.12em] text-navy-soft">
                  {item.category}
                </span>
                <span className="text-[13px] leading-relaxed text-ink transition-transform duration-500 ease-out group-hover:translate-x-1.5 sm:text-sm">
                  {item.title}
                </span>
                <span
                  aria-hidden
                  className="hidden text-ink-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-navy-mid sm:block"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
