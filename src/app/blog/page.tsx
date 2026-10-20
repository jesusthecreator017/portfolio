import type { Metadata } from 'next';
import { PostCard } from '@/components/PostCard';
import { SectionHead } from '@/components/SectionHead';
import { getPosts } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Writing | Jesus Gonzalez',
  description: 'Notes on embedded, backend and graphics work.',
};

export default function BlogIndex() {
  const posts = getPosts();
  return (
    <main id="main" className="wrap py-[clamp(48px,7vw,88px)]">
      <SectionHead n="05" id="h-blog" title="Writing" as="h1" />
      {posts.length ? (
        <div className="grid gap-4 min-[900px]:grid-cols-3">
          {posts.map((p, i) => (
            <PostCard
              key={p.slug}
              as="h2"
              post={p}
              d={i ? `${i * 0.06}s` : undefined}
            />
          ))}
        </div>
      ) : (
        <p className="rv border border-line p-[22px]">No posts yet.</p>
      )}
    </main>
  );
}
