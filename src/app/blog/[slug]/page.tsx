import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { getPost, getPosts } from '@/lib/posts';

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} | Jesus Gonzalez`,
    description: post.meta.summary,
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { default: MDX } = await evaluate(post.content, runtime);
  const { title, date, tags } = post.meta;

  return (
    <main id="main" className="wrap py-[clamp(40px,6vw,72px)]">
      <article>
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center mono text-[.8125rem] underline underline-offset-4"
        >
          &lt;- All writing
        </Link>
        <header className="mt-6 mb-10">
          <h1 className="max-w-[24ch] text-[length:clamp(2rem,5vw,3.25rem)] leading-[1.1] font-semibold tracking-[-.025em] text-balance">
            {title}
          </h1>
          <p className="mt-4 label">
            <time dateTime={date}>{date}</time> / {tags.join(', ')}
          </p>
        </header>
        <div className="prose">
          <MDX />
        </div>
      </article>
    </main>
  );
}
