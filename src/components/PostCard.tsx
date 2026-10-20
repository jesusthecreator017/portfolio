import Link from 'next/link';
import type { PostMeta } from '@/lib/posts';
import { delay } from '@/lib/delay';

export function PostCard({
  post,
  lead = false,
  d,
  as: H = 'h3',
}: {
  post: PostMeta;
  lead?: boolean;
  d?: string;
  as?: 'h2' | 'h3';
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      style={d ? delay(d) : undefined}
      className="rv flex min-h-[220px] flex-col justify-between gap-10 border border-line p-[22px] hov min-[900px]:min-h-[300px]"
    >
      <div>
        <span className="label">{post.tags[0]}</span>
        <H
          className={`mt-3.5 leading-[1.25] font-semibold tracking-[-.015em] text-balance ${
            lead ? 'text-[length:clamp(1.5rem,2.6vw,2rem)]' : 'text-[1.375rem]'
          }`}
        >
          {post.title}
        </H>
      </div>
      <div className="flex flex-wrap justify-between gap-3 label">
        <time dateTime={post.date}>{post.date}</time>
        <span aria-hidden="true">Read -&gt;</span>
      </div>
    </Link>
  );
}
