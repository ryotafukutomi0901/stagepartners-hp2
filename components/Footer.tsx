import Image from "next/image";
import Link from "next/link";

/**
 * フッター(仕様書5.2)。
 *
 * 会社名・所在地・事業内容・グローバルナビ・プライバシーポリシー・Instagram・Copyright を掲載。
 * グループ会社は会社概要ページへのリンクを基本とし、フッター内は過密にしない。
 * 電話番号・メールアドレスは確定後に登録する(仕様書17 No.3)。
 */
const FOOTER_NAV = [
  {
    heading: "事業内容",
    href: "/business",
    links: [
      { label: "不動産事業", href: "/business/real-estate" },
      { label: "建築事業", href: "/business/architecture" },
    ],
  },
  {
    heading: "施工実績",
    href: "/works",
    links: [{ label: "実績一覧", href: "/works" }],
  },
  {
    heading: "会社概要",
    href: "/company",
    links: [{ label: "会社情報", href: "/company" }],
  },
  {
    heading: "News",
    href: "/news",
    links: [{ label: "お知らせ一覧", href: "/news" }],
  },
];

const INSTAGRAM_URL = "https://www.instagram.com/";

export default function Footer() {
  return (
    <footer className="on-dark w-full bg-navy-deep px-6 pt-20 pb-10 text-on-dark sm:px-10 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-24">
          <div>
            <Link href="/" aria-label="STAGE PARTNERS トップへ" className="inline-block">
              <Image
                src="/logo-mono-white.png"
                alt="STAGE PARTNERS"
                width={400}
                height={97}
                className="h-8 w-auto"
              />
            </Link>

            <p className="mt-8 text-[13px] leading-relaxed text-on-dark/60">
              株式会社STAGE PARTNERS
              <br />
              〒410-0055　静岡県沼津市高島本町16-16
              <br />
              高島本町ビル2F
            </p>

            <p className="mt-5 text-[11px] leading-relaxed text-on-dark/45">
              不動産仲介・不動産管理事業／建築事業（リノベーション、ビル改修）
            </p>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 font-latin text-[11px] tracking-[0.2em] text-on-dark/70 transition-colors hover:text-on-dark"
            >
              INSTAGRAM
              <span aria-hidden>↗</span>
              <span className="sr-only">（外部サイトを新しいタブで開きます）</span>
            </a>
          </div>

          <nav aria-label="フッターナビゲーション">
            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
              {FOOTER_NAV.map((col) => (
                <div key={col.heading}>
                  <Link
                    href={col.href}
                    className="font-latin text-[11px] tracking-[0.2em] text-on-dark transition-opacity hover:opacity-60"
                  >
                    {col.heading}
                  </Link>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-xs text-on-dark/55 transition-colors hover:text-on-dark"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-on-dark/12 pt-8">
              <Link
                href="/contact"
                className="text-xs text-on-dark/55 transition-colors hover:text-on-dark"
              >
                お問い合わせ
              </Link>
              <Link
                href="/privacy"
                className="text-xs text-on-dark/55 transition-colors hover:text-on-dark"
              >
                プライバシーポリシー
              </Link>
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-on-dark/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-latin text-[10px] tracking-[0.2em] text-on-dark/40">
            © STAGE PARTNERS Co., Ltd.
          </p>
          <p className="font-latin text-[10px] tracking-[0.3em] text-on-dark/30">
            REAL ESTATE &amp; ARCHITECTURE
          </p>
        </div>
      </div>
    </footer>
  );
}
