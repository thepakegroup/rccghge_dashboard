'use client';

import useModalType from '@/hooks/modalType';
import { useAppDispatch } from '@/store/hooks';
import { setEditMediaId } from '@/store/slice/mediaItems';
import { settingI } from '@/util/interface/settings';
import Image from 'next/image';

const SettingsInfo = ({ name, id, value }: settingI) => {
  const handleButton = useModalType();

  const dispatch = useAppDispatch();

  const handleEditSettings = () => {
    handleButton('modify');
    dispatch(setEditMediaId(id));
  };

  const handleDeleteSettings = () => {
    handleButton('delete');
    dispatch(setEditMediaId(id));
  };

  return (
    <div className="flex flex-col gap-3 bg-white p-4 md:px-6 md:py-5 rounded-lg">
      <div className="flex-center justify-between">
        <p>{name}</p>
        <p className="hidden md:block truncate">{value}</p>
        <div className="flex-center justify-end gap-6">
          <button onClick={handleEditSettings}>
            <Image src="icons/edit.svg" alt="" width={24} height={24} />
          </button>
          <button onClick={handleDeleteSettings}>
            <Image src="icons/delete.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
      <p className="truncate md:hidden">{value}</p>
    </div>
  );
};

export default SettingsInfo;
