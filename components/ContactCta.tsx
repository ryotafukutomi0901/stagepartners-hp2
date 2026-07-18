"use client";

import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap, SplitText } from "@/hooks/useGsap";
import { prefersReducedMotion, scrollTriggerDefaults } from "@/lib/animations";
import { CONTACT_HREF } from "@/lib/site";

/**
 * お問い合わせCTA(仕様書6.1「お問い合わせ CTA」)。
 *
 * フォーム本体は /contact に置き、TOPは相談を促す面に徹する。
 * 「問い合わせ種別を事前選択できるリンク」(6.1)を用意し、
 * 用件が定まっている人がフォームで種別を選び直す手間を省く。
 */
const INQUIRY_SHORTCUTS = [
  { label: "不動産の相談", type: "real-estate" },
  { label: "建築・改修の相談", type: "architecture" },
  { label: "管理・営繕の相談", type: "maintenance" },
];

export default function ContactCta() {
  const sectionRef = useScopedGsap<HTMLElement>(({ scope }) => {
    if (prefersReducedMotion()) return;

    const split = SplitText.create("[data-contact-line]", {
      type: "lines",
      mask: "lines",
    });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: scope.current, ...scrollTriggerDefaults },
    });

    tl.from("[data-contact-fade]", {
      opacity: 0,
      y: 16,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(
        split.lines,
        { yPercent: 115, duration: 1.2, ease: "expo.out", stagger: 0.1 },
        "-=0.5",
      )
      .from(
        "[data-contact-item]",
        { opacity: 0, y: 18, duration: 0.8, stagger: 0.08, ease: "power2.out" },
        "-=0.7",
      );

    gsap.to("[data-contact-image]", {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: scope.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="on-dark relative w-full overflow-hidden bg-navy px-6 py-28 sm:px-10 lg:px-14 lg:py-40"
    >
      <div className="absolute inset-0">
        <div data-contact-image className="absolute inset-x-0 -top-[10%] -bottom-[10%]">
          <Image
            src="/heroimage1.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/90"
      />

      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-14 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-24">
        <div>
          <p
            data-contact-fade
            className="flex items-center gap-4 font-latin text-[10px] tracking-[0.35em] text-on-dark/60 sm:text-[11px]"
          >
            <span aria-hidden className="inline-block h-px w-10 bg-on-dark/35" />
            CONTACT
          </p>

          <h2 className="mt-8 font-display font-normal text-on-dark">
            <span className="block overflow-hidden">
              <span
                data-contact-line
                className="block text-[clamp(1.8rem,4.4vw,3.4rem)] leading-[1.5]"
              >
                土地と建物のこと、
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                data-contact-line
                className="block text-[clamp(1.8rem,4.4vw,3.4rem)] leading-[1.5]"
              >
                まずは聞かせてください。
              </span>
            </span>
          </h2>

          <p
            data-contact-item
            className="mt-8 max-w-lg text-[13px] leading-loose text-on-dark/70 sm:text-sm"
          >
            売却・賃貸・リフォーム・管理まで、どんな段階のご相談でも構いません。ご相談は無料です。お気軽にお問い合わせください。
          </p>

          {/* 用件が決まっている人向けの近道 */}
          <ul data-contact-item className="mt-10 flex flex-wrap gap-3">
            {INQUIRY_SHORTCUTS.map((item) => (
              <li key={item.type}>
                <Link
                  href={`${CONTACT_HREF}?type=${item.type}`}
                  className="inline-flex items-center gap-2.5 border border-on-dark/30 px-5 py-2.5 text-xs tracking-[0.1em] text-on-dark/80 transition-colors duration-300 hover:border-on-dark hover:text-on-dark"
                >
                  {item.label}
                  <span aria-hidden className="text-[10px]">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-9">
          <Link
            data-contact-item
            href={CONTACT_HREF}
            className="group inline-flex items-center justify-between gap-8 bg-on-dark px-9 py-5 text-xs tracking-[0.18em] text-navy transition-colors duration-300 hover:bg-navy-mid hover:text-on-dark"
          >
            お問い合わせフォームへ
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </Link>

          <div data-contact-item>
            <p className="font-latin text-[10px] tracking-[0.3em] text-on-dark/50">
              TEL
            </p>
            <p className="mt-2 font-latin text-2xl tracking-[0.06em] text-on-dark">
              000-000-0000
            </p>
            <p className="mt-2 text-[11px] text-on-dark/50">
              受付時間　平日 9:00 – 18:00
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
