"use client";

import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap, SplitText } from "@/hooks/useGsap";
import { onStageReveal, prefersReducedMotion } from "@/lib/animations";
import { CONTACT_HREF } from "@/lib/site";

/**
 * ファーストビュー(仕様書6.1)。
 *
 * 画面いっぱいに「舞台」を引き、その中にタグラインを据える構成。
 * 背景は複数カットをゆっくり切り替えるスライダーにし、静止画より
 * 「動き続ける現場」を感じさせる。切り替えはクロスフェード＋緩やかなズーム。
 * 3秒以内に「不動産×建築の会社」「何を相談できるか」が読み取れることを優先し、
 * 英字ラベル→タグライン→補足→CTA の順に視線が落ちるようにしている。
 */
const HERO_SLIDES = [
  { src: "/heroimage2.jpg", position: "object-center" },
  { src: "/constructimage1.jpg", position: "object-center" },
  { src: "/real-estateimage1.png", position: "object-[60%_center]" },
] as const;

const SLIDE_INTERVAL = 5.6;

export default function Hero() {
  const sectionRef = useScopedGsap<HTMLElement>(({ scope }) => {
    if (prefersReducedMotion()) return;

    const split = SplitText.create("[data-hero-line]", {
      type: "lines",
      mask: "lines",
    });

    // 背景スライダー: クロスフェードで次カットへ送り、表示中は僅かにズームさせる。
    const slides = gsap.utils.toArray<HTMLElement>("[data-hero-slide]");
    let slideTimer: number | undefined;
    if (slides.length > 1) {
      let current = 0;
      const advance = () => {
        const next = (current + 1) % slides.length;
        gsap.fromTo(
          slides[next],
          { opacity: 0, scale: 1.12 },
          { opacity: 1, duration: 1.6, ease: "power2.inOut" },
        );
        gsap.to(slides[next], {
          scale: 1,
          duration: SLIDE_INTERVAL + 1.6,
          ease: "sine.out",
        });
        gsap.to(slides[current], { opacity: 0, duration: 1.6, ease: "power2.inOut" });
        current = next;
      };
      slideTimer = window.setInterval(advance, SLIDE_INTERVAL * 1000);
    }

    // 幕(PageLoader)が上がるのに合わせて再生する。すぐに走らせると、
    // 導入が幕の裏で終わってしまい、幕が上がったときには静止画になる。
    const tl = gsap.timeline({ delay: 0.1, paused: true });

    tl.from("[data-hero-image]", { scale: 1.24, duration: 2.6, ease: "power2.out" })
      .from(
        "[data-hero-frame]",
        { opacity: 0, duration: 1.4, ease: "power2.out" },
        0.3,
      )
      .from(
        "[data-hero-rail]",
        { opacity: 0, x: -14, duration: 1, ease: "power2.out" },
        0.5,
      )
      .from(
        "[data-hero-eyebrow]",
        { opacity: 0, y: 14, duration: 0.9, ease: "power2.out" },
        0.45,
      )
      .from(
        split.lines,
        { yPercent: 120, duration: 1.2, ease: "expo.out", stagger: 0.12 },
        0.6,
      )
      .from(
        "[data-hero-sub]",
        { opacity: 0, y: 18, duration: 0.9, ease: "power2.out" },
        "-=0.6",
      )
      .from(
        "[data-hero-cta]",
        { opacity: 0, y: 14, duration: 0.8, ease: "power2.out" },
        "-=0.55",
      )
      .from(
        "[data-hero-cue]",
        { opacity: 0, duration: 0.8, ease: "power1.out" },
        "-=0.4",
      );

    // スクロールキューの上下運動
    gsap.to("[data-hero-cue-bar]", {
      scaleY: 0.3,
      transformOrigin: "top center",
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // 背景を僅かにパララックスさせ、次セクションが手前に来る感覚を作る
    gsap.to("[data-hero-image]", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: scope.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const stopReveal = onStageReveal(() => tl.play());
    return () => {
      stopReveal();
      if (slideTimer) window.clearInterval(slideTimer);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="on-dark relative flex h-[100svh] min-h-[600px] w-full items-center overflow-hidden bg-navy"
    >
      <div data-hero-image className="absolute inset-0">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            data-hero-slide
            className={`absolute inset-0 ${i === 0 ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={slide.src}
              alt={i === 0 ? "STAGE PARTNERSが向き合う街と建物" : ""}
              fill
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? undefined : "lazy"}
              className={`object-cover ${slide.position}`}
            />
          </div>
        ))}
      </div>

      {/* フルカラー写真の上で白抜きテキストの可読性を確保するスクリム */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/55 to-navy/85"
      />

      {/* 舞台枠 */}
      <div
        data-hero-frame
        aria-hidden
        className="pointer-events-none absolute inset-4 border border-on-dark/20 sm:inset-6 lg:inset-8"
      />

      {/* 左端の縦組みラベル */}
      <div
        data-hero-rail
        aria-hidden
        className="pointer-events-none absolute left-9 top-1/2 hidden -translate-y-1/2 lg:block"
      >
        <span className="block origin-left -rotate-90 whitespace-nowrap font-latin text-[10px] tracking-[0.45em] text-on-dark/50">
          REAL ESTATE &amp; ARCHITECTURE
        </span>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-10 sm:px-16 lg:px-24">
        <p
          data-hero-eyebrow
          className="flex items-center gap-4 font-latin text-[10px] tracking-[0.35em] text-on-dark/65 sm:text-[11px]"
        >
          <span aria-hidden className="inline-block h-px w-10 bg-on-dark/40" />
          株式会社STAGE PARTNERS
        </p>

        <h1 className="mt-7 font-display font-normal text-on-dark">
          <span className="block overflow-hidden">
            <span
              data-hero-line
              className="block text-[clamp(2.4rem,7.2vw,6rem)] leading-[1.22] tracking-[0.02em]"
            >
              挑戦する人が、
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-hero-line
              className="block text-[clamp(2.4rem,7.2vw,6rem)] leading-[1.22] tracking-[0.02em]"
            >
              輝ける場所を。
            </span>
          </span>
        </h1>

        <p
          data-hero-sub
          className="mt-9 max-w-xl text-[13px] leading-loose text-on-dark/75 sm:text-sm"
        >
          不動産の仲介・管理から、店舗・ビル・住まいの設計、施工、改修、維持管理まで。
          <br className="hidden sm:block" />
          場所の可能性を見つけ、そこで始まる挑戦を支えるパートナーです。
        </p>

        <div data-hero-cta className="mt-11 flex flex-wrap items-center gap-4">
          <Link
            href={CONTACT_HREF}
            className="group inline-flex items-center gap-3 bg-on-dark px-9 py-4 text-xs tracking-[0.18em] text-navy transition-colors duration-300 hover:bg-navy-mid hover:text-on-dark"
          >
            無料で相談する
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      <div
        data-hero-cue
        aria-hidden
        className="pointer-events-none absolute bottom-10 right-10 z-10 hidden flex-col items-center gap-3 lg:flex"
      >
        <span className="font-latin text-[10px] tracking-[0.3em] text-on-dark/55 [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <span
          data-hero-cue-bar
          className="block h-14 w-px bg-on-dark/40"
        />
      </div>

      {/* 下端の地平線カット: 次のpaper面が緩やかに立ち上がって舞台を受ける */}
      <svg
        aria-hidden
        preserveAspectRatio="none"
        viewBox="0 0 1440 100"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] block h-[44px] w-full sm:h-[64px] lg:h-[84px]"
      >
        <path d="M0,100 V64 C480,18 960,18 1440,64 V100 Z" fill="var(--paper)" />
      </svg>
    </section>
  );
}
