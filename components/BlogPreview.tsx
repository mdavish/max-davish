import { BlogPost } from "../utils/files"
import Link from "next/link";

const BlogPreview = ({ post }: { post: BlogPost }) => {
  return (
    <div>
      <Link href={`/blog/${post.slug}`}>
        <a className="text-lg">
          {post.title}
        </a>
      </Link>
      <p className="text-gray-700">{post.description}</p>
    </div>
  )
}

export default BlogPreview;