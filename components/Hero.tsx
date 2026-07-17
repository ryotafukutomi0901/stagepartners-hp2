"use client";

import Image from "next/image";
import { useScopedGsap, gsap } from "@/hooks/useGsap";

const HERO_PARAGRAPHS = [
  ["不動産や建築を扱うということは、", "主役は私たちではない。"],
  ["主役は、", "その場所で挑戦する人たちだ。"],
  ["私たちは、その人たちが輝くための舞台を創る。"],
];

export default function Hero() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    tl.from("[data-hero-line]", {
      opacity: 0,
      y: 24,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.1,
    })
      .from(
        "[data-hero-body]",
        { opacity: 0, y: 14, duration: 0.8, ease: "power2.out" },
        "-=0.45",
      )
      .from(
        "[data-hero-image]",
        { opacity: 0, scale: 1.08, duration: 1.6, ease: "power2.out" },
        0,
      );

    gsap.to("[data-hero-image]", {
      yPercent: 4,
      ease: "none",
      scrollTrigger: {
        trigger: "[data-hero-section]",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      data-hero-section
      className="relative flex h-[440px] w-full items-center overflow-hidden bg-accent-ink sm:h-[520px] lg:h-[620px]"
    >
      <Image
        data-hero-image
        src="/heroimage2.jpg"
        alt="STAGE PARTNERSが見据える街の風景"
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-accent-ink via-accent-ink/85 to-transparent sm:via-accent-ink/70"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-12">
        <div className="max-w-lg">
          <h1 className="text-3xl font-bold leading-[1.45] tracking-[0.01em] text-foreground sm:text-4xl lg:text-[2.65rem]">
            {HERO_PARAGRAPHS.map((lines, i) => (
              <span key={i} className={`block ${i > 0 ? "mt-6" : ""}`}>
                {lines.map((line) => (
                  <span key={line} className="block overflow-hidden">
                    <span
                      data-hero-line
                      className={`block ${line === "主役は、" || line === "その場所で挑戦する人たちだ。"
                        ? "text-2xl font-medium leading-[1.7] text-foreground sm:text-3xl"
                        : "text-sm font-normal leading-loose text-subtext sm:text-base"
                        }`}
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </section>
  );
}
