import React from 'react';
import cn from 'classnames';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

const Layout = (props: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <html lang="en">
      <body>
        <main
          className={cn('w-screen min-h-screen flex px-4', inter.className)}
        >
          <Analytics />
          <div className="z-20 h-fit mx-auto my-14 md:my-20 print:mt-4 lg:my-20 xl:my-24 flex flex-col gap-y-4 print:w-full w-full max-w-4xl py-10 px-8 md:px-12">
            {props.children}
          </div>
        </main>
      </body>
    </html>
  );
};

export default Layout;
