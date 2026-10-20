import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

const DIR = path.join(process.cwd(), 'content/posts');

function read(file: string) {
  const slug = file.replace(/\.mdx$/, '');
  const { data, content } = matter(
    fs.readFileSync(path.join(DIR, file), 'utf8')
  );
  const { title, summary, tags } = data;
  // gray-matter parses a bare YAML date into a Date; normalise to YYYY-MM-DD
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date ?? '');
  if (
    !title ||
    !summary ||
    !date ||
    !Array.isArray(tags) ||
    tags.length === 0
  ) {
    throw new Error(
      `${file}: frontmatter needs title, date, summary and a non-empty tags list`
    );
  }
  return { meta: { slug, title, date, summary, tags } as PostMeta, content };
}

export function getPosts(): PostMeta[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => read(f).meta)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(DIR, file))) return null;
  return read(file);
}
