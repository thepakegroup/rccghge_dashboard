'use client';

import useModalType from '@/hooks/modalType';
import Image from 'next/image';

const SettingsInfo = () => {
  const handleButton = useModalType();

  return (
    <div className="flex flex-col gap-3 bg-white p-3 md:px-6 md:py-3 rounded-lg">
      <div className="flex-center justify-between">
        <p>Youtube</p>
        <p className="hidden md:block">https://www/somerandomlink.com</p>
        <div className="flex-center justify-end gap-6">
          <button onClick={() => handleButton('modify')}>
            <Image src="icons/edit.svg" alt="" width={24} height={24} />
          </button>
          <button onClick={() => handleButton('delete')}>
            <Image src="icons/delete.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
      <p className="md:hidden">https://www/somerandomlink.com</p>
    </div>
  );
};

export default SettingsInfo;
