'use client';

import { useAppSelector } from '@/store/hooks';

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  const isSidebarOpen = useAppSelector((state) => state.sideBar.isSidebarOpen);
  return (
    <section
      className={`mt-[3.8rem] [&>section]:pb-28 [&>section]:px-3 ${
        isSidebarOpen ? 'ml-[271px]' : 'ml-0'
      }`}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
