'use client';

const OurMission = ({ currentSection }: { currentSection: string }) => {
  return (
    <div
      className={`bg-white rounded-lg py-6 px-7 ${
        currentSection === 'our misssion/belief' ? 'block' : 'hidden md:block'
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
  );
};

export default OurMission;
