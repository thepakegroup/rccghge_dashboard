'use client';

import DeleteModal from '@/components/DeleteModal';
import DragDrop from '@/components/DragDrop';
import ProfileCard from '@/components/Ministry/ProfileCard';
import ProfileModification from '@/components/Ministry/ProfileModification';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import Image from 'next/image';
import React, { useState } from 'react';

const Ministry = () => {
  const type = useGetTypeOfModal();
  const [currentSection, setCurrentSection] = useState('church leader');

  return (
    <section>
      <div className="flex justify-center mb-3 md:hidden">
        <select
          onChange={(e) => setCurrentSection(e.target.value)}
          value={currentSection}
          className="p-4 rounded-md bg-white"
        >
          <option value="church leader">Church Leader</option>
          <option value="church group">Church group</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div
          className={`${
            currentSection === 'church leader' ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="bg-white rounded-lg py-6 px-7 md:h-[38rem] md:overflow-y-auto overflow-x-hidden">
            <h2 className="text-lg font-bold mb-5">Add Church Leader</h2>
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
            <form className="flex flex-col gap-[1.19rem]">
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
              <label htmlFor="description" className="input-field">
                <span>Full story</span>
                <textarea rows={5} className="input" />
              </label>
              <button className="flex-center gap-2 bg-secondary-02 rounded-md max-w-max text-white text-sm px-4 py-2">
                <span>Upload</span>
                <Image
                  src="icons/upload-btn.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
            <ProfileCard />
          </div>
        </div>
        <div
          className={`${
            currentSection === 'church group' ? 'block' : 'hidden md:block'
          }`}
        >
          <div className="bg-white rounded-lg py-6 px-7">
            <h2 className="text-lg font-bold mb-5">Add church groups</h2>
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
              <label htmlFor="name" className="input-field">
                <span>Name</span>
                <input type="text" className="input" />
              </label>
              <label htmlFor="category" className="input-field">
                <span>Category</span>
                <select name="category" className="input">
                  <option value=""></option>
                </select>
              </label>
              <label htmlFor="description" className="input-field">
                <span>Description</span>
                <textarea rows={4} className="input" />
              </label>
              <button className="flex-center gap-2 bg-secondary-02 rounded-md max-w-max text-white text-sm px-4 py-2">
                <span>Upload</span>
                <Image
                  src="icons/upload-btn.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
          <div className="">
            <div className="flex justify-end">
              <select
                placeholder="Sort by"
                className="p-4 rounded-md bg-white my-4 text-sm"
              >
                <option value="most recent">Most recent</option>
                <option value="older">Older</option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <ProfileCard />
              <ProfileCard />
              <ProfileCard />
            </div>
          </div>
        </div>
      </div>
      {type == 'modify' && <ProfileModification buttonText="Update" />}
      {type == 'delete' && <DeleteModal />}
    </section>
  );
};

export default Ministry;
