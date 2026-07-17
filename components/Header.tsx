"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "私たちについて", href: "/#about" },
  { label: "事業内容", href: "/#business" },
  { label: "サービス", href: "/#business" },
  { label: "お知らせ", href: "/#news" },
  { label: "企業情報", href: "/#footer" },
  { label: "採用情報", href: "/recruit" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ヘッダーを不透明にする条件：スクロール後、またはモバイルメニューを開いているとき
  const solid = scrolled || isMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-500 ${
        solid
          ? "bg-black/80 backdrop-blur-md"
          : "bg-gradient-to-b from-black/45 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-stretch justify-between">
        <Link href="/" className="flex items-center gap-3 py-4 pl-6 sm:pl-10 lg:pl-12">
          <span aria-hidden className="flex h-8 w-8 items-end gap-[3px]">
          </span>
          <span className="leading-tight">
            <span className="mt-0.5 block text-[14px] font-bold tracking-[0.05em] text-foreground">
              株式会社 STAGE PARTNERS
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 xl:flex"
          aria-label="メインナビゲーション"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[13px] font-normal tracking-[0.02em] text-foreground/85 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="mailto:info@stage-partners.example.com"
          className="hidden items-center gap-2 bg-accent px-8 text-[13px] font-medium tracking-[0.04em] text-accent-ink transition-opacity hover:opacity-85 xl:inline-flex"
        >
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <rect x="2" y="4" width="16" height="12" rx="1" />
            <path d="M3 5.5L10 11l7-5.5" />
          </svg>
          お問い合わせ
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen((v) => !v)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label="メニューを開閉する"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 self-center xl:hidden mr-6 sm:mr-10"
        >
          <span
            className={`block h-px w-5 bg-foreground transition-transform duration-300 ${isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
          />
          <span
            className={`block h-px w-5 bg-foreground transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
          />
          <span
            className={`block h-px w-5 bg-foreground transition-transform duration-300 ${isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
          />
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="モバイルナビゲーション"
        className={`overflow-hidden border-border transition-[max-height,opacity] duration-500 ease-out xl:hidden ${isMenuOpen ? "max-h-96 border-t opacity-100" : "max-h-0 border-t-0 opacity-0"
          }`}
      >
        <ul className="flex flex-col gap-1 px-6 py-4 sm:px-10">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-3 text-sm font-normal tracking-[0.02em] text-foreground/85"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="mailto:info@stage-partners.example.com"
              onClick={() => setIsMenuOpen(false)}
              className="mt-2 inline-flex items-center bg-accent px-6 py-3 text-xs font-medium tracking-[0.04em] text-accent-ink"
            >
              お問い合わせ
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
