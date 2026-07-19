"use client";

import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap, SplitText } from "@/hooks/useGsap";
import { prefersReducedMotion, scrollTriggerDefaults } from "@/lib/animations";

/**
 * 導入メッセージ(仕様書2.3 / 6.1)。
 *
 * コーポレートメッセージは原文の改変を行わない。
 * ヒーロー直下で象徴的に提示するため、写真を排して活字だけの面を作り、
 * その下に全幅の写真帯を置いて息継ぎを作る。
 */
const LINES = [
  { text: "不動産や建築を扱うということは、", lead: true },
  { text: "主役は私たちではない。", lead: true },
  { text: "主役は、その場所で挑戦する人たちだ。", lead: true },
  { text: "私たちは、その人たちが輝くための舞台を創る。", lead: false },
];

export default function Message() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    if (prefersReducedMotion()) return;

    const split = SplitText.create("[data-message-line]", {
      type: "lines",
      mask: "lines",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "[data-message-body]",
        ...scrollTriggerDefaults,
      },
    });

    tl.from("[data-message-fade]", {
      opacity: 0,
      y: 16,
      duration: 0.9,
      ease: "power2.out",
    })
      .from(
        "[data-message-rule]",
        {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1.2,
          ease: "power3.inOut",
        },
        "-=0.7",
      )
      .from(
        split.lines,
        { yPercent: 115, duration: 1.3, ease: "expo.out", stagger: 0.1 },
        "-=1",
      )
      .from(
        "[data-message-link]",
        { opacity: 0, y: 14, duration: 0.8, ease: "power2.out" },
        "-=0.5",
      );

    // 全幅の写真帯: 下から現れ、スクロールに合わせて僅かに流す
    gsap.fromTo(
      "[data-message-band]",
      { clipPath: "inset(18% 0% 18% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-message-band]",
          start: "top 85%",
        },
      },
    );

    gsap.to("[data-message-band-image]", {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-message-band]",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id="message" className="w-full bg-paper">
      <div
        data-message-body
        className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-14 lg:py-36"
      >
        <p
          data-message-fade
          className="flex items-center gap-4 font-latin text-[10px] tracking-[0.35em] text-ink-muted sm:text-[11px]"
        >
          <span aria-hidden className="inline-block h-px w-10 bg-ink/25" />
          MESSAGE
        </p>

        <div className="mt-12 flex gap-8 sm:gap-12 lg:mt-16 lg:gap-16">
          <span
            data-message-rule
            aria-hidden
            className="mt-2 block w-px flex-none bg-ink/20"
          />

          <div>
            <h2 className="font-display font-normal text-ink">
              {LINES.map((line) => (
                <span key={line.text} className="block overflow-hidden">
                  <span
                    data-message-line
                    className={`block ${
                      line.lead
                        ? "text-[clamp(1.15rem,2.4vw,1.9rem)] leading-[1.95] text-ink-muted"
                        : "mt-6 text-[clamp(1.6rem,4.2vw,3.4rem)] leading-[1.6] tracking-[0.01em] text-ink"
                    }`}
                  >
                    {line.text}
                  </span>
                </span>
              ))}
            </h2>

            <Link
              data-message-link
              href="/company"
              className="group mt-14 inline-flex items-center gap-4 text-xs tracking-[0.18em] text-ink transition-colors hover:text-navy-mid"
            >
              私たちについて
              <span
                aria-hidden
                className="inline-block h-px w-10 bg-ink/50 transition-all duration-300 group-hover:w-14 group-hover:bg-navy-mid"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* 全幅の写真帯 */}
      <div
        data-message-band
        className="media relative h-[38vh] w-full overflow-hidden bg-navy lg:h-[62vh]"
      >
        <div
          data-message-band-image
          className="absolute inset-x-0 -top-[8%] -bottom-[8%]"
        >
          <Image
            src="/heroimage1.png"
            alt="STAGE PARTNERSが手がける街並みと建物"
            fill
            sizes="100vw"
            className="object-cover object-[40%_center]"
          />
        </div>
      </div>
    </section>
  );
}
