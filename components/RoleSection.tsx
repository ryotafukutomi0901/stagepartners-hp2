"use client";

import Image from "next/image";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

const ROLES = [
  {
    title: "オーナー様へ",
    description:
      "設計・改修から管理・活用まで。建築と不動産の両面から、資産価値の最大化をご提案します。",
    image: "/real-estateimage1.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M5 21V9l4-3 4 3v12M13 21V5l4-2 4 2v16M5 21h16M8 13h1M8 17h1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "テナント・事業者様へ",
    description:
      "店舗・オフィスの設計施工から賃貸まで。挑戦する事業の舞台づくりを一貫して支えます。",
    image: "/heroimage1.png",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M8.5 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM15.5 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 19c0-2.6 2.5-4.2 5.5-4.2S14 16.4 14 19M12.5 19c0-2.3 2-3.9 4.5-3.9s4.5 1.6 4.5 3.9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "これから建てる・買う方へ",
    description:
      "新築・購入・出店の構想段階から伴走。はじめの一歩を、確かなかたちに変えていきます。",
    image: "/constructimage1.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
        <path
          d="M12 3 5 9v12h14V9l-7-6ZM12 3v6h5M9 21v-6h6v6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function RoleSection() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    gsap.from("[data-role-intro]", {
      opacity: 0,
      y: 18,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: "[data-role-intro-wrap]",
        ...scrollTriggerDefaults,
      },
    });

    const cards = gsap.utils.toArray<HTMLElement>("[data-role-card]");
    cards.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 28,
        duration: 0.8,
        delay: i * 0.06,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          ...scrollTriggerDefaults,
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full bg-surface px-6 py-16 sm:px-10 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <div data-role-intro-wrap className="mx-auto max-w-2xl text-center">
          <span
            data-role-intro
            className="block text-xs font-normal tracking-[0.15em] text-accent-ink sm:text-sm"
          >
            STAGE PARTNERSの役割
          </span>
          <h2
            data-role-intro
            className="mt-4 text-xl font-bold leading-[1.6] text-ink sm:text-2xl"
          >
            建築と不動産の両輪で、価値を最大化する。
          </h2>
          <p
            data-role-intro
            className="mt-4 text-[13px] font-normal leading-loose text-ink-muted sm:text-sm"
          >
            つくる「建築」と、活かす「不動産」。二つの事業を一社で担うからこそ、
            <br className="hidden sm:block" />
            構想から実現、その後の運用までを切れ目なくご支援できます。
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:mt-14">
          {ROLES.map((role) => (
            <div
              key={role.title}
              data-role-card
              className="border border-border bg-surface-alt"
            >
              <div className="px-6 pt-6 pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-accent text-accent-ink">
                    {role.icon}
                  </span>
                  <h3 className="text-base font-bold text-ink">
                    {role.title}
                  </h3>
                </div>
                <p className="mt-4 text-[13px] font-normal leading-loose text-header-ink">
                  {role.description}
                </p>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#161513]">
                <Image
                  src={role.image}
                  alt={`${role.title}のイメージ`}
                  fill
                  sizes="(min-width: 640px) 32vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
