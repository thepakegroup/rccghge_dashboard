'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { setIsSidebarToggle } from '../store/slice/sidbar';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const Sidebar = () => {
  const pathname = usePathname();

  const isSidebarOpen = useAppSelector((state) => state.sideBar.isSidebarOpen);

  const dispatch = useAppDispatch();

  const windowSize = typeof window !== 'undefined' ? window.innerWidth : 0;

  const handleToggle = () => {
    window.innerWidth < 768 && dispatch(setIsSidebarToggle(!isSidebarOpen));
  };

  const [screenWidth, setScreenWidth] = useState<number>(windowSize);

  const updateScreenSize = () => {
    if (typeof window === 'undefined') return;

    setScreenWidth(windowSize);
  };

  // console.log(screenWidth);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('resize', updateScreenSize);
    updateScreenSize();

    if (screenWidth > 768) {
      dispatch(setIsSidebarToggle(true));
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  const navItems = [
    {
      title: 'Home',
      info: 'Dashboard',
      icon: 'icons/home.svg',
      link: '/',
    },
    {
      title: 'Testimonies',
      info: 'Manage testimonies',
      icon: 'icons/star.svg',
      link: '/testimonies',
    },
    {
      title: 'manage events',
      info: 'Add and remove events',
      icon: 'icons/event.svg',
      link: '/manage-events',
    },
    {
      title: 'page writeup',
      info: 'manage page text content',
      icon: 'icons/write.svg',
      link: '/page-writeup',
    },
    {
      title: 'minstry',
      info: 'manage leaders & ministry',
      icon: 'icons/minister.svg',
      link: '/ministry',
    },
    {
      title: 'page settings',
      info: 'manage site settings',
      icon: 'icons/settings.svg',
      link: '/settings',
    },
    {
      title: 'admin',
      info: 'add & remove admins',
      icon: 'icons/admin.svg',
      link: '/admin',
    },
  ];

  return (
    <aside
      onClick={handleToggle}
      className={`absolute md:relative md:max-w-max md:z-0 top-0 z-40 w-full text-white transition-all ease-in-out delay-150 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full hidden'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="px-2 py-3 min-h-screen w-[17rem] bg-side-bar-bg relative"
      >
        <div className="bg-white rounded-md p-[0.465] max-w-max">
          <Image src="/images/logo.png" alt="" width={54} height={40} />
        </div>
        <ul className="mt-20">
          {navItems.map((navItem) => {
            const { title, icon, info, link } = navItem;
            return (
              <li key={title}>
                <Link
                  href={link}
                  className={`flex-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all hover:bg-secondary ${
                    pathname === link && 'bg-secondary'
                  }`}
                  onClick={handleToggle}
                >
                  <Image
                    src={icon}
                    alt=""
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                  <div className="capitalize">
                    <p className="text-sm font-bold">{title}</p>
                    <span className="text-xs font-medium">{info}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="absolute bottom-0 max-w-max border-t-2 border-[#657596]">
          <div
            className="flex-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all hover:bg-secondary"
            onClick={handleToggle}
          >
            <Image
              src="/icons/logout.svg"
              alt=""
              width={24}
              height={24}
              className="cursor-pointer"
            />
            <div className="capitalize">
              <p className="text-sm font-bold text-secondary-01">Logout</p>
              <span className="text-xs font-medium">
                smart.okolichiaza@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
