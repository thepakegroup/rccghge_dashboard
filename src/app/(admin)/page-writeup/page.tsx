'use client';

import ServiceTimes from '@/components/PageWriteUp/ServiceTimes';
import WriteUpSection from '@/components/PageWriteUp/WriteUpSection';
import { useState } from 'react';

const PageWriteUp = () => {
  const [currentSection, setCurrentSection] = useState('our misssion/belief');

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
                <option value="our-mission">Our mission</option>
                <option value="our-belief">Our belief</option>
              </select>
            </label>
          </div>
        </div>
        <ServiceTimes currentSection={currentSection} />
      </div>
      <WriteUpSection currentSection={currentSection} />
    </section>
  );
};

export default PageWriteUp;
