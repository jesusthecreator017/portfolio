export function SectionHead({
  n,
  id,
  title,
  as: H = 'h2',
}: {
  n: string;
  id: string;
  title: string;
  as?: 'h1' | 'h2';
}) {
  return (
    <div className="rv mb-[clamp(28px,4vw,48px)] flex items-baseline gap-[18px]">
      <span className="mono text-sm font-semibold tracking-[.04em] text-muted">
        {n}
      </span>
      <H
        id={id}
        className="text-[length:clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] font-semibold tracking-[-.02em]"
      >
        {title}
      </H>
    </div>
  );
}
