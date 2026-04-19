import Image from 'next/image';
import { BsTwitter, BsLinkedin, BsGithub } from 'react-icons/bs';
import { getBlogPosts } from '@/utils/files';
import BlogPreview from '@/components/BlogPreview';
import headshot from '@/public/headshot.jpeg';
import quotientLogo from '@/public/quotient-logo.png';

export const metadata = {
  title: 'Max Davish',
  description: "Max Davish's personal website and blog",
};

export default async function Home() {
  const posts = await getBlogPosts();

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col gap-y-3 md:flex-row-reverse w-full">
        <div className="w-fit h-fit md:ml-auto flex flex-col gap-y-2 items-center">
          <Image
            className="rounded-lg h-fit my-auto"
            src={headshot}
            alt="Headshot of Max"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-y-3">
            <h1 className="text-3xl font-medium tracking-tight text-gray-900">
              Max Davish
            </h1>
            <p className="text-sm font-[380] tracking-[-0.003em] text-gray-600">
              Co-founder and CTO of{' '}
              <a
                href="https://www.getquotient.ai/"
                className="text-gray-900 whitespace-nowrap"
              >
                <Image
                  alt="Quotient Logo"
                  src={quotientLogo}
                  width={16}
                  height={16}
                  className="inline-block mx-1 translate-y-[-1px] rounded-[3px]"
                />
                Quotient.
              </a>
            </p>
          </div>
          <div className="mt-4 flex flex-row gap-x-4">
            <a
              target="__blank"
              href="https://github.com/mdavish"
              className="my-auto"
            >
              <BsGithub className="text-lg text-gray-500 hover:text-gray-900 transition-colors" />
            </a>
            <a
              target="__blank"
              href="https://twitter.com/max_davish"
              className="my-auto"
            >
              <BsTwitter className="text-lg text-gray-500 hover:text-gray-900 transition-colors" />
            </a>
            <a
              target="__blank"
              href="https://www.linkedin.com/in/max-davish"
              className="my-auto"
            >
              <BsLinkedin className="text-lg text-gray-500 hover:text-gray-900 transition-colors" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-y-6 w-full">
        <h3 className="text-xl font-medium tracking-tight text-gray-900">
          Blog
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 w-full">
          {posts
            .sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            })
            .map((post, index) => (
              <BlogPreview
                key={post.slug}
                post={post}
                priority={index < 3}
                index={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
