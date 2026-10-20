import type { ReactNode } from 'react';
import { SectionHead } from './SectionHead';

export function Section({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`h-${id}`}
      className="border-t border-line py-[clamp(48px,7vw,88px)]"
    >
      <div className="wrap">
        <SectionHead n={n} id={`h-${id}`} title={title} />
        {children}
      </div>
    </section>
  );
}
