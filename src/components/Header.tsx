'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

const ITEMS = [
  { n: '01', label: 'Projects', href: '/#projects' },
  { n: '02', label: 'Experience', href: '/#experience' },
  { n: '03', label: 'Skills', href: '/#skills' },
  { n: '04', label: 'About', href: '/#about' },
  { n: '05', label: 'Writing', href: '/blog' },
  { n: '06', label: 'Contact', href: '/#contact' },
];

const btn =
  'mono min-h-11 cursor-pointer border border-line bg-transparent px-3.5 text-xs font-medium tracking-[.04em] text-fg transition duration-150 ease-ui hover:bg-fg hover:text-bg active:translate-y-px';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: PointerEvent) =>
      (e.target as Element).closest('header') || setOpen(false);
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, []);

  // Scroll spy over home sections; a no-op on pages without them.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    document.querySelectorAll('main section[id]').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [pathname]);

  const current = (href: string) =>
    href === '/blog'
      ? pathname.startsWith('/blog')
      : pathname === '/' && href === `/#${active}`;

  return (
    <header className="bar sticky top-0 z-20 border-b border-hair bg-bg">
      <div className="wrap flex h-14 items-center justify-between gap-3">
        <Link
          href="/"
          className="mono text-[.8125rem] font-semibold tracking-[.02em] whitespace-nowrap"
        >
          jesus_gonzalez<span className="font-normal text-muted">/spec</span>
        </Link>
        <nav className="hidden min-[960px]:flex" aria-label="Sections">
          {ITEMS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              aria-current={current(it.href) ? 'true' : undefined}
              className="relative inline-flex min-h-11 items-center px-2.5 mono text-xs tracking-[.04em] text-fg after:absolute after:inset-x-2.5 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-fg after:transition-transform after:duration-200 after:ease-ui hover:after:scale-x-100 aria-[current=true]:font-semibold aria-[current=true]:after:scale-x-100"
            >
              <i className="mr-1.5 text-muted not-italic">{it.n}</i>
              {it.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={btn}
            onClick={() =>
              setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
            }
          >
            <span className="dark:hidden">Theme: light</span>
            <span className="hidden dark:inline">Theme: dark</span>
          </button>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu"
            className={`${btn} min-[960px]:hidden`}
            onClick={() => setOpen((o) => !o)}
          >
            Index
          </button>
        </div>
      </div>
      <nav
        id="menu"
        aria-label="Sections, mobile"
        onClick={(e) => (e.target as Element).closest('a') && setOpen(false)}
        className={`absolute inset-x-0 top-full border-b border-hair bg-bg min-[960px]:hidden ${
          open ? 'block' : 'hidden'
        }`}
      >
        <div className="wrap">
          {ITEMS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="flex min-h-[52px] items-center gap-3.5 border-t border-hair mono text-[.8125rem] first:border-t-0 hover:bg-raise hover:text-on-raise hover:[--muted:var(--on-raise)]"
            >
              <i className="w-[2ch] text-muted not-italic">{it.n}</i>
              {it.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
