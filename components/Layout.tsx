import React from 'react';


const Layout = (props: { children: React.ReactNode }): JSX.Element => {
  return (
    <main className="w-screen h-screen flex">
      <div className="mx-auto mt-20 print:mt-4 lg:mt-32 xl:mt-40 flex flex-col gap-y-4 w-4/5 lg:w-2/3 print:w-full max-w-2xl">
        {props.children}
      </div>
    </main>
  )
}

export default Layout;