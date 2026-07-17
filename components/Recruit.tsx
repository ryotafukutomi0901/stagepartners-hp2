"use client";

import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

const POINTS = [
  "建築・不動産の両分野で、幅広い経験を積める環境",
  "少数精鋭だからこそ、一人ひとりの裁量が大きい",
  "地域とともに成長する、腰を据えたキャリア",
];

export default function Recruit() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    gsap.from("[data-recruit-fade]", {
      opacity: 0,
      y: 16,
      duration: 0.7,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "[data-recruit-col]",
        ...scrollTriggerDefaults,
      },
    });

    gsap.from("[data-cta-fade]", {
      opacity: 0,
      y: 16,
      duration: 0.8,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "[data-cta-col]",
        ...scrollTriggerDefaults,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} id="recruit" className="w-full bg-surface-warm">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div
          data-recruit-col
          className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-12 lg:py-20"
        >
          <span
            data-recruit-fade
            className="text-[11px] font-normal tracking-[0.15em] text-ink-muted"
          >
            RECRUIT
          </span>
          <h2
            data-recruit-fade
            className="mt-1 text-xl font-bold text-ink sm:text-2xl"
          >
            採用情報
          </h2>
          <p
            data-recruit-fade
            className="mt-4 max-w-md text-[13px] font-normal leading-loose text-ink-muted"
          >
            建築と不動産の両輪で、街の価値を未来へつなぐ。
            <br className="hidden sm:block" />
            私たちと一緒に、次のステージを創る仲間を募集しています。
          </p>

          <ul className="mt-6 max-w-md space-y-3">
            {POINTS.map((point) => (
              <li
                key={point}
                data-recruit-fade
                className="flex items-start gap-3 text-[13px] font-normal leading-relaxed text-ink"
              >
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent-ink"
                />
                {point}
              </li>
            ))}
          </ul>

          <Link
            data-recruit-fade
            href="/recruit"
            className="mt-8 inline-flex items-center gap-3 self-start bg-accent px-6 py-3 text-xs font-medium tracking-[0.04em] text-accent-ink transition-opacity hover:opacity-85"
          >
            採用情報を見る
            <span aria-hidden>›</span>
          </Link>
        </div>

        <div
          data-cta-col
          className="relative flex min-h-[220px] items-center overflow-hidden px-6 py-16 sm:px-10 lg:px-12 lg:py-20"
        >
          <Image
            src="/heroimage2.jpg"
            alt="街の風景"
            fill
            sizes="50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-surface-warm/85" aria-hidden />

          <div className="relative max-w-md">
            <h2
              data-cta-fade
              className="text-xl font-bold leading-[1.6] text-ink sm:text-2xl"
            >
              共に、次のステージへ。
            </h2>
            <p
              data-cta-fade
              className="mt-4 text-[13px] font-normal leading-loose text-ink/75"
            >
              私たちは、挑戦するすべての人と企業の
              <br />
              ステージを支え続けます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
