"use client";

import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap, SplitText } from "@/hooks/useGsap";
import { prefersReducedMotion, scrollTriggerDefaults } from "@/lib/animations";
import { COMPANY_PROFILE } from "@/lib/site";

/**
 * 会社概要ページ本体(/company)。
 *
 * もとはTOPの「会社情報サマリー」だった内容を下層へ全面移設したもの。
 * 固定ヘッダーのロゴが白抜きのため、ページ最上部はネイビーのページヘッダー帯とし、
 * その下の会社情報はpaper面に置いてTOPと同じ質感でまとめる。
 * 値は仕様書6.7「会社情報（初期登録値）」= lib/site.ts を単一の情報源とする。
 */
export default function Company() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    if (prefersReducedMotion()) return;

    // ページヘッダー帯
    const split = SplitText.create("[data-company-title]", {
      type: "lines",
      mask: "lines",
    });

    const tl = gsap.timeline({ delay: 0.1 });

    tl.from("[data-company-head]", {
      opacity: 0,
      y: 12,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out",
    }).from(
      split.lines,
      { yPercent: 120, duration: 1.1, ease: "expo.out", stagger: 0.1 },
      "-=0.4",
    );

    // 会社情報本体
    gsap.fromTo(
      "[data-company-image-wrap]",
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: "[data-company-image-wrap]",
          ...scrollTriggerDefaults,
        },
      },
    );

    gsap.from("[data-company-image]", {
      scale: 1.18,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "[data-company-image-wrap]",
        ...scrollTriggerDefaults,
      },
    });

    gsap.from("[data-company-row]", {
      opacity: 0,
      y: 14,
      duration: 0.7,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: { trigger: "[data-company-list]", ...scrollTriggerDefaults },
    });
  }, []);

  return (
    <section ref={sectionRef}>
      {/* ページヘッダー帯: 白抜きロゴのコントラストを確保しつつページの主題を示す */}
      <div className="on-dark w-full bg-navy px-6 pb-16 pt-32 text-on-dark sm:px-10 sm:pt-36 lg:px-14 lg:pb-20 lg:pt-44">
        <div className="mx-auto max-w-[1600px]">
          <nav
            data-company-head
            aria-label="パンくずリスト"
            className="flex flex-wrap items-center gap-2 text-[11px] text-on-dark/45"
          >
            <Link href="/" className="transition-colors hover:text-on-dark">
              TOP
            </Link>
            <span aria-hidden>/</span>
            <span aria-current="page" className="text-on-dark/75">
              会社概要
            </span>
          </nav>

          <p
            data-company-head
            className="mt-12 flex items-center gap-4 font-latin text-[10px] tracking-[0.35em] text-on-dark/60 sm:text-[11px]"
          >
            <span aria-hidden className="inline-block h-px w-10 bg-on-dark/35" />
            COMPANY
          </p>

          <h1 className="mt-8 font-display font-normal">
            <span className="block overflow-hidden">
              <span
                data-company-title
                className="block text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.35] text-on-dark"
              >
                会社概要
              </span>
            </span>
          </h1>
        </div>
      </div>

      {/* 会社情報本体 */}
      <div className="w-full bg-paper px-6 py-24 sm:px-10 lg:px-14 lg:py-36">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-24">
          <div
            data-company-image-wrap
            className="media relative aspect-[4/3] w-full overflow-hidden bg-navy lg:aspect-[4/5]"
          >
            <Image
              data-company-image
              src="/companyimage1.png"
              alt="STAGE PARTNERSの拠点と街並み"
              fill
              sizes="(min-width: 1024px) 52vw, 100vw"
              className="object-cover object-[25%_center]"
            />
          </div>

          <div>
            <dl data-company-list className="border-t border-ink/15">
              {COMPANY_PROFILE.map((row) => (
                <div
                  key={row.label}
                  data-company-row
                  className="flex flex-col gap-1.5 border-b border-ink/15 py-5 sm:flex-row sm:gap-10"
                >
                  <dt className="font-latin text-[11px] tracking-[0.15em] text-ink-muted sm:w-24 sm:shrink-0 sm:pt-1">
                    {row.label}
                  </dt>
                  <dd className="text-[13px] leading-relaxed text-ink sm:text-sm">
                    {Array.isArray(row.value)
                      ? row.value.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))
                      : row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              href="/contact"
              className="group mt-11 inline-flex items-center gap-4 text-xs tracking-[0.18em] text-ink transition-colors hover:text-navy-mid"
            >
              お問い合わせはこちら
              <span
                aria-hidden
                className="inline-block h-px w-10 bg-ink/50 transition-all duration-300 group-hover:w-14 group-hover:bg-navy-mid"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
