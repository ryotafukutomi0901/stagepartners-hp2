"use client";

import { useScopedGsap, gsap, SplitText } from "@/hooks/useGsap";
import { prefersReducedMotion, scrollTriggerDefaults } from "@/lib/animations";

/**
 * 幕見出し(章の扉)。
 *
 * サイト全体を「舞台(STAGE)」の章立てとして見せるための、フルスクリーンの扉。
 * 内容セクションの手前に置き、ネイビーの面と製図枠で他の明色セクションと明暗を
 * 入れ替えながら、「第一幕 → 第二幕 → 第三幕」というリズムを与える。
 *
 * スクロールは乗っ取らない(自然な縦スクロールのまま)。信頼感を優先し、
 * 派手な演出ではなく、幕が上がるような一度きりの静かな立ち上がりに留める。
 */
type ChapterIntroProps = {
  /** 章番号(例: "01") */
  no: string;
  /** 章の英字テーマ(背景の大きな透かし＝ウォーターマークにも使う) */
  en: string;
  /** 章の和名(例: "第一幕") */
  act: string;
  /** テーマの見出し。改行は配列で渡す。 */
  lines: readonly string[];
  /** 一行の補足(任意) */
  lead?: string;
};

export default function ChapterIntro({
  no,
  en,
  act,
  lines,
  lead,
}: ChapterIntroProps) {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    if (prefersReducedMotion()) return;

    const split = SplitText.create("[data-chapter-line]", {
      type: "lines",
      mask: "lines",
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: "[data-chapter-body]", ...scrollTriggerDefaults },
    });

    tl.from("[data-chapter-fade]", {
      opacity: 0,
      y: 14,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    })
      .from(
        "[data-chapter-rule]",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.1,
          ease: "power3.inOut",
        },
        "-=0.5",
      )
      .from(
        split.lines,
        { yPercent: 120, duration: 1.2, ease: "expo.out", stagger: 0.12 },
        "-=0.7",
      )
      // 背景の透かしは最後に、ごく静かに浮かせる(遊び心は控えめに)
      .from(
        "[data-chapter-mark]",
        { opacity: 0, scale: 1.04, duration: 1.6, ease: "power2.out" },
        "-=1",
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label={`${act} ${en}`}
      className="on-dark relative flex min-h-[100svh] w-full items-center overflow-hidden bg-navy px-6 py-32 text-on-dark sm:px-10 lg:px-14"
    >
      {/* 製図枠(Hero/幕ローダーと同じ所作で舞台の連続性を出す) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-4 border border-on-dark/12 sm:inset-6 lg:inset-8"
      />

      {/* 背景の大きな英字ウォーターマーク */}
      <span
        data-chapter-mark
        aria-hidden
        className="pointer-events-none absolute -right-2 bottom-6 select-none font-latin text-[22vw] font-medium leading-none tracking-tight text-on-dark/[0.04] sm:right-6 sm:bottom-10 lg:text-[16vw]"
      >
        {en}
      </span>

      <div
        data-chapter-body
        className="relative z-10 mx-auto w-full max-w-[1600px]"
      >
        <div
          data-chapter-fade
          className="flex items-center gap-5 font-latin text-[10px] tracking-[0.35em] text-on-dark/55 sm:text-[11px]"
        >
          <span className="text-on-dark/80">{no}</span>
          <span
            data-chapter-rule
            aria-hidden
            className="block h-px w-16 origin-left bg-on-dark/35 sm:w-24"
          />
          <span>{en}</span>
        </div>

        <p
          data-chapter-fade
          className="mt-10 font-display text-sm tracking-[0.3em] text-on-dark/70"
        >
          {act}
        </p>

        <h2 className="mt-6 font-display font-normal text-on-dark">
          {lines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span
                data-chapter-line
                className="block text-[clamp(2rem,6vw,4.6rem)] leading-[1.3] tracking-[0.01em]"
              >
                {line}
              </span>
            </span>
          ))}
        </h2>

        {lead && (
          <p
            data-chapter-fade
            className="mt-10 max-w-md text-[13px] leading-loose text-on-dark/60 sm:text-sm"
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
