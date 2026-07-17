"use client";

import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

const NEWS_ITEMS = [
  {
    date: "2026.06.20",
    category: "お知らせ",
    title: "コーポレートサイトを公開しました",
  },
  {
    date: "2026.05.01",
    category: "お知らせ",
    title: "ゴールデンウィーク期間中の営業について",
  },
  {
    date: "2026.03.29",
    category: "認定",
    title: "「健康経営優良法人2026」に認定されました",
  },
  {
    date: "2026.02.14",
    category: "採用",
    title: "2027年度 新卒採用のエントリー受付を開始しました",
  },
  {
    date: "2026.01.06",
    category: "お知らせ",
    title: "本社移転のお知らせ",
  },
];

export default function News() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    gsap.from("[data-news-intro]", {
      opacity: 0,
      y: 18,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: "[data-news-intro-wrap]",
        ...scrollTriggerDefaults,
      },
    });

    gsap.from("[data-news-row]", {
      opacity: 0,
      y: 16,
      duration: 0.7,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "[data-news-list]",
        ...scrollTriggerDefaults,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="news"
      className="w-full bg-background px-6 py-16 sm:px-10 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr] lg:gap-10">
          <div data-news-intro-wrap>
            <span
              data-news-intro
              className="block text-xs font-normal tracking-[0.2em] text-accent-ink"
            >
              NEWS
            </span>
            <h2
              data-news-intro
              className="mt-3 text-xl font-bold leading-[1.6] text-ink sm:text-2xl"
            >
              お知らせ
            </h2>
            <p
              data-news-intro
              className="mt-4 text-[13px] font-normal leading-loose text-ink-muted"
            >
              STAGE PARTNERSからの最新情報やお知らせをお届けします。
            </p>
            <Link
              data-news-intro
              href="/#news"
              className="mt-6 inline-flex items-center gap-3 bg-accent px-6 py-3 text-xs font-medium tracking-[0.04em] text-accent-ink transition-opacity hover:opacity-85"
            >
              お知らせ一覧を見る
              <span aria-hidden>›</span>
            </Link>
          </div>

          <ul
            data-news-list
            className="divide-y divide-border border-t border-border"
          >
            {NEWS_ITEMS.map((item) => (
              <li key={item.title} data-news-row>
                <Link
                  href="/#news"
                  className="flex flex-col gap-2 py-5 transition-opacity hover:opacity-70 sm:flex-row sm:items-center sm:gap-6"
                >
                  <span className="text-xs font-normal tracking-[0.03em] text-ink-muted sm:w-24 sm:flex-none">
                    {item.date}
                  </span>
                  <span className="inline-flex w-fit flex-none items-center justify-center border border-accent-ink/30 px-3 py-1 text-[10px] font-medium tracking-[0.08em] text-accent-ink sm:w-20">
                    {item.category}
                  </span>
                  <span className="text-[13px] font-normal leading-relaxed text-ink">
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
