import React from 'react';
import cn from 'classnames';

const BlurryCircles = (): JSX.Element => {
  const nCircles = 5;

  return (
    <>
      {[...Array(nCircles)].map((_, i) => {
        const allowedColors = [
          'bg-blue-100',
          'bg-green-100',
          'bg-yellow-100',
          'bg-red-100',
          'bg-purple-100',
          'bg-pink-100',
        ];

        const selectedColor =
          allowedColors[Math.floor(Math.random() * allowedColors.length)];

        const allowedTop = ['top-10', 'top-20', 'top-30', 'top-40'];
        const allowedX = [
          'left-1/2',
          'left-1/3',
          'left-1/4',
          'right-1/2',
          'right-1/3',
          'right-1/4',
        ];

        const allowedPositions = [...allowedTop, ...allowedX];

        return (
          <div
            key={i}
            className={cn(
              selectedColor,
              allowedPositions[
                Math.floor(Math.random() * allowedPositions.length)
              ],
              'absolute left-1/ w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl'
            )}
          ></div>
        );
      })}
    </>
  );
};

const Layout = (props: { children: React.ReactNode }): JSX.Element => {
  return (
    <main className="w-screen min-h-screen flex px-4">
      <div className="z-10 w-screen h-screen fixed bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="z-20 bg-white/90 h-fit mx-auto my-14 md:my-20 print:mt-4 lg:my-24 xl:my-32 flex flex-col items-baseline gap-y-4 print:w-full w-full max-w-3xl py-10 px-8 md:px-12 rounded-xl border border-slate-200 shadow-2xl shadow-blue-900/25">
        {props.children}
      </div>
    </main>
  );
};

export default Layout;
