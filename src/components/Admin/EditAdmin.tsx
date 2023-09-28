'use client';

import Image from 'next/image';
import ModalWrapper from '../ModalWrapper';
import useCloseModal from '@/hooks/closeModal';
import { useState } from 'react';

interface editAdminI {
  handleSubmit: (mediaInfo: any) => void;
}

const EditAdmin = ({ handleSubmit }: editAdminI) => {
  const handleCloseModal = useCloseModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState('admin');

  const submitForm = () => {
    const adminLevel = level === 'admin' ? '1' : '2';
    handleSubmit({ email, password, level: adminLevel });
    handleCloseModal();
  };

  return (
    <ModalWrapper>
      <div onClick={(e) => e.stopPropagation()} className="modal pb-8">
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
        <form className="flex flex-col gap-[1.19rem]">
          <label htmlFor="email" className="input-field flex-1 relative">
            <span>Admin email</span>
            <div className="relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="input"
              />
              <Image
                src="icons/mail.svg"
                alt=""
                width={20}
                height={20}
                className="absolute top-1/2 -translate-y-1/2 right-3"
              />
            </div>
          </label>
          <label htmlFor="password" className="input-field relative">
            <span>Admin password</span>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="input"
              />
              <Image
                src="icons/eye.svg"
                alt=""
                width={20}
                height={20}
                className="absolute top-1/2 -translate-y-1/2 right-3"
              />
            </div>
          </label>
          <label htmlFor="level" className="input-field flex-1">
            <span>Admin level</span>
            <select
              onChange={(e) => setLevel(e.target.value)}
              value={level}
              name="level"
              className="input"
            >
              <option value=""></option>
              <option value="admin">Admin</option>
              <option value="super admin">Super admin</option>
            </select>
          </label>
          <button
            onClick={submitForm}
            className="px-6 py-4 bg-secondary-02 w-full text-white rounded-md"
          >
            Update
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
};

export default EditAdmin;
