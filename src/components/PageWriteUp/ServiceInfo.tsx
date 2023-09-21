import useModalType from '@/hooks/modalType';
import Image from 'next/image';
import React from 'react';

interface infoI {
  title: string;
  startTime: string;
  endTime: string;
}

const ServiceInfo = () => {
  const handleButton = useModalType();

  return (
    <div className="flex-center justify-between bg-[#F2F2F2] rounded-lg p-4">
      <div className="font-semibold">
        <h2 className="text-base">DIGGING DEEP: BIBLE STUDY - ONLINE ONLY</h2>
        <span className="text-sm text-ash-300">7:00PM - 8:00PM</span>
      </div>
      <div className="flex-center gap-6">
        <button onClick={() => handleButton('modify')}>
          <Image src="icons/edit.svg" alt="" width={24} height={24} />
        </button>
        <button onClick={() => handleButton('delete')}>
          <Image src="icons/delete.svg" alt="" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default ServiceInfo;
