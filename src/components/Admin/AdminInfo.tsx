import useModalType from '@/hooks/modalType';
import Image from 'next/image';
import React from 'react';

const AdminInfo = () => {
  const handleButton = useModalType();

  return (
    <div>
      <p className="col-span-2">smart.okolichiaza@gmail.com</p>
      <p>********</p>
      <p className="flex-center justify-center">
        <span className="text-xs text-white bg-[#EB5017] rounded-full px-2 py-1">
          Super admin
        </span>
      </p>
      <div>
        <div className="flex-center justify-end gap-6">
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

export default AdminInfo;
