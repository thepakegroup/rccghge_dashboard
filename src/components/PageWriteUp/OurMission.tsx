'use client';

import { useFetchData } from '@/hooks/fetchData';
import { useEffect, useState } from 'react';
import OurMissionInfo from './OurMissionInfo';
import { ourMissionI } from '@/util/interface/writeup';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import DeleteModal from '../DeleteModal';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import {
  setCategory,
  setDiscription,
  setMission,
  setTitle,
} from '@/store/slice/mission';
import Loader from '../Loader';
import useUpdateToast from '@/hooks/updateToast';

const OurMission = ({ currentSection }: { currentSection: string }) => {
  const { section } = useAppSelector((state) => state.content);
  const type = useGetTypeOfModal();

  const { title, category, description, btnType } = useAppSelector(
    (state) => state.mission
  );

  const dispatch = useAppDispatch();

  const { id } = useAppSelector((state) => state.mediaItems);
  const { data, loading, fetchData } = useFetchData(`/api/getOurMission/all`);

  const ourMissions: ourMissionI[] = data?.message;
  const updateToast = useUpdateToast();

  const deleteMission = async () => {
    const res = await fetch(`/api/deleteMission/${id}`, {
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

  const updateMission = async () => {
    const serviceData = {
      title,
      description,
      category,
      ...(btnType == 'edit' && id !== undefined ? { id } : {}),
    };

    const res = await fetch(
      `/api/${btnType == 'edit' ? 'updateOurMission' : 'createOurMission'}`,
      {
        method: 'POST',
        body: JSON.stringify(serviceData),
      }
    );

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        title: `Our Mission/Belief ${
          btnType === 'edit' ? 'updated' : 'added!'
        }`,
        info: title,
      });
      dispatch(
        setMission({
          title: '',
          description: '',
          category: 'all',
          id: null,
          btnType: 'add',
        })
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className={`bg-white rounded-lg py-6 px-7 md:overflow-y-scroll md:h-[34.75rem] ${
        currentSection === 'service times' ? 'block' : 'hidden md:block'
      }`}
    >
      <h2 className="font-bold text-lg">Our Mission/Belief</h2>
      <div className="flex flex-col gap-[1.12rem]">
        <label htmlFor="title" className="input-field">
          <span>Event title</span>
          <input
            onChange={(e) => dispatch(setTitle(e.target.value))}
            value={title}
            type="text"
            name="location"
            className="input"
          />
        </label>
        <label htmlFor="description" className="input-field">
          <span>Description</span>
          <textarea
            onChange={(e) => dispatch(setDiscription(e.target.value))}
            value={description}
            rows={10}
            className="input"
          />
        </label>
        <label htmlFor="name" className="input-field">
          <span>Page Category</span>
          <select
            onChange={(e) => dispatch(setCategory(e.target.value))}
            value={category}
            name="type"
            className="input max-w-max pr-7"
          >
            <option value="all">All</option>
            <option value="our-mission">Our mission</option>
            <option value="our-belief">Our belief</option>
          </select>
        </label>
        <button
          onClick={updateMission}
          className="flex-center gap-1 p-2 capitalize rounded-md bg-gray-300 max-w-max text-sm font-semibold"
        >
          {btnType}
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
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-2 mt-3">
          {ourMissions?.map((ourMission) => {
            return (
              <OurMissionInfo
                key={ourMission.id}
                title={ourMission.title}
                description={ourMission.description}
                id={ourMission.id}
              />
            );
          })}
        </div>
      )}
      {type == 'delete' && section === 'mission' && (
        <DeleteModal deleteFunc={deleteMission} />
      )}
    </div>
  );
};

export default OurMission;
