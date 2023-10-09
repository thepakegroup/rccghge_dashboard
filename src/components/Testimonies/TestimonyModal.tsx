import Image from 'next/image';
import ModalWrapper from '../ModalWrapper';
import useCloseModal from '@/hooks/closeModal';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { useFetchData } from '@/hooks/fetchData';

interface testimoneyModalI {
  buttonText: string;
  handleSubmit: any;
}

const TestimonyModal = ({ buttonText, handleSubmit }: testimoneyModalI) => {
  const handleCloseModal = useCloseModal();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { id } = useAppSelector((state) => state.testimony);
  const { data } = useFetchData({
    url: `/api/getTestimonyById/${id}`,
  });

  const testimony = data?.message;

  const handleSubmitTestimony = () => {
    handleSubmit({ title, content });
    handleCloseModal();
  };

  useEffect(() => {
    if (buttonText === 'Update') {
      setTitle(testimony?.title);
      setContent(testimony?.content);
    }
  }, [testimony]);

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
            <textarea
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              rows={2}
              className="input"
            />
          </label>
          <label htmlFor="type" className="input-field">
            <span>Body</span>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              rows={5}
              className="input"
            />
          </label>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmitTestimony}
            className="px-6 py-4 bg-secondary-02 w-full text-white rounded-md"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default TestimonyModal;
