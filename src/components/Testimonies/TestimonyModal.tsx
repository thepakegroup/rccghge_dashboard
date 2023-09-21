import Image from 'next/image';
import ModalWrapper from '../ModalWrapper';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalToggle } from '@/store/slice/Modal';
import useCloseModal from '@/hooks/closeModal';

const TestimonyModal = () => {
  const handleCloseModal = useCloseModal();

  return (
    <ModalWrapper>
      <div onClick={(e) => e.stopPropagation()} className="modal p-6">
        <div className="flex items-start justify-between text-xs text-[#686868]">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2 md:flex-row">
              <p className="font-bold">Posted on:</p>
              <div className="">
                <span>Aug 22, 2023</span>
                <span>2:48am</span>
              </div>
            </div>
            <span>smart.okolichiaza@gmail.com</span>
          </div>
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
        </div>
        <div className="mt-6 flex flex-col gap-6">
          <label htmlFor="type" className="input-field">
            <span>Title</span>
            <textarea rows={2} className="input" />
          </label>
          <label htmlFor="type" className="input-field">
            <span>Body</span>
            <textarea rows={5} className="input" />
          </label>
        </div>
        <div className="flex justify-center mt-6">
          <button
            // onClick={handleSubmit}
            className="px-6 py-4 bg-secondary-02 w-full text-white rounded-md"
          >
            update
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default TestimonyModal;
