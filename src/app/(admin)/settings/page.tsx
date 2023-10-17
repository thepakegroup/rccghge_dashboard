"use client";

import DeleteModal from "@/components/DeleteModal";
import Loader from "@/components/Loader";
import EditSettings from "@/components/Settings/EditSettings";
import SettingsInfo from "@/components/Settings/SettingsInfo";
import { useFetchData } from "@/hooks/fetchData";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import useUpdateToast from "@/hooks/updateToast";
import { useAppSelector } from "@/store/hooks";
import { settingI } from "@/util/interface/settings";
import { useEffect, useState } from "react";

const Settings = () => {
  const type = useGetTypeOfModal();

  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  const { data, loading, fetchData } = useFetchData({
    url: "/api/getAllSettings",
  });
  const { id } = useAppSelector((state) => state.mediaItems);

  const settings: settingI[] = data?.message;

  const [sortSettings, setSortSettings] = useState<settingI[]>(settings);
  const [sorted, setSorted] = useState(false);

  const updateToast = useUpdateToast();

  const updateSettings = async (settingInfo: any) => {
    const settingData = {
      ...settingInfo,
      id,
    };

    const res = await fetch(`/api/updateSettings`, {
      method: "POST",
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
      method: "DELETE",
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        type: "delete",
      });
    }
  };

  const createSetting = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/createSetting", {
      method: "POST",
      body: JSON.stringify({ name, value }),
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        title: `Setting added!`,
        info: name,
      });
      setName("");
      setValue("");
    }
  };

  useEffect(() => {
    if (sorted) {
      const sortedItems = settings.slice().sort((a, b) => {
        const titleA = a.name.toLowerCase();
        const titleB = b.name.toLowerCase();
        return titleA.localeCompare(titleB);
      });

      setSortSettings(sortedItems);
      return;
    }

    setSortSettings(settings);
  }, [sorted, settings]);

  return (
    <section className=" max-w-full md:max-w-[90vw] lg:max-w-[70vw]">
      <h1 className="text-[#717171] text-lg font-bold">Create setting</h1>
      <form className="flex flex-col md:grid md:grid-cols-6 gap-[1.12rem] mt-9 md:items-center">
        <label htmlFor="name" className="input-field col-span-2">
          <span>Name</span>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            name="name"
            required
            className="input"
          />
        </label>
        <label htmlFor="value" className="input-field col-span-3">
          <span>Setting Value</span>
          <input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            type="text"
            required
            name="value"
            className="input"
          />
        </label>
        <div className="md:pt-5 col-span-1 !w-full">
          <button
            onClick={createSetting}
            className="w-full bg-[#052A53] text-white rounded-md px-6 py-4"
          >
            Submit
          </button>
        </div>
      </form>
      <button
        onClick={() => {
          setSorted(!sorted);
          // console.log(sorted);
        }}
        className={`rounded-lg border border-[#D0D5DD] px-3 py-[0.375rem] my-4 ${
          sorted && "bg-[#C5D5F1]"
        }`}
      >
        A-Z
      </button>
      {loading ? (
        <Loader />
      ) : (
        <div className="text-base font-medium flex flex-col gap-2">
          {sortSettings?.map((setting) => {
            const { id, value, name } = setting;
            return <SettingsInfo key={id} id={id} value={value} name={name} />;
          })}
        </div>
      )}
      {type == "modify" && <EditSettings handleSubmit={updateSettings} />}
      {type == "delete" && <DeleteModal deleteFunc={deleteSetting} />}
    </section>
  );
};

export default Settings;
