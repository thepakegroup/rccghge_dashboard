'use client';

import useModalType from '@/hooks/modalType';
import Image from 'next/image';

const ProfileCard = () => {
  const handleButton = useModalType();

  return (
    <div className="bg-white rounded-lg p-3">
      <div className="hidden md:flex md:justify-end md:gap-6">
        <button onClick={() => handleButton('modify')}>
          <Image src="icons/edit.svg" alt="" width={24} height={24} />
        </button>
        <button onClick={() => handleButton('delete')}>
          <Image src="icons/delete.svg" alt="" width={24} height={24} />
        </button>
        <button>
          <Image src="icons/options.svg" alt="" width={24} height={24} />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
        <div className="flex justify-between flex-col gap-6">
          <Image
            src="/images/dummy.png"
            alt=""
            height={553}
            width={400}
            className="md:my-4"
          />
          <div className="md:hidden flex gap-6">
            <button onClick={() => handleButton('modify')}>
              <Image src="icons/edit.svg" alt="" width={24} height={24} />
            </button>
            <button onClick={() => handleButton('delete')}>
              <Image src="icons/delete.svg" alt="" width={24} height={24} />
            </button>
            <button>
              <Image src="icons/options.svg" alt="" width={24} height={24} />
            </button>
          </div>
        </div>
        <div className="text-sm flex flex-col gap-3">
          <div>
            <p className="font-medium">Name</p>
            <p className="font-bold">Okoli Chiaza</p>
          </div>
          <div>
            <p className="font-medium">Title</p>
            <p className="font-bold">Okoli Chiaza</p>
          </div>
          <div>
            <p className="font-medium">Qualification</p>
            <p className="font-bold">Okoli Chiaza</p>
          </div>
          <div>
            <p className="font-medium">Posiion</p>
            <p className="font-bold">Okoli Chiaza</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
