import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { frontMatterTypeGuard } from './typeguards';

export type FrontMatter = {
  title: string,
  date: Date | string,
  description: string,
}

export type BlogPost = {
  slug: string,
  content: string,
} & FrontMatter;

const frontMatterError = (slug: string) => {
  return `Front matter is missing from ${slug}. Front matter must contain title, date, and description.`;
}

export function getBlogPosts(): BlogPost[] {
  const files = fs.readdirSync(path.join(process.cwd(), "content/blog"));
  const blogPosts =  files.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const markdownWithMeta = fs.readFileSync(
      path.join("content/blog", fileName),
      "utf-8"
    );
    const { data: frontmatter, content } = matter(markdownWithMeta);
    if (!frontMatterTypeGuard(frontmatter)) {
      throw new Error(frontMatterError(slug));
    }
    const { title, date, description } = frontmatter;
    return {
      slug,
      content,
      title,
      date: date.toString(),
      description,
    };
  });
  return blogPosts;
}

export function getBlogPost(slug: string): BlogPost {
  const markdownWithMeta = fs.readFileSync(
    path.join("content/blog", slug + ".mdx"),
    "utf-8"
  );
  const { data: frontmatter, content } = matter(markdownWithMeta);
  const { title, date, description } = frontmatter;
  if (!frontMatterTypeGuard(frontmatter)) {
    throw new Error(frontMatterError(slug));
  }
  return {
    slug,
    title,
    date: date.toString(),
    description,
    content
  };
}