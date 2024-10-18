import { Suspense } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { stringTypeGuard } from '@/utils/typeguards';
import { type BlogPost, getBlogPosts, getBlogPost } from '@/utils/files';
import Link from 'next/link';
import classNames from 'classnames';

export const generateStaticParams = async () => {
  const posts = await getBlogPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return paths;
};

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const slug = params.slug;
  if (!stringTypeGuard(slug)) {
    return {
      notFound: true,
    };
  }
  const post = await getBlogPost(slug);
  return {
    title: post.title,
    description: post.description,
  };
};

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  if (!stringTypeGuard(slug)) {
    return {
      notFound: true,
    };
  }
  const post = await getBlogPost(slug);
  const date = new Date(post.date);

  const prettyDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col gap-4">
      <Link className="text-sm" href="/">
        Home
      </Link>
      <h1 className="text-3xl md:text-3xl font-medium">{post.title}</h1>
      <div className="text-slate-500">{prettyDate}</div>
      <div
        className={classNames(
          'prose  prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-slate-700 prose-slate prose-base max-w-none prose-h1:font-bold print:pb-0',
          'prose-h1:text-xl prose-h1:font-medium prose prose-h1:text-slate-900',
          'prose-h2:text-lg prose-h2:font-medium prose-h2:text-slate-800',
          'prose-h3:text-lg prose-h3:font-medium prose-h3:text-slate-700',
          'prose-h4:text-base prose-h4:font-medium prose-h4:text-slate-600'
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <MDXRemote source={post.content} />
        </Suspense>
      </div>
    </div>
  );
}
