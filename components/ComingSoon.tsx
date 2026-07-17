"use client";

import Link from "next/link";
import { useScopedGsap, gsap, SplitText } from "@/hooks/useGsap";
import { prefersReducedMotion } from "@/lib/animations";

/**
 * 下層ページの準備中表示。
 *
 * 今回のリリース範囲はTOPのフロントエンドまでのため、
 * 仕様書3.1のサイトマップ上のURLだけ先に確保し、中身は準備中とする。
 * ヘッダーのロゴが白抜きのため、面はネイビーで統一してコントラストを確保する。
 */
type Crumb = { label: string; href: string };

type ComingSoonProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumb?: Crumb[];
};

export default function ComingSoon({
  eyebrow,
  title,
  description,
  breadcrumb = [],
}: ComingSoonProps) {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    if (prefersReducedMotion()) return;

    const split = SplitText.create("[data-cs-line]", {
      type: "lines",
      mask: "lines",
    });

    const tl = gsap.timeline({ delay: 0.1 });

    tl.from("[data-cs-frame]", { opacity: 0, duration: 1.2, ease: "power2.out" })
      .from(
        "[data-cs-fade]",
        { opacity: 0, y: 14, duration: 0.8, ease: "power2.out" },
        0.2,
      )
      .from(
        split.lines,
        { yPercent: 120, duration: 1.1, ease: "expo.out", stagger: 0.1 },
        0.35,
      )
      .from(
        "[data-cs-item]",
        { opacity: 0, y: 16, duration: 0.8, stagger: 0.08, ease: "power2.out" },
        "-=0.6",
      );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="on-dark relative flex min-h-[100svh] w-full items-center overflow-hidden bg-navy px-6 py-32 text-on-dark sm:px-10 lg:px-14"
    >
      <div
        data-cs-frame
        aria-hidden
        className="pointer-events-none absolute inset-4 border border-on-dark/15 sm:inset-6 lg:inset-8"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {breadcrumb.length > 0 && (
          <nav
            data-cs-fade
            aria-label="パンくずリスト"
            className="mb-12 flex flex-wrap items-center gap-2 text-[11px] text-on-dark/45"
          >
            <Link href="/" className="transition-colors hover:text-on-dark">
              TOP
            </Link>
            {breadcrumb.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                {i === breadcrumb.length - 1 ? (
                  <span aria-current="page" className="text-on-dark/75">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-on-dark"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}

        <p
          data-cs-fade
          className="flex items-center gap-4 font-latin text-[10px] tracking-[0.35em] text-on-dark/60 sm:text-[11px]"
        >
          <span aria-hidden className="inline-block h-px w-10 bg-on-dark/35" />
          {eyebrow}
        </p>

        <h1 className="mt-8 max-w-4xl font-display font-normal">
          <span className="block overflow-hidden">
            <span
              data-cs-line
              className="block text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.35]"
            >
              {title}
            </span>
          </span>
        </h1>

        <p
          data-cs-item
          className="mt-9 max-w-xl text-[13px] leading-loose text-on-dark/65 sm:text-sm"
        >
          {description}
        </p>

        <p
          data-cs-item
          className="mt-14 inline-flex items-center gap-4 border border-on-dark/25 px-6 py-3 font-latin text-[10px] tracking-[0.35em] text-on-dark/70"
        >
          <span aria-hidden className="inline-block h-1 w-1 bg-on-dark/70" />
          COMING SOON
        </p>

        <div data-cs-item className="mt-14">
          <Link
            href="/"
            className="group inline-flex items-center gap-4 text-xs tracking-[0.18em] text-on-dark transition-opacity hover:opacity-70"
          >
            <span
              aria-hidden
              className="inline-block h-px w-10 bg-on-dark/50 transition-all duration-300 group-hover:w-14 group-hover:bg-on-dark"
            />
            トップページへ戻る
          </Link>
        </div>
      </div>
    </section>
  );
}
