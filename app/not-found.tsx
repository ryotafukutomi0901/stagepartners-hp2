import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ページが見つかりません | STAGE PARTNERS",
  robots: { index: false, follow: true },
};

/**
 * 404(仕様書6.11)。
 *
 * 「見つかりません」で終わらせず、舞台の幕が上がっていない状態に見立てて
 * 主要ページへの導線を置く。App Router の not-found は HTTP 404 を返す。
 */
const LINKS = [
  { label: "トップページ", href: "/" },
  { label: "事業内容", href: "/business" },
  { label: "施工実績", href: "/works" },
  { label: "お問い合わせ", href: "/contact" },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        id="main"
        className="on-dark relative flex min-h-[100svh] flex-1 items-center overflow-hidden bg-navy px-6 py-32 text-on-dark sm:px-10 lg:px-14"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-4 border border-on-dark/15 sm:inset-6 lg:inset-8"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1600px]">
          <p className="flex items-center gap-4 font-latin text-[10px] tracking-[0.35em] text-on-dark/60 sm:text-[11px]">
            <span aria-hidden className="inline-block h-px w-10 bg-on-dark/35" />
            ERROR 404
          </p>

          <p className="mt-10 font-latin text-[clamp(4rem,14vw,11rem)] leading-none text-on-dark/10">
            404
          </p>

          <h1 className="mt-8 font-display text-[clamp(1.6rem,4vw,3rem)] font-normal leading-[1.45]">
            この舞台は、まだ幕が上がっていません。
          </h1>

          <p className="mt-8 max-w-lg text-[13px] leading-loose text-on-dark/65 sm:text-sm">
            お探しのページは、移動または削除された可能性があります。お手数ですが、以下からお進みください。
          </p>

          <ul className="mt-14 grid grid-cols-1 border-t border-on-dark/15 sm:grid-cols-2 lg:grid-cols-4">
            {LINKS.map((link, i) => (
              <li
                key={link.href}
                className={`border-b border-on-dark/15 ${
                  i > 0 ? "sm:border-l sm:border-on-dark/15" : ""
                }`}
              >
                <Link
                  href={link.href}
                  className="group flex items-center justify-between gap-4 px-0 py-6 transition-colors sm:px-6"
                >
                  <span className="text-sm text-on-dark/85 transition-colors group-hover:text-on-dark">
                    {link.label}
                  </span>
                  <span
                    aria-hidden
                    className="text-on-dark/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-on-dark"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
