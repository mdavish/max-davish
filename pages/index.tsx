import { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import { BsTwitter, BsLinkedin, BsGithub } from 'react-icons/bs';
import { BlogPost, getBlogPosts } from '../utils/files';
import BlogPreview from '../components/BlogPreview';

const Home: NextPage<{ posts: BlogPost[] }> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>Max Davish</title>
        <meta name="description" content="Max Davish's Personal Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="flex flex-col gap-y-2 md:flex-row w-full items-start">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-4xl md:text-3xl font-medium text-slate-900">
              Max Davish
            </h1>
            <p className="text-slate-600">Working on something new.</p>
          </div>
          <div className="md:ml-auto mt-4 flex flex-row gap-x-4">
            <Image
              className="rounded-full h-fit my-auto"
              src="/headshot.jpeg"
              alt="Headshot of Max"
              width={50}
              height={50}
            />
            <a
              target="__blank"
              href="https://github.com/mdavish"
              className="my-auto"
            >
              <BsGithub className="text-3xl text-slate-600 hover:text-black transition-all delay-100 hover:mb-1" />
            </a>
            <a
              target="__blank"
              href="https://twitter.com/max_davish"
              className="my-auto"
            >
              <BsTwitter className="text-3xl text-slate-600 hover:text-black transition-all delay-100 hover:mb-1" />
            </a>
            <a
              target="__blank"
              href="https://www.linkedin.com/in/max-davish"
              className="my-auto"
            >
              <BsLinkedin className="text-3xl text-slate-600 hover:text-black transition-all delay-100 hover:mb-1" />
            </a>
            {/* <Link
              target="__blank"
              href="/cv"
            >
              <span className="hover:cursor-pointer my-auto font-extrabold text-xl text-slate-600 hover:text-black visited:text-slate-600 no-underline transition-all delay-100">
                CV
              </span>
            </Link> */}
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-y-5">
          <h3 className="text-2xl md:text-xl font-medium">Blog</h3>
          {posts.map((post) => (
            <BlogPreview key={post.slug} post={post} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getBlogPosts();
  const orderedPosts = posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return {
    props: {
      posts: orderedPosts,
    },
  };
};

export default Home;
