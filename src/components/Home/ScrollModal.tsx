'use client';

import { labels } from '@/util/constants';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ScrollModal = () => {
  const [toggleModal, setToggleModal] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  };

  return (
    <div className="fixed right-4 bottom-12 z-30">
      <div
        className={`bg-white rounded-lg px-2 py-4 shadow-modalShadow ${
          toggleModal ? 'block' : 'hidden'
        }`}
      >
        <div className="px-4">
          <p className="text-sm font-semibold text-gray-900">Scroll to</p>
          <span className="text-xs text-gray-500">
            List of sections on this dashboard
          </span>
        </div>
        <ul className="capitalize [&>li]:px-4 [&>li]:py-2 [&>li]:cursor-pointer [&>li:hover]:bg-[#E5E8ED] text-gray-900 text-sm">
          {labels.map((label) => {
            return (
              <li
                key={label.value}
                onClick={() => scrollToSection(label.value)}
              >
                {label.label}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-end">
        <div
          onClick={() => setToggleModal((prev) => !prev)}
          className="flex-center justify-center bg-white rounded-full border border-black w-8 h-8 cursor-pointer mt-5"
        >
          <Image src="icons/scroll.svg" alt="" width={24} height={24} />
        </div>
      </div>
    </div>
  );
};

export default ScrollModal;
