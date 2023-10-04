'use client';

import DeleteModal from '@/components/DeleteModal';
import Loader from '@/components/Loader';
import EditSettings from '@/components/Settings/EditSettings';
import SettingsInfo from '@/components/Settings/SettingsInfo';
import { useFetchData } from '@/hooks/fetchData';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import useUpdateToast from '@/hooks/updateToast';
import { useAppSelector } from '@/store/hooks';
import { settingI } from '@/util/interface/settings';
import { useState } from 'react';

const Settings = () => {
  const type = useGetTypeOfModal();

  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  const { data, loading, fetchData } = useFetchData({
    url: '/api/getAllSettings',
  });
  const { id } = useAppSelector((state) => state.mediaItems);

  // console.log(id);

  const settings: settingI[] = data?.message;
  const updateToast = useUpdateToast();

  const updateSettings = async (settingInfo: any) => {
    const settingData = {
      ...settingInfo,
      id,
    };

    const res = await fetch(`/api/updateSettings`, {
      method: 'POST',
      body: JSON.stringify(settingData),
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        title: `Setting updated!`,
        info: settingInfo.name,
      });
    }
  };

  const deleteSetting = async () => {
    const res = await fetch(`/api/deleteSetting/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        type: 'delete',
      });
    }
  };

  const createSetting = async (e: any) => {
    e.preventDefault();

    const res = await fetch('/api/createSetting', {
      method: 'POST',
      body: JSON.stringify({ name, value }),
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        title: `Setting added!`,
        info: name,
      });
      setName('');
      setValue('');
    }
  };

  return (
    <section className=" md:max-w-[70vw]">
      <h1 className="text-[#717171] text-lg font-bold">Create setting</h1>
      <form className="flex flex-col md:flex-center md:flex-row gap-[1.12rem] mt-9">
        <label htmlFor="name" className="input-field">
          <span>Name</span>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            name="name"
            className="input"
          />
        </label>
        <label htmlFor="value" className="input-field">
          <span>Setting Value</span>
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type="text"
            name="value"
            className="input"
          />
        </label>
        <div className="md:pt-5">
          <button
            onClick={createSetting}
            className="w-full bg-[#052A53] text-white rounded-md px-6 py-4"
          >
            Submit
          </button>
        </div>
      </form>
      <button className=" rounded-lg border border-[#D0D5DD] px-3 py-[0.375rem] my-4">
        A-Z
      </button>
      {loading ? (
        <Loader />
      ) : (
        <div className="text-base font-medium flex flex-col gap-2">
          {settings?.map((setting) => {
            const { id, value, name } = setting;
            return <SettingsInfo key={id} id={id} value={value} name={name} />;
          })}
        </div>
      )}
      {type == 'modify' && <EditSettings handleSubmit={updateSettings} />}
      {type == 'delete' && <DeleteModal deleteFunc={deleteSetting} />}
    </section>
  );
};

export default Settings;
