"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { prefersReducedMotion, scrollTriggerDefaults } from "@/lib/animations";
import { CONTACT_HREF } from "@/lib/site";

/**
 * 地主さま・オーナーさま向けの課題提起(仕様書6.1「オーナー向け課題提起」)。
 *
 * カードを並べるのではなく、目次のような一覧にした。
 * 行にカーソルを合わせると該当する写真がカーソルに追従して現れ、
 * 「自分ごと」として拾い読みできるようにしている。
 */
const CONCERNS = [
  {
    index: "01",
    title: "空室が埋まらない",
    body: "募集しても入居が決まらない、稼働率が上がらない。収益の土台が揺らいでいる。",
    image: "/real-estateimage1.png",
  },
  {
    index: "02",
    title: "建物の老朽化",
    body: "外観や設備の傷みが目立ってきた。どこから、どこまで手を入れるべきか判断がつかない。",
    image: "/constructimage1.jpg",
  },
  {
    index: "03",
    title: "管理の負担",
    body: "入居者対応や日々の管理に手が回らない。任せられる相手が近くにいない。",
    image: "/companyimage1.png",
  },
  {
    index: "04",
    title: "改修費用が読めない",
    body: "リフォームすべきかどうか、いくらかかり、いくら戻るのか。費用対効果が見えない。",
    image: "/heroimage2.jpg",
  },
  {
    index: "05",
    title: "資産の活かし方",
    body: "貸すべきか、売るべきか、直して活かすべきか。土地と建物の次の一手に迷っている。",
    image: "/heroimage1.png",
  },
];

export default function Challenges() {
  const [active, setActive] = useState<number | null>(null);
  const motionOk = !usePrefersReducedMotion();

  const sectionRef = useScopedGsap<HTMLElement>(({ scope }) => {
    if (prefersReducedMotion()) return;

    gsap.from("[data-challenge-fade]", {
      opacity: 0,
      y: 22,
      duration: 0.9,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: { trigger: "[data-challenge-head]", ...scrollTriggerDefaults },
    });

    gsap.from("[data-challenge-row]", {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.07,
      scrollTrigger: { trigger: "[data-challenge-list]", ...scrollTriggerDefaults },
    });

    // カーソル追従プレビュー
    const preview = scope.current?.querySelector<HTMLElement>(
      "[data-challenge-preview]",
    );
    const list = scope.current?.querySelector<HTMLElement>("[data-challenge-list]");
    if (!preview || !list) return;

    gsap.set(preview, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(preview, "x", { duration: 0.7, ease: "power3" });
    const yTo = gsap.quickTo(preview, "y", { duration: 0.7, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const rect = list.getBoundingClientRect();
      xTo(e.clientX - rect.left);
      yTo(e.clientY - rect.top);
    };

    list.addEventListener("mousemove", onMove);
    return () => list.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-stone px-6 py-24 sm:px-10 lg:px-14 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px]">
        <div
          data-challenge-head
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p
              data-challenge-fade
              className="flex items-center gap-4 font-latin text-[10px] tracking-[0.35em] text-ink-muted sm:text-[11px]"
            >
              <span aria-hidden className="inline-block h-px w-10 bg-ink/25" />
              YOUR CONCERNS
            </p>
            <h2
              data-challenge-fade
              className="mt-8 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-normal leading-[1.5] text-ink"
            >
              その土地と建物の悩み、
              <br />
              抱え込んでいませんか。
            </h2>
          </div>
          <p
            data-challenge-fade
            className="max-w-sm text-[13px] leading-loose text-ink-muted sm:text-sm"
          >
            地主さま・オーナーさまが直面しやすい課題を、STAGE
            PARTNERSは不動産と建築の両面から解きほぐします。
          </p>
        </div>

        <div data-challenge-list className="relative mt-14 lg:mt-20">
          {/* カーソル追従の写真プレビュー(デスクトップのみ) */}
          {motionOk && (
            <div
              data-challenge-preview
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 z-10 hidden h-64 w-48 overflow-hidden lg:block"
            >
              {CONCERNS.map((concern, i) => (
                <Image
                  key={concern.image}
                  src={concern.image}
                  alt=""
                  fill
                  sizes="192px"
                  className={`object-cover transition-opacity duration-500 ${
                    active === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          )}

          <ul className="border-t border-ink/15">
            {CONCERNS.map((concern, i) => (
              <li key={concern.index} data-challenge-row>
                <div
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  className="group grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-3 border-b border-ink/15 py-8 transition-colors duration-500 hover:border-ink/40 sm:gap-x-10 lg:grid-cols-[auto_minmax(0,20rem)_1fr] lg:items-center lg:py-10"
                >
                  <span className="font-latin text-[11px] tracking-[0.3em] text-ink-muted transition-colors duration-500 group-hover:text-navy-mid">
                    {concern.index}
                  </span>

                  <h3 className="font-display text-xl font-normal leading-snug text-ink transition-transform duration-500 ease-out group-hover:translate-x-2 sm:text-2xl">
                    {concern.title}
                  </h3>

                  <p className="col-start-2 max-w-md text-[13px] leading-loose text-ink-muted lg:col-start-3">
                    {concern.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          {/* 相談への入口 */}
          <Link
            data-challenge-row
            href={CONTACT_HREF}
            className="group mt-10 flex flex-col gap-6 bg-navy px-8 py-10 text-on-dark transition-colors duration-500 hover:bg-navy-mid sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-12"
          >
            <span>
              <span className="block font-latin text-[10px] tracking-[0.3em] text-on-dark/55">
                CONTACT
              </span>
              <span className="mt-5 block font-display text-2xl leading-snug sm:text-3xl">
                まずは、話を聞いてほしい。
              </span>
            </span>
            <span className="inline-flex items-center gap-3 whitespace-nowrap text-xs tracking-[0.18em] text-on-dark/85">
              無料で相談する
              <span
                aria-hidden
                className="inline-block h-px w-10 bg-on-dark/50 transition-all duration-300 group-hover:w-14 group-hover:bg-on-dark"
              />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
