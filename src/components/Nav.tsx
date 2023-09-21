'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSidebarToggle } from '../store/slice/sidbar';
import { RootState } from '../store/store';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { usePathname } from 'next/navigation';

const Nav = () => {
  const isSidebarOpen = useAppSelector((state) => state.sideBar.isSidebarOpen);

  const isButtonVisible = useAppSelector(
    (state) => state.buttonVisible.isButtonViible
  );

  const pathname = usePathname();

  const section: { [key: string]: string } = {
    '/': 'home',
    '/testimonies': 'testimonies',
    '/manage-events': 'manage events',
    '/page-writeup': 'page writeup',
    '/ministry': 'ministry',
    '/settings': 'page settings',
    '/admin': 'admin',
  };

  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(setIsSidebarToggle(!isSidebarOpen));
  };

  useEffect(() => {
    isSidebarOpen
      ? document.body.classList.add('overflow-hidden')
      : document.body.classList.remove('overflow-hidden');
  }, [isSidebarOpen]);

  return (
    <nav className="flex-center justify-between bg-white px-4 py-3 fixed top-0 w-full">
      <div className="flex-center gap-5">
        <Image
          src="icons/hamburger.svg"
          alt=""
          width={24}
          height={24}
          className="cursor-pointer h-auto w-auto"
          onClick={handleToggle}
        />
        <div className="font-bold text-lg capitalize">{section[pathname]}</div>
      </div>
      <button
        className={`py-2 px-3 text-sm font-semibold bg-secondary gap-[0.3rem] text-white rounded-md ${
          isButtonVisible ? 'hidden' : 'flex-center'
        }`}
      >
        <span>Add media</span>
        <Image
          src="icons/plus.svg"
          alt=""
          width={18}
          height={18}
          className="cursor-pointer"
        />
      </button>
    </nav>
  );
};

export default Nav;
