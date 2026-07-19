"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScopedGsap, gsap } from "@/hooks/useGsap";
import { prefersReducedMotion } from "@/lib/animations";
import { NAV_ITEMS, CONTACT_HREF } from "@/lib/site";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // ロゴクリック: すでにTOPページにいる場合は遷移せず最上部までスクロールする
  // (それ以外のページからは通常どおり "/" へ遷移し、TOPの先頭で着地する)。
  const handleLogoClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    }
  };

  // ヒーローの上には透明で重ね、スクロールに追従してネイビーへ沈む(仕様書5.1)。
  const headerRef = useScopedGsap<HTMLElement>(({ scope }) => {
    if (prefersReducedMotion()) {
      gsap.set(scope.current, { backgroundColor: "rgba(14,35,56,0.96)" });
      return;
    }

    gsap.set(scope.current, {
      backgroundColor: "rgba(14,35,56,0)",
      borderBottomColor: "rgba(243,244,245,0)",
    });

    gsap.to(scope.current, {
      backgroundColor: "rgba(14,35,56,0.96)",
      borderBottomColor: "rgba(243,244,245,0.14)",
      backdropFilter: "blur(12px)",
      ease: "none",
      scrollTrigger: { start: 0, end: 140, scrub: 0.3 },
    });
  }, []);

  // 全画面メニューの開閉。パネルを下から立ち上げ、項目を順に起こす。
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (isMenuOpen) {
        gsap.set(overlay, { pointerEvents: "auto" });
        gsap.to(overlay, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: reduced ? 0 : 0.7,
          ease: "power4.inOut",
        });
        gsap.from("[data-menu-item]", {
          yPercent: 120,
          opacity: 0,
          duration: reduced ? 0 : 0.8,
          stagger: reduced ? 0 : 0.055,
          delay: reduced ? 0 : 0.22,
          ease: "expo.out",
        });
      } else {
        gsap.set(overlay, { pointerEvents: "none" });
        gsap.to(overlay, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: reduced ? 0 : 0.5,
          ease: "power4.inOut",
        });
      }
    }, overlay);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // メニュー展開中は背面をスクロールさせない
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Escape で閉じる
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="on-dark fixed inset-x-0 top-0 z-50 border-b border-transparent"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 sm:px-10 lg:px-14">
          <Link
            href="/"
            onClick={handleLogoClick}
            aria-label="STAGE PARTNERS トップへ"
            className="relative z-10 shrink-0"
          >
            <Image
              src="/logo-mono-white.png"
              alt="STAGE PARTNERS"
              width={400}
              height={97}
              priority
              className="h-7 w-auto sm:h-8"
            />
          </Link>

          <nav
            className="hidden items-center gap-9 lg:flex"
            aria-label="メインナビゲーション"
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative py-2 font-latin text-xs tracking-[0.14em] text-on-dark/80 transition-colors hover:text-on-dark"
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-on-dark transition-transform duration-500 ease-out group-hover:scale-x-100"
                />
              </Link>
            ))}
            <Link
              href={CONTACT_HREF}
              className="inline-flex items-center gap-2.5 border border-on-dark/35 px-6 py-3 text-xs tracking-[0.14em] text-on-dark transition-colors duration-300 hover:bg-on-dark hover:text-navy"
            >
              お問い合わせ
              <span aria-hidden>→</span>
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-controls="global-menu"
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
          >
            <span
              className={`block h-px w-6 bg-on-dark transition-transform duration-300 ${
                isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-6 bg-on-dark transition-transform duration-300 ${
                isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* モバイル: 全画面メニュー */}
      <div
        ref={overlayRef}
        id="global-menu"
        aria-hidden={!isMenuOpen}
        style={{ clipPath: "inset(0% 0% 100% 0%)", pointerEvents: "none" }}
        className="on-dark fixed inset-0 z-40 flex flex-col justify-center bg-navy px-6 sm:px-10 lg:hidden"
      >
        <nav aria-label="モバイルナビゲーション">
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.label} className="overflow-hidden">
                <Link
                  data-menu-item
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-baseline gap-5 py-3"
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  <span className="font-latin text-[10px] tracking-[0.3em] text-on-dark/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-3xl text-on-dark sm:text-4xl">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 overflow-hidden">
            <Link
              data-menu-item
              href={CONTACT_HREF}
              onClick={() => setIsMenuOpen(false)}
              tabIndex={isMenuOpen ? 0 : -1}
              className="inline-flex items-center gap-3 bg-on-dark px-9 py-4 text-xs tracking-[0.18em] text-navy"
            >
              お問い合わせ
              <span aria-hidden>→</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
