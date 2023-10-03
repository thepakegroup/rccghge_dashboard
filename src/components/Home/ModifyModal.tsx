'use client';

import Image from 'next/image';
import ModalWrapper from '../ModalWrapper';

import DragDrop from '../DragDrop';
import useCloseModal from '@/hooks/closeModal';
import { labels } from '@/util/constants';
import { useEffect, useState } from 'react';
import useUpdateToast from '@/hooks/updateToast';
import ImageUpload from '../ImageUpload';
import { useAppDispatch } from '@/store/hooks';
import { setMediaFile } from '@/store/slice/mediaItems';

interface modalI {
  handleSubmit: (mediaInfo: any) => void;
  buttonText: string;
}

const ModifyModal = ({ buttonText, handleSubmit }: modalI) => {
  const handleCloseModal = useCloseModal();

  const [name, setName] = useState('');
  const [mediaLink, setMediaLink] = useState('');
  const [description, setDescription] = useState('');
  const [mediaType, setMediaType] = useState('');

  const handleSubmitForm = () => {
    const mediaInfo = {
      name,
      link: mediaLink,
      short_description: description,
      media_type: mediaType,
    };

    handleSubmit(mediaInfo);
    handleCloseModal();
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setMediaFile(null));
  }, []);

  return (
    <ModalWrapper>
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
          <ImageUpload />
          <form className="flex flex-col gap-[1.19rem] min-h-[200px] pb-10">
            <label htmlFor="type" className="input-field">
              <span>Media type</span>
              <select
                onChange={(e) => setMediaType(e.target.value)}
                value={mediaType}
                name="type"
                className="input"
              >
                <option value=""></option>
                {labels.map((label) => {
                  return (
                    <option key={label.value} value={label.value}>
                      {label.label}
                    </option>
                  );
                })}
              </select>
            </label>
            <label htmlFor="name" className="input-field">
              <span>Media name</span>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="input"
              />
            </label>
            <label htmlFor="link" className="input-field">
              <span>Media link</span>
              <input
                onChange={(e) => setMediaLink(e.target.value)}
                value={mediaLink}
                type="text"
                className="input"
              />
            </label>
            <label htmlFor="description" className="input-field">
              <span>Short description</span>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows={10}
                className="input"
              />
            </label>
          </form>
        </div>
        <div className="absolute bottom-4 left-0 w-full px-9 flex justify-center">
          <button
            onClick={handleSubmitForm}
            className="capitalize px-6 py-4 bg-secondary-02 w-full text-white rounded-md"
          >
            {buttonText}
          </button>
        </div>
      </>
    </ModalWrapper>
  );
};

export default ModifyModal;
