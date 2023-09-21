'use client';

import Image from 'next/image';
import ModalWrappeer from '../ModalWrapper';
import { setModalToggle } from '../../store/slice/Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setToast } from '../../store/slice/toast';
import DragDrop from '../DragDrop';
import useCloseModal from '@/hooks/closeModal';

interface modalI {
  handleSubmit?: () => void;
  buttonText: string;
}

const ProfileModification = ({ buttonText }: modalI) => {
  const dispatch = useAppDispatch();
  const handleCloseModal = useCloseModal();

  const handleSubmit = () => {
    dispatch(
      setToast({
        isToast: true,
        title: 'Item Added',
        info: 'Insstagram have been added',
      })
    );
  };

  return (
    <ModalWrappeer>
      <>
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal modal-content"
        >
          <div className="flex-center justify-end font-semibold text-base text-secondary-01">
            <button onClick={handleCloseModal} className="flex-center gap-2">
              <span>Close</span>
              <Image src="icons/close.svg" alt="" width={24} height={24} />
            </button>
          </div>

          <div className="px-4 py-6 rounded-md border border-dashed border-[#D0D5DD] my-6">
            <div className="flex-center justify-between">
              <div className="flex-center gap-3">
                <div className="w-8 h-8 flex-center justify-center rounded-full bg-[#0F973D]/20">
                  <Image
                    src="icons/success.svg"
                    alt=""
                    width={24}
                    height={24}
                  />
                </div>
                <div>
                  <p className="text-gray-800 text-sm font-medium">
                    IMG_1616-01-01.jpeg
                  </p>
                  <span className="text-[0.6875rem] text-gray-400">
                    313 KB . 31 Aug, 2022{' '}
                  </span>
                </div>
              </div>
              <button className="flex-center gap-2 text-[#EB5017]">
                <Image src="icons/delete.svg" alt="" width={24} height={24} />
                <span>Clear</span>
              </button>
            </div>
          </div>

          <form className="flex flex-col gap-[1.19rem] min-h-[200px] pb-10">
            <label htmlFor="type" className="input-field">
              <span>Name</span>
              <input type="text" className="input" />
            </label>
            <label htmlFor="name" className="input-field">
              <span>Title</span>
              <input type="text" className="input" />
            </label>
            <label htmlFor="link" className="input-field">
              <span>Qualification</span>
              <input type="text" className="input" />
            </label>
            <label htmlFor="link" className="input-field">
              <span>Position</span>
              <input type="text" className="input" />
            </label>
            <label htmlFor="link" className="input-field">
              <span>Short description</span>
              <input type="text" className="input" />
            </label>
          </form>
        </div>
        <div className="absolute bottom-4 left-0 w-full px-9 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-4 bg-secondary-02 w-full text-white rounded-md"
          >
            {buttonText}
          </button>
        </div>
      </>
    </ModalWrappeer>
  );
};

export default ProfileModification;
