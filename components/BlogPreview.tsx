import { BlogPost } from '../utils/files';
import Link from 'next/link';

const BlogPreview = ({ post }: { post: BlogPost }) => {
  return (
    <div className="flex flex-col gap-y-1">
      <Link href={`/blog/${post.slug}`} className="text-base font-medium">
        {post.title}
      </Link>
      <p className="text-gray-700 text-sm">{post.description}</p>
    </div>
  );
};

export default BlogPreview;
