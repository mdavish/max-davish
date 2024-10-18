import { cache } from 'react';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { frontMatterTypeGuard } from './typeguards';
import { serialize } from 'next-mdx-remote/serialize';

export type FrontMatter = {
  title: string;
  date: Date | string;
  description: string;
  mdxSource: Awaited<ReturnType<typeof serialize>>;
};

export type BlogPost = {
  slug: string;
  content: string;
} & FrontMatter;

const frontMatterError = (slug: string) => {
  return `Front matter is missing from ${slug}. Front matter must contain title, date, and description.`;
};

export const getBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const files = await fs.readdir(path.join(process.cwd(), 'content/blog'));
  const blogPostsPromises = files.map(async (fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const markdownWithMeta = await fs.readFile(
      path.join('content/blog', fileName),
      'utf-8'
    );
    const { data: frontmatter, content } = matter(markdownWithMeta);
    if (!frontMatterTypeGuard(frontmatter)) {
      throw new Error(frontMatterError(slug));
    }
    const { title, date, description } = frontmatter;
    const mdxSource = await serialize(content);
    return {
      slug,
      content,
      title,
      date: date.toString(),
      description,
      mdxSource,
    };
  });
  return Promise.all(blogPostsPromises);
});

export const getBlogPost = cache(async (slug: string): Promise<BlogPost> => {
  const markdownWithMeta = await fs.readFile(
    path.join('content/blog', slug + '.mdx'),
    'utf-8'
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);
  const { title, date, description } = frontmatter;
  if (!frontMatterTypeGuard(frontmatter)) {
    throw new Error(frontMatterError(slug));
  }
  const mdxSource = await serialize(content);
  return {
    slug,
    title,
    date: date.toString(),
    description,
    content,
    mdxSource,
  };
});
