import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import cn from 'classnames';
import Link from 'next/link';

export const metadata = {
  title: 'Max Davish CV',
  description: 'Max Davish CV',
};

export default async function CVPage() {
  const cvDir = path.join(process.cwd(), 'content', 'cv.md');
  const cvMarkdown = fs.readFileSync(cvDir, 'utf8');

  return (
    <div className="flex flex-col">
      <Head>
        <title>Max Davish CV</title>
        <meta name="description" content="Max Davish's CV" />
      </Head>
      <Link className="text-sm mb-6 print:hidden" href="/">
        Home
      </Link>

      <ReactMarkdown
        className={cn(
          'prose prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:text-slate-700 prose-slate prose-base max-w-none prose-h1:font-bold print:pb-0',
          'prose-h1:text-3xl prose-h1:font-medium prose prose-h1:text-slate-900',
          'prose-h2:text-lg prose-h2:font-medium prose-h2:text-slate-800',
          'prose-h3:text-lg prose-h3:font-medium prose-h3:text-slate-700',
          'prose-h4:text-base prose-h4:font-medium prose-h4:text-slate-600'
        )}
      >
        {cvMarkdown}
      </ReactMarkdown>
    </div>
  );
}
