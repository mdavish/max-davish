import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import ReactMarkdown from 'react-markdown';
import Layout from '../../components/Layout';
import Head from 'next/head';
import { stringTypeGuard } from '../../utils/typeguards';
import { BlogPost, getBlogPosts, getBlogPost } from '../../utils/files';
import Link from 'next/link';

const BlogPost: NextPage<{ post: BlogPost }> = ({ post }) => {
  const date = new Date(post.date);
  const prettyDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
      </Head>
      <Layout>
        <Link className="text-sm" href="/">
          Home
        </Link>
        <h1 className="text-3xl md:text-4xl font-medium">{post.title}</h1>
        <div className="text-slate-500">{prettyDate}</div>
        <ReactMarkdown className="prose prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-slate-700 prose-slate prose-base max-w-none prose-h1:text-4xl prose-h1:font-bold print:pb-0">
          {post.content}
        </ReactMarkdown>
      </Layout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug;
  if (!stringTypeGuard(slug)) {
    return {
      notFound: true,
    };
  }
  const post = getBlogPost(slug);
  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getBlogPosts();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export default BlogPost;
