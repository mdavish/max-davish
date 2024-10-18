import { BlogPost } from '@/utils/files';
import Link from 'next/link';

const BlogPreview = ({ post }: { post: BlogPost }) => {
  const date = new Date(post.date);
  const prettyDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="flex flex-col gap-y-1.5 w-full max-w-2xl">
      <div className="flex flex-col md:flex-row items-baseline gap-y-1.5 md:items-center justify-between">
        <Link
          href={`/blog/${post.slug}`}
          className="hover:underline text-slate-800 text-base font-normal"
        >
          {post.title}
        </Link>
        <label className="text-xs text-slate-500">{prettyDate}</label>
      </div>
      <p className="text-slate-600 text-sm">{post.description}</p>
    </div>
  );
};

export default BlogPreview;
