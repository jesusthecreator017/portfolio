import type { CSSProperties, ReactNode } from 'react';

export type Row = [term: string, desc: ReactNode];

/** Key/value datasheet list (hero summary, About properties). */
export function Kv({
  rows,
  className = '',
  style,
}: {
  rows: Row[];
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <dl
      style={style}
      className={`grid grid-cols-[minmax(88px,30%)_1fr] ${className}`}
    >
      {rows.map(([dt, dd], i) => {
        const top = i ? 'border-t border-hair' : '';
        return (
          <div key={dt} className="contents">
            <dt
              className={`px-3.5 pt-[13px] pb-[11px] mono text-xs tracking-[.08em] text-muted uppercase ${top}`}
            >
              {dt}
            </dt>
            <dd
              className={`px-3.5 py-[11px] text-[.9375rem] leading-[1.45] ${top}`}
            >
              {dd}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

export function Chips({
  items,
  label,
  className = '',
}: {
  items: string[];
  label?: string;
  className?: string;
}) {
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((c) => (
        <li
          key={c}
          className="border border-line px-2.5 py-[7px] mono text-xs leading-none"
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

/** One project spec cell: optional label plus a term/value list. */
export function Spec({
  label,
  rows,
  cols3 = false,
}: {
  label?: string;
  rows: [string, string][];
  cols3?: boolean;
}) {
  return (
    <div
      className={`border-t border-hair px-[clamp(16px,3vw,28px)] pt-4 pb-[18px] hov first:border-t-0 ${
        cols3
          ? 'min-[800px]:border-t-0 min-[800px]:border-l min-[800px]:first:border-l-0'
          : ''
      }`}
    >
      {label && <span className="mb-2 block label">{label}</span>}
      <dl className="grid grid-cols-[minmax(90px,36%)_1fr]">
        {rows.map(([dt, dd]) => (
          <div key={dt} className="contents">
            <dt className="pt-[9px] pb-[7px] mono text-xs text-muted">{dt}</dt>
            <dd className="py-[7px] text-[.9375rem] font-medium">{dd}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Project({
  id,
  title,
  href,
  lead,
  children,
  specsClass = '',
  className = '',
  style,
}: {
  id: string;
  title: string;
  href: string;
  lead: string;
  children: ReactNode;
  specsClass?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <article
      style={style}
      className={`rv border border-line bg-bg ${className}`}
    >
      <header className="flex flex-wrap items-baseline gap-x-[18px] gap-y-1.5 px-[clamp(16px,3vw,28px)] pt-[18px]">
        <span className="label">{id}</span>
        <h3 className="text-[length:clamp(1.5rem,3vw,2rem)] leading-[1.15] font-semibold tracking-[-.02em]">
          <a href={href} rel="noopener noreferrer" className="hover:underline">
            {title}
          </a>
        </h3>
        <a
          href={href}
          rel="noopener noreferrer"
          aria-label={`${title} on GitHub`}
          className="inline-flex min-h-11 items-center mono text-xs text-muted underline underline-offset-4"
        >
          GitHub -&gt;
        </a>
      </header>
      <p className="max-w-[62ch] px-[clamp(16px,3vw,28px)] pt-2.5 pb-[22px]">
        {lead}
      </p>
      <div className={`grid border-t border-line ${specsClass}`}>
        {children}
      </div>
    </article>
  );
}
