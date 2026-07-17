"use client";

import Image from "next/image";
import Link from "next/link";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { scrollTriggerDefaults } from "@/lib/animations";

const PILLARS = [
  {
    no: "01",
    en: "Architecture",
    title: "建築事業 ― かたちにする力",
    body:
      "一棟の新築から、住み継ぐためのリノベーション、店舗・オフィスの内装まで。設計から施工、その後の修繕・設備更新までを一貫して担い、構想を確かな空間へと立ち上げます。",
    tags: ["新築", "リフォーム", "リノベーション", "店舗", "オフィス", "設計・施工", "修繕", "設備更新"],
    image: "/constructimage1.jpg",
    cta: "建築のご相談はこちら",
    href: "mailto:info@stage-partners.example.com?subject=建築のご相談",
  },
  {
    no: "02",
    en: "Real Estate",
    title: "不動産事業 ― 活かしきる力",
    body:
      "売る・貸す・預ける、そのすべてに伴走します。売買・賃貸の仲介から管理・空室対策、土地活用や相続のご相談まで。眠っている資産を、収益を生む舞台へと磨き上げます。",
    tags: ["売買仲介", "賃貸仲介", "管理", "資産活用", "土地活用", "空室対策", "相続相談", "収益改善"],
    image: "/real-estateimage1.png",
    cta: "不動産のご相談はこちら",
    href: "mailto:info@stage-partners.example.com?subject=不動産のご相談",
  },
];

export default function Business() {
  const sectionRef = useScopedGsap<HTMLElement>(() => {
    gsap.from("[data-business-intro]", {
      opacity: 0,
      y: 18,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: "[data-business-intro-wrap]",
        ...scrollTriggerDefaults,
      },
    });

    gsap.from("[data-business-card]", {
      opacity: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: "[data-business-grid]",
        ...scrollTriggerDefaults,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="business"
      className="w-full bg-surface-warm px-6 py-16 sm:px-10 lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-[1440px]">
        <div
          data-business-intro-wrap
          className="mx-auto max-w-2xl text-center"
        >
          <span
            data-business-intro
            className="block text-xs font-normal tracking-[0.2em] text-accent-ink"
          >
            OUR BUSINESS
          </span>
          <h2
            data-business-intro
            className="mt-4 text-xl font-bold leading-[1.6] text-header-ink sm:text-2xl"
          >
            事業内容
          </h2>
          <p
            data-business-intro
            className="mt-4 text-[13px] font-normal leading-loose text-header-ink/70 sm:text-sm"
          >
            建てることも、活かすことも。建築と不動産の両輪で土地と建物のポテンシャルを引き出し、
            <br className="hidden sm:block" />
            その場所で挑戦する人の背中を支えます。
          </p>
        </div>

        <div
          data-business-grid
          className="mt-12 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-2"
        >
          {PILLARS.map((pillar) => (
            <article
              key={pillar.no}
              data-business-card
              className="flex flex-col overflow-hidden bg-white shadow-[0_10px_30px_rgba(43,43,43,0.10)]"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#161513]">
                <Image
                  src={pillar.image}
                  alt={`${pillar.title}のイメージ`}
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover object-center"
                />
                <span className="absolute left-0 top-0 flex items-baseline gap-2 bg-accent px-4 py-2 text-accent-ink">
                  <span className="text-sm font-bold tracking-[0.05em]">{pillar.no}</span>
                  <span className="text-[10px] font-medium tracking-[0.18em]">{pillar.en}</span>
                </span>
              </div>

              <div className="flex flex-1 flex-col px-6 py-7 sm:px-8 sm:py-8">
                <h3 className="text-base font-bold leading-[1.6] text-header-ink sm:text-lg">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-[13px] font-normal leading-loose text-header-ink/70">
                  {pillar.body}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {pillar.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-header-ink/15 px-3 py-1 text-[11px] font-normal tracking-[0.02em] text-header-ink/75"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <Link
                  href={pillar.href}
                  className="mt-7 inline-flex items-center gap-3 self-start bg-accent px-6 py-3 text-xs font-medium tracking-[0.04em] text-accent-ink transition-opacity hover:opacity-85"
                >
                  {pillar.cta}
                  <span aria-hidden>›</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
