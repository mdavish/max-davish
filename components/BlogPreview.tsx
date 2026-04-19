'use client';

import { BlogPost } from '@/utils/files';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';

const BlogPreview = ({
  post,
  priority = false,
  index = 0,
}: {
  post: BlogPost;
  priority?: boolean;
  index?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.1,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-col gap-y-3 w-full group"
      >
        {post.image && (
          <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-gray-100">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col gap-y-1">
          <span className="text-gray-900 text-base font-medium group-hover:underline">
            {post.title}
          </span>
          <p className="text-gray-600 text-sm font-[380] tracking-[-0.003em] line-clamp-3">
            {post.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogPreview;
