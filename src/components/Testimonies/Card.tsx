'use client';

import useModalType from '@/hooks/modalType';
import Image from 'next/image';

const Card = () => {
  const handleButton = useModalType();

  return (
    <div className="bg-white border border-[#AEBCD1] rounded-lg p-3">
      <div>
        <span>Aug 22, 2023</span>
        <span>2:48am</span>
      </div>
      <div className="my-[1.38rem]">
        <p className="text-base font-semibold">
          Financial breakthrough beyond my dreams
        </p>
        <p className="text-ash-200 text-sm">
          By placing my faith in God, I experienced a financial breakthrough
          beyond my wildest dreams....
        </p>
      </div>
      <div className="flex-center justify-between">
        <button className="text-sm font-semibold capitalize bg-blue-100 px-4 py-2 rounded-md text-white">
          publish
        </button>
        <div className="flex-center gap-6">
          <button onClick={() => handleButton('modify')}>
            <Image src="icons/edit.svg" alt="" width={24} height={24} />
          </button>
          <button onClick={() => handleButton('delete')}>
            <Image src="icons/delete.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
