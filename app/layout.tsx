import React from 'react';
import cn from 'classnames';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

const Layout = (props: { children: React.ReactNode }): JSX.Element => {
  return (
    <html>
      <body>
        <main className={cn("w-screen min-h-screen flex px-4", inter.className)}>
          <Analytics />
          <div className="z-10 w-screen h-screen fixed bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="z-20 bg-white/90 h-fit mx-auto my-14 md:my-20 print:mt-4 lg:my-20 xl:my-24 flex flex-col items-baseline gap-y-4 print:w-full w-full max-w-3xl py-10 px-8 md:px-12 rounded-xl border border-slate-200 shadow-2xl shadow-blue-900/25">
            {props.children}
          </div>
        </main>
      </body>
    </html>
  );
};

export default Layout;
