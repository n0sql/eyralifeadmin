import React from "react";
import "../../styles/index.css";
import SideNav from "@/components/Admin/SideNav";
import { cookies } from "next/headers";
let isAuthenticated = false;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("session")?.value ?? null;

  if (token === null) {
    isAuthenticated = false;
  } else {
    isAuthenticated = true;
  }
  return (
    <html suppressHydrationWarning lang="en">
    {/*
      <head /> will contain the components returned by the nearest parent
      head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
    */}
    <head />

    <body className={`bg-[#FCFCFC] dark:bg-black`}>

<div className="flex h-screen flex-col md:flex-row">
<div className="w-full flex-none md:w-64 bg-gray-900">
<SideNav isAuthenticated={isAuthenticated} />
      </div>
      <div className="grow rounded shadow-lg shadow-black md:overflow-y-auto [&::-webkit-scrollbar]:hidden rounded-xl md:mx-2 px-3 md:mt-3 mt-20 py-12">{children}</div>
        </div>
    </body>
  </html>
  );
};