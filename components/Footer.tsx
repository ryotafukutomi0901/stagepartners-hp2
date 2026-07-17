const FOOTER_COLUMNS = [
  [
    { label: "私たちについて", href: "/#about" },
    { label: "企業情報", href: "/#footer" },
  ],
  [
    { label: "事業内容", href: "/#business" },
    { label: "リクルート", href: "/#recruit" },
  ],
  [
    { label: "サービス", href: "/#business" },
    { label: "採用情報", href: "/recruit" },
  ],
  [
    { label: "お知らせ", href: "/#news" },
    { label: "お問い合わせ", href: "mailto:info@stage-partners.example.com" },
  ],
];

export default function Footer() {
  return (
    <footer id="footer" className="w-full border-t border-border bg-background">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:gap-12 lg:px-12 lg:py-8">
        <div className="flex items-center gap-3">
          <span aria-hidden className="flex h-7 w-7 items-end gap-[2.5px]">
            <span className="block h-[70%] w-[6px] bg-ink/70" />
            <span className="block h-full w-[6px] bg-ink" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-[0.05em] text-ink">
              STAGE PARTNERS
            </span>
            <span className="mt-0.5 block text-[10px] text-ink-muted">
              株式会社 STAGE PARTNERS
            </span>
          </span>
        </div>

        <p className="text-xs font-normal leading-relaxed text-ink-muted lg:border-l lg:border-border lg:pl-12">
          〒410-0046 静岡県沼津市米山町 1-5 2F
        </p>

        <nav
          aria-label="フッターナビゲーション"
          className="lg:ml-auto lg:border-l lg:border-border lg:pl-12"
        >
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 sm:grid-cols-4">
            {FOOTER_COLUMNS.map((col, i) => (
              <ul key={i} className="space-y-2.5">
                {col.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="whitespace-nowrap text-xs font-normal tracking-[0.02em] text-ink-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </nav>

        <p className="text-[10px] font-normal tracking-[0.02em] text-ink-muted lg:ml-auto lg:whitespace-nowrap">
          © STAGE PARTNERS Co., Ltd.
        </p>
      </div>
    </footer>
  );
}
