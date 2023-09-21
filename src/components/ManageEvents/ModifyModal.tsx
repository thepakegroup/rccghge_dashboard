'use client';

import Image from 'next/image';
import ModalWrapper from '../ModalWrapper';
import { setModalToggle } from '../../store/slice/Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setToast } from '../../store/slice/toast';
import DragDrop from '../DragDrop';
import useCloseModal from '@/hooks/closeModal';

interface modalI {
  handleSubmit?: () => void;
  buttonText: string;
}

const ModifyModal = ({ buttonText }: modalI) => {
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
    <ModalWrapper>
      <>
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal modal-content"
        >
          <div
            onClick={handleCloseModal}
            className="flex-center justify-end font-semibold text-base text-secondary-01 cursor-pointer"
          >
            <span>Close</span>
            <Image
              src="icons/close.svg"
              alt=""
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
          <div className="px-4 py-6 rounded-md border border-dashed border-[#D0D5DD] my-6">
            <DragDrop>
              <div className="flex-center md:flex-col gap-3 relative cursor-pointer">
                <div className="flex justify-center">
                  <Image
                    src="icons/upload.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                </div>
                <div className="hidden md:block text-center">
                  <p className="text-gray-600 text-sm">
                    <span className="text-secondary-01">Click to upload</span>{' '}
                    <span>or drag and drop</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
                <div className="md:hidden mt-4 text-center">
                  <p className="text-gray-600 text-sm">
                    <span className="text-secondary-01">Tap upload</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </p>
                </div>
                <button className="md:hidden bg-[#EB5017] px-4 py-2 text-white text-sm font-semibold rounded-md">
                  Upload
                </button>
              </div>
            </DragDrop>
          </div>
          <form className="flex flex-col gap-[1.19rem] min-h-[200px]">
            <label htmlFor="type" className="input-field">
              <span>Event title</span>
              <select name="type" className="input">
                <option value=""></option>
              </select>
            </label>
            <label htmlFor="start" className="input-field">
              <span>Start Date</span>
              <input type="date" name="start" id="start" className="input" />
            </label>
            <label htmlFor="end" className="input-field">
              <span>End Date</span>
              <input type="date" name="end" id="end" className="input" />
            </label>

            <label htmlFor="location" className="input-field">
              <span>Event Location</span>
              <input type="text" name="location" className="input" />
            </label>
            <label htmlFor="type" className="input-field">
              <span>Short description</span>
              <textarea rows={10} className="input" />
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
    </ModalWrapper>
  );
};

export default ModifyModal;
