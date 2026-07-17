import Link from "next/link";

type ComingSoonProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function ComingSoon({
  eyebrow,
  title,
  description,
}: ComingSoonProps) {
  return (
    <section className="flex min-h-[70vh] w-full items-center justify-center bg-background px-6 py-28 text-center sm:px-10 lg:px-12">
      <div className="mx-auto max-w-xl">
        <span className="block text-xs font-bold tracking-[0.2em] text-accent">
          {eyebrow}
        </span>
        <h1 className="mt-6 text-2xl font-bold leading-relaxed text-ink">
          {title}
        </h1>
        <p className="mt-6 text-sm font-normal leading-loose text-ink-muted">
          {description}
          <br />
          このページは近日公開予定です。
        </p>
        <Link
          href="/"
          className="mt-12 inline-flex items-center gap-3 text-xs font-medium tracking-[0.1em] text-ink transition-opacity hover:opacity-60"
        >
          トップページへ戻る
          <span aria-hidden className="inline-block h-px w-8 bg-ink" />
        </Link>
      </div>
    </section>
  );
}
