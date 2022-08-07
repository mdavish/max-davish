import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import Layout from "../components/Layout"
import { BsTwitter, BsLinkedin, BsGithub } from "react-icons/bs"
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Max Davish</title>
        <meta name="description" content="Max Davish's Personal Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1 className="text-5xl font-bold">Max Davish</h1>
        <h2 className="text-xl text-gray-800 font-light">
          Product Manager
        </h2>
        <p className="text-gray-600">
          I lead <a target="__blank" href="https://hitchhikers.yext.com/products/search">Search</a> at Yext.
          In my free time I write about software, artificial intelligence, and politics.
        </p>
        <div className="mt-4 flex flex-row gap-x-4">
          <Image
            className="rounded-full"
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
            <BsGithub className="text-3xl text-gray-600 hover:text-black transition-all delay-100 hover:mb-1" />
          </a>
          <a
            target="__blank"
            href="https://twitter.com/max_davish"
            className="my-auto"
          >
            <BsTwitter className="text-3xl text-gray-600 hover:text-black transition-all delay-100 hover:mb-1" />
          </a>
          <a
            target="__blank"
            href="https://www.linkedin.com/in/max-davish"
            className="my-auto"
          >
            <BsLinkedin className="text-3xl text-gray-600 hover:text-black transition-all delay-100 hover:mb-1" />
          </a>
          <Link
            target="__blank"
            href="/cv"
          >
            <span className="hover:cursor-pointer my-auto font-extrabold text-xl text-gray-600 hover:text-black visited:text-gray-600 no-underline transition-all delay-100">
              CV
            </span>
          </Link>
        </div>
      </Layout >
    </div >
  )
}

export default Home
