import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";
import {
  GetStaticProps,
  InferGetStaticPropsType,
} from "next"
import Layout from "../components/Layout";
import Head from "next/head";

export default function CVPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>Max Davish CV</title>
        <meta name="description" content="Max Davish's CV" />
      </Head>
      <Layout>
        <ReactMarkdown
          className="prose prose-gray prose-h1:text-5xl prose-h1:font-bold pb-40">
          {props.cvMarkdown}
        </ReactMarkdown>
      </Layout>
    </div>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const cvDir = path.join(process.cwd(), "content", "cv.md");
  const cvMarkdown = fs.readFileSync(cvDir, "utf8");
  return {
    props: {
      cvMarkdown
    }
  }
}