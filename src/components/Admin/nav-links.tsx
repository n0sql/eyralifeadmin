'use client';

import {
  UserGroupIcon,
  HomeIcon,
  UserPlusIcon,
  HandRaisedIcon,
  DocumentDuplicateIcon,
  
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'admin', href: '/', icon: HomeIcon },
  {
    name: 'Contact Form',
    href: '/contact-form',
    icon: HandRaisedIcon,
  },
  { name: 'Semaglutide Orders',
    href: '/orders', icon: UserPlusIcon, },
  { name: 'Users', href: '/users', icon: UserGroupIcon, },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow text-[#089cdc] items-center justify-center gap-2 rounded-md  text-sm font-medium  hover:text-gray-200 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                ' bg-opacity-20 text-gray-200 underline underline-offset-4': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}