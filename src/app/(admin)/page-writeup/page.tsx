'use client';

import DeleteModal from '@/components/DeleteModal';
import Content from '@/components/PageWriteUp/Content';
import ServiceInfo from '@/components/PageWriteUp/ServiceInfo';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import { useState } from 'react';

const PageWriteUp = () => {
  const type = useGetTypeOfModal();
  const [currentSection, setCurrentSection] = useState('our misssion/belief');
  // console.log(currentSection);
  return (
    <section>
      <div className="flex justify-center mb-3 md:hidden">
        <select
          onChange={(e) => setCurrentSection(e.target.value)}
          value={currentSection}
          className="p-4 rounded-md bg-white"
        >
          <option value="our misssion/belief">Our Mission/Belief</option>
          <option value="service times">Service times</option>
          <option value="edit content">Edit content</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div
          className={`bg-white rounded-lg py-6 px-7 ${
            currentSection === 'our misssion/belief'
              ? 'block'
              : 'hidden md:block'
          }`}
        >
          <h2 className="font-bold text-lg">Our Mission/Belief</h2>
          <div className="flex flex-col gap-[1.12rem]">
            <label htmlFor="title" className="input-field">
              <span>Event title</span>
              <input type="text" name="location" className="input" />
            </label>
            <label htmlFor="description" className="input-field">
              <span>Description</span>
              <textarea rows={10} className="input" />
            </label>
            <label htmlFor="name" className="input-field">
              <span>Page Category</span>
              <select name="type" className="input max-w-max pr-7">
                <option value="our mission">Our mission</option>
                <option value="our belief">Our belief</option>
              </select>
            </label>
          </div>
        </div>
        <div
          className={`bg-white rounded-lg py-6 px-7 md:overflow-y-scroll md:h-[34.75rem] ${
            currentSection === 'service times' ? 'block' : 'hidden md:block'
          }`}
        >
          <h2 className="font-bold text-lg">Service time</h2>
          <div className="flex flex-col gap-[1.12rem]">
            <label htmlFor="title" className="input-field">
              <span>Servic name</span>
              <input type="text" name="location" className="input" />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label htmlFor="start" className="input-field">
                <span>Servic name</span>
                <input type="time" name="start" className="input" />
              </label>
              <label htmlFor="end" className="input-field">
                <span>Servic name</span>
                <input type="time" name="end" className="input" />
              </label>
            </div>
            <label htmlFor="description" className="input-field">
              <span>Description</span>
              <textarea rows={10} className="input" />
            </label>
            <button className="flex-center gap-1 p-2 rounded-md bg-gray-300 max-w-max text-sm font-semibold">
              Add{' '}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10.8333 3.33333C10.8333 2.8731 10.4602 2.5 10 2.5C9.53976 2.5 9.16667 2.8731 9.16667 3.33333V9.16667H3.33333C2.8731 9.16667 2.5 9.53976 2.5 10C2.5 10.4602 2.8731 10.8333 3.33333 10.8333H9.16667V16.6667C9.16667 17.1269 9.53976 17.5 10 17.5C10.4602 17.5 10.8333 17.1269 10.8333 16.6667V10.8333H16.6667C17.1269 10.8333 17.5 10.4602 17.5 10C17.5 9.53976 17.1269 9.16667 16.6667 9.16667H10.8333V3.33333Z"
                    fill="#686868"
                  />
                </svg>
              </span>
            </button>
            <div className="flex flex-col gap-2">
              <ServiceInfo />
              <ServiceInfo />
              <ServiceInfo />
              <ServiceInfo />
              <ServiceInfo />
            </div>
          </div>
        </div>
      </div>
      <section
        className={`mt-3 ${
          currentSection === 'edit content' ? 'block' : 'hidden md:block'
        }`}
      >
        <div className="bg-white rounded-lg py-6 px-7">
          <h2 className="font-bold text-lg">Edit content</h2>
          <div className="flex flex-col gap-[1.12rem]">
            <label htmlFor="target" className="input-field">
              <span>Target page</span>
              <input type="text" name="target" className="input" />
            </label>
            <label htmlFor="heading" className="input-field">
              <span>Heading</span>
              <input type="text" name="heading" className="input" />
            </label>
            <label htmlFor="description" className="input-field">
              <textarea rows={10} className="input" />
            </label>
          </div>

          <button className="text-sm font-semibold bg-gray-300 rounded-md px-4 py-2 my-5">
            Create Post
          </button>

          <div className="flex flex-col gap-2">
            <Content />
            <Content />
            <Content />
            <Content />
            <Content />
          </div>
        </div>
      </section>
      {type == 'delete' && <DeleteModal />}
    </section>
  );
};

export default PageWriteUp;
