'use client';

import Image from 'next/image';
import ModalWrappeer from '../ModalWrapper';
import { setModalToggle } from '../../store/slice/Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setToast } from '../../store/slice/toast';
import DragDrop from '../DragDrop';
import useCloseModal from '@/hooks/closeModal';
import {
  setFullStory,
  setName,
  setPosition,
  setQualification,
  setTitle,
} from '@/store/slice/leader';
import { setDescription } from '@/store/slice/content';
import { leadersI } from '@/util/interface/ministry';
import useUpdateToast from '@/hooks/updateToast';

interface modalI {
  handleSubmit: (mediaInfo: any) => void;
}

const ProfileModification = ({ handleSubmit }: modalI) => {
  const dispatch = useAppDispatch();
  const handleCloseModal = useCloseModal();
  const { name, title, qualification, position, description, fullStory } =
    useAppSelector((state) => state.leader);

  const handleSubmitForm = () => {
    const leaderInfo: leadersI = {
      name,
      title,
      qualification,
      position,
      short_description: description,
      full_story_about: fullStory,
    };
    handleSubmit(leaderInfo);
    handleCloseModal();
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
            <label htmlFor="name" className="input-field">
              <span>Name</span>
              <input
                onChange={(e) => dispatch(setName(e.target.value))}
                value={name}
                name="name"
                type="text"
                className="input"
              />
            </label>
            <label htmlFor="title" className="input-field">
              <span>Title</span>
              <input
                onChange={(e) => dispatch(setTitle(e.target.value))}
                value={title}
                name="title"
                type="text"
                className="input"
              />
            </label>
            <label htmlFor="qualification" className="input-field">
              <span>Qualification</span>
              <input
                onChange={(e) => dispatch(setQualification(e.target.value))}
                value={qualification}
                name="qualification"
                type="text"
                className="input"
              />
            </label>
            <label htmlFor="position" className="input-field">
              <span>Position</span>
              <input
                onChange={(e) => dispatch(setPosition(e.target.value))}
                value={position}
                name="position"
                type="text"
                className="input"
              />
            </label>
            <label htmlFor="description" className="input-field">
              <span>Short description</span>
              <input
                onChange={(e) => dispatch(setDescription(e.target.value))}
                value={description}
                name="description"
                type="text"
                className="input"
              />
            </label>
            <label htmlFor="fullStory" className="input-field">
              <span>Full story</span>
              <textarea
                onChange={(e) => dispatch(setFullStory(e.target.value))}
                value={fullStory}
                name="fullStory"
                rows={5}
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
            update
          </button>
        </div>
      </>
    </ModalWrappeer>
  );
};

export default ProfileModification;
