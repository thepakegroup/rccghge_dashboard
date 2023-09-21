'use client';

import { useAppDispatch } from '@/store/hooks';
import { setButtonVisibility } from '@/store/slice/ButtonVisibility';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

const AddItemButton = () => {
  const elementRef = useRef(null);
  const dispatch = useAppDispatch();
  const handleScroll = () => {
    const element: any = elementRef.current;
    if (element) {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      dispatch(setButtonVisibility(isVisible));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      ref={elementRef}
      className="py-2 px-3 text-sm font-semibold bg-secondary flex-center gap-[0.3rem] text-white rounded-md"
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
  );
};

export default AddItemButton;
