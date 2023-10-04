'use client';

import Card from '@/components/Home/Card';
import ScrollModalToTop from '@/components/Home/ScrollModal';
import Image from 'next/image';
import DeleteModal from '@/components/DeleteModal';
import ModifyModal from '@/components/Home/ModifyModal';
import AddItemButton from '@/components/AddItemButton';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import { mediaI } from '@/util/interface/media';
import { useFetchData } from '@/hooks/fetchData';
import Loader from '@/components/Loader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearItems, setFileName } from '@/store/slice/mediaItems';
import { baseUrl, labels } from '@/util/constants';
import useUpdateToast from '@/hooks/updateToast';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function Home() {
  const type = useGetTypeOfModal();

  const { items, file, id } = useAppSelector((state) => state.mediaItems);

  const { data, loading, fetchData } = useFetchData({
    url: `${baseUrl}load-all-media`,
    method: 'client',
  });
  const dispatch = useAppDispatch();

  const updateToast = useUpdateToast();

  if (loading) {
    return <Loader />;
  }

  const handleRemoveMedia = async () => {
    const res = await fetch('/api/removeMedia', {
      method: 'POST',
      body: JSON.stringify(items),
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      dispatch(clearItems());
      updateToast({
        type: 'delete',
      });
    }
  };

  const updateMedia = async (mediaInfo: any) => {
    const form = new FormData();

    file && form.append('media', file as Blob, file?.name);
    form.append('name', mediaInfo.name);
    form.append('media_type', mediaInfo.media_type);
    form.append('short_description', mediaInfo.short_description);
    form.append('link', mediaInfo.mediaLink);
    type === 'modify' && form.append('id', `${id}`);

    const token = Cookies.get('token');

    const res = await axios.post(
      `${
        type == 'modify' ? `${baseUrl}update-media` : `${baseUrl}upload-media`
      }`,
      form,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = res.data;

    console.log(data);

    if (data.error === false) {
      fetchData();
      updateToast({
        title: `Media ${type === 'modify' ? 'updated!' : 'added!'}`,
        info: mediaInfo.name,
      });
      dispatch(clearItems());
      dispatch(setFileName(''));
    }
  };

  const mediaData: mediaI[] = data?.message;

  return (
    <section>
      <div className="flex justify-end mt-2">
        <AddItemButton />
      </div>
      {labels.map((label) => {
        return (
          <section key={label.value} className="mt-6" id={label.value}>
            <div className="flex-center gap-1">
              <Image src="icons/img.svg" alt="" width={18} height={18} />
              <p className="text-base text-fade-ash font-bold">{label.label}</p>
            </div>
            <div className="card-wrapper">
              {mediaData?.map((media) => {
                return (
                  label.value === media.type && (
                    <Card
                      title={media.name}
                      img={media.image_url}
                      id={media.id}
                      link={media.link}
                      key={media.id}
                    />
                  )
                );
              })}
            </div>
          </section>
        );
      })}

      <ScrollModalToTop />

      {type == 'modify' && (
        <ModifyModal handleSubmit={updateMedia} buttonText="update" />
      )}

      {type == 'add' && (
        <ModifyModal handleSubmit={updateMedia} buttonText="add media" />
      )}

      {type == 'delete' && (
        <DeleteModal deleteFunc={handleRemoveMedia} itemsCount={items.length} />
      )}
    </section>
  );
}
