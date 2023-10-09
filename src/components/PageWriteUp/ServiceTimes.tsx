import React, { useState } from 'react';
import ServiceInfo from './ServiceInfo';
import { useFetchData } from '@/hooks/fetchData';
import { serviceTime } from '@/util/interface/serviceTime';
import DeleteModal from '../DeleteModal';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { convertTo12HourFormat } from '@/helper/convertTo12HrTime';
import {
  setDiscriptionService,
  setEndTime,
  setName,
  setService,
  setStartTime,
} from '@/store/slice/service';
import Loader from '../Loader';
import useUpdateToast from '@/hooks/updateToast';

const ServiceTimes = ({ currentSection }: { currentSection: string }) => {
  const type = useGetTypeOfModal();
  const { data, loading, fetchData } = useFetchData({
    url: '/api/getServices',
  });
  const { id } = useAppSelector((state) => state.mediaItems);
  const { section } = useAppSelector((state) => state.content);

  const services: serviceTime[] = data?.message;

  const updateToast = useUpdateToast();

  const deleteService = async () => {
    const res = await fetch(`/api/deleteService/${id}`, {
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

  const {
    name,
    startTime,
    endTime,
    description,
    btnType,
    id: editId,
  } = useAppSelector((state) => state.service);
  const dispatch = useAppDispatch();

  const updateService = async () => {
    const serviceData = {
      service_name: name,
      service_period: `${convertTo12HourFormat(
        startTime as string
      )} ${convertTo12HourFormat(endTime as string)}`,
      service_description: description,
      ...(btnType == 'edit' && editId !== undefined ? { id: editId } : {}),
    };

    const res = await fetch(
      `/api/${btnType == 'edit' ? 'updateService' : 'createService'}`,
      {
        method: 'POST',
        body: JSON.stringify(serviceData),
      }
    );

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        title: `Service time ${btnType === 'edit' ? 'updated' : 'added!'}`,
        info: name,
      });
      dispatch(
        setService({
          name: '',
          startTime: '',
          endTime: '',
          description: '',
          btnType: 'add',
          id: null,
        })
      );
    }
  };

  return (
    <div
      className={`bg-white rounded-lg py-6 px-7 md:overflow-y-scroll md:h-[34.75rem] ${
        currentSection === 'service times' ? 'block' : 'hidden md:block'
      }`}
    >
      <h2 className="font-bold text-lg">Service time</h2>
      <div className="flex flex-col gap-[1.12rem] mt-4">
        <label htmlFor="title" className="input-field">
          <span>Servic name</span>
          <input
            onChange={(e) => dispatch(setName(e.target.value))}
            value={name}
            type="text"
            name="location"
            className="input"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label htmlFor="start" className="input-field">
            <span>Start time</span>
            <input
              onChange={(e) => dispatch(setStartTime(e.target.value))}
              value={startTime}
              type="time"
              name="start"
              className="input"
            />
          </label>
          <label htmlFor="end" className="input-field">
            <span>End Time</span>
            <input
              onChange={(e) => dispatch(setEndTime(e.target.value))}
              value={endTime}
              type="time"
              name="end"
              className="input"
            />
          </label>
        </div>
        <label htmlFor="description" className="input-field">
          <span>Description</span>
          <textarea
            onChange={(e) => dispatch(setDiscriptionService(e.target.value))}
            rows={10}
            className="input"
          />
        </label>
        <button
          onClick={updateService}
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
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-2">
            {services?.map((service) => {
              return (
                <ServiceInfo
                  key={service.id}
                  id={service.id}
                  name={service.service_name}
                  serviceTime={service.service_period}
                  description={service.service_description}
                />
              );
            })}
          </div>
        )}
      </div>
      {type == 'delete' && section === 'service times' && (
        <DeleteModal deleteFunc={deleteService} />
      )}
    </div>
  );
};

export default ServiceTimes;
