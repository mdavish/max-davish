import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { stringTypeGuard } from '@/utils/typeguards';
import { getBlogPosts, getBlogPost } from '@/utils/files';
import Link from 'next/link';
import Image from 'next/image';

export const generateStaticParams = async () => {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  if (!stringTypeGuard(slug)) {
    notFound();
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!stringTypeGuard(slug)) {
    notFound();
  }
  const post = await getBlogPost(slug);
  const date = new Date(post.date);

  const prettyDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col w-full">
      <Link className="text-sm text-gray-500" href="/">
        Home
      </Link>
      <h1 className="mt-6 text-3xl font-medium tracking-tight text-gray-900">
        {post.title}
      </h1>
      <div className="mt-2 text-sm text-gray-500">{prettyDate}</div>
      {post.image && (
        <div className="relative w-full aspect-video mt-6 rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="prose mt-8 print:pb-0">
        <MDXRemote source={post.content} />
      </div>
    </div>
  );
}
