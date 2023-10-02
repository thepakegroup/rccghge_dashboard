'use client';

import OurMission from '@/components/PageWriteUp/OurMission';
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
        <OurMission currentSection={currentSection} />
        <ServiceTimes currentSection={currentSection} />
      </div>
      <WriteUpSection currentSection={currentSection} />
    </section>
  );
};

export default PageWriteUp;
