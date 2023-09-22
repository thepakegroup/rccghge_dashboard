'use client';

import DeleteModal from '@/components/DeleteModal';
import EditSettings from '@/components/Settings/EditSettings';
import SettingsInfo from '@/components/Settings/SettingsInfo';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';

const Settings = () => {
  const type = useGetTypeOfModal();
  return (
    <section className=" md:max-w-[70vw]">
      <h1 className="text-[#717171] text-lg font-bold">Create setting</h1>
      <form className="flex flex-col md:flex-center md:flex-row gap-[1.12rem] mt-9">
        <label htmlFor="link" className="input-field">
          <span>Name</span>
          <input type="text" className="input" />
        </label>
        <label htmlFor="link" className="input-field flex-1">
          <span>Value</span>
          <input type="text" className="input" />
        </label>
        <div className="md:pt-5">
          <button className="w-full bg-[#052A53] text-white rounded-md px-6 py-4">
            Submit
          </button>
        </div>
      </form>
      <button className=" rounded-lg border border-[#D0D5DD] px-3 py-[0.375rem] my-4">
        A-Z
      </button>
      <div className="text-base font-medium flex flex-col gap-2">
        <SettingsInfo />
        <SettingsInfo />
        <SettingsInfo />
        <SettingsInfo />
      </div>
      {type == 'modify' && <EditSettings />}
      {type == 'delete' && <DeleteModal />}
    </section>
  );
};

export default Settings;
