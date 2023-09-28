import useModalType from '@/hooks/modalType';
import { useAppDispatch } from '@/store/hooks';
import { setDeleteFunc } from '@/store/slice/content';
import { setEditMediaId } from '@/store/slice/mediaItems';
import { setService } from '@/store/slice/service';
import Image from 'next/image';
import React from 'react';

interface infoI {
  name: string;
  serviceTime: string;
  id: number;
}

const ServiceInfo = ({ name, serviceTime, id }: infoI) => {
  const handleButton = useModalType();

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    handleButton('delete');
    dispatch(setEditMediaId(id));
    dispatch(setDeleteFunc('service times'));
  };

  const handleEdit = () => {
    handleButton('modify');
    dispatch(setService({ name, btnType: 'edit' }));
  };

  return (
    <div className="flex-center justify-between bg-[#F2F2F2] rounded-lg p-4">
      <div className="font-semibold">
        <h2 className="text-base">{name}</h2>
        <span className="text-sm text-ash-300">{serviceTime}</span>
      </div>
      <div className="flex-center gap-6">
        <button onClick={handleEdit}>
          <Image src="icons/edit.svg" alt="" width={24} height={24} />
        </button>
        <button onClick={handleDelete}>
          <Image src="icons/delete.svg" alt="" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default ServiceInfo;
