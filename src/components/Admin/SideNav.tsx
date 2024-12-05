'use client';
import React from "react";
import Link from "next/link";
import NavLinks from "./nav-links";
import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";
import { KeyIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { logoutUser } from "@/app/actions/auth";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function SideNav({isAuthenticated}: {isAuthenticated: boolean}) {
    const segment = useSelectedLayoutSegment();
    return(
      <div className="fixed right-0 left-0 md:w-64 z-[1000]"> 
      <div className="flex md:h-screen bg-black   py-6 items-center md:flex-col px-3  md:px-2">
      <Link
        className="mb-2 flex h-16 items-end justify-start rounded-md bg-gray-100 p-4 md:h-40"
        href="/"
      >
        <div className="w-24 text-white md:w-40">
          <Image
            src="/images/logo/logo.svg"
            alt="logo"
            width={150}
            height={50}
              className="responsive"
          />
        </div>
      </Link>
       
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
      {!! isAuthenticated && <NavLinks />}
        <div className="hidden h-32 md:w-60 grow rounded-md  md:block"></div>
        
        {isAuthenticated ? (
           <button 
           onClick={()=> logoutUser()}
       className={` flex h-[48px] grow  text-red-200 md:text-gray-100 items-center justify-center gap-2 rounded-md md:bg-primary p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3 active:bg-opacity-20 active:text-gray-200`}>
           <PowerIcon className="w-6" />
           <p className="hidden md:block">Logout</p></button>
        ) : (
          <><Link
          href="/signin"
         
          className={clsx(
            'flex  grow items-center justify-center gap-2 rounded-md bg-gray-200  md:text-gray-900 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-primary md:text-white text-white': segment === 'signin',
            },
          )}>
          <KeyIcon className="w-6 h-6" />
          <p className="hidden md:block">Sign In</p>
        </Link>
        
        <Link
           
            href='/signup'
            className={clsx(
              'flex  grow items-center justify-center gap-2 rounded-md bg-gray-200  md:text-gray-900 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-primary md:text-white text-white': segment === 'signup',
              },
            )}
          >
            <UserPlusIcon className="w-6" />
            <p className="hidden md:block">Sign Up</p>
          </Link>
        </>
        )}
      </div>
   
</div>
</div>
 
    )
};