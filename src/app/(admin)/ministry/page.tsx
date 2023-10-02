'use client';

import ChurchGroup from '@/components/Ministry/ChurchGroup';
import Leaders from '@/components/Ministry/Leaders';
import { useState } from 'react';

const Ministry = () => {
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
        <Leaders currentSection={currentSection} />
        <ChurchGroup currentSection={currentSection} />
      </div>
    </section>
  );
};

export default Ministry;
