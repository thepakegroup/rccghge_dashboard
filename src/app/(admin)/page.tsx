'use client';

import Card from '@/components/Home/Card';
import ScrollModalToTop from '@/components/Home/ScrollModal';
import Image from 'next/image';
import DeleteModal from '@/components/DeleteModal';
import ModifyModal from '@/components/Home/ModifyModal';
import AddItemButton from '@/components/AddItemButton';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import { useEffect, useRef, useState } from 'react';
import { mediaI } from '@/util/interface/media';
import { useFetchData } from '@/hooks/fetchData';
import Loader from '@/components/Loader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearItems } from '@/store/slice/mediaItems';
import { labels } from '@/util/constants';

export default function Home() {
  const type = useGetTypeOfModal();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { items, file, id } = useAppSelector((state) => state.mediaItems);

  const { data, loading, fetchData } = useFetchData('/api/getAllMedia');
  const dispatch = useAppDispatch();

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
    }
  };

  const updateMedia = async (mediaInfo: any) => {
    const mediaData = {
      ...mediaInfo,
      media: file,
      ...(type == 'modify' && id !== undefined ? { id } : {}),
    };

    const res = await fetch(
      `/api/${type == 'modify' ? 'updateMedia' : 'addMedia'}`,
      {
        method: 'POST',
        body: JSON.stringify(mediaData),
      }
    );

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      dispatch(clearItems());
    }
  };

  const mediaData: mediaI[] = data?.message;

  return (
    <section ref={sectionRef}>
      <div className="flex justify-end mt-2">
        <AddItemButton sectionRef={sectionRef} />
      </div>
      {labels.map((label) => {
        return (
          <section key={label.value} className="mt-6" id={label.label}>
            <div className="flex-center gap-1">
              <Image src="icons/img.svg" alt="" width={18} height={18} />
              <p className="text-base text-fade-ash font-bold">{label.label}</p>
            </div>
            <div className="card-wrapper">
              {mediaData?.map((media) => {
                return (
                  <Card
                    title={media.name}
                    img={media.image_url}
                    id={media.id}
                    link={media.link}
                    key={media.id}
                  />
                );
              })}
            </div>
          </section>
        );
      })}

      <ScrollModalToTop />
      {type == 'modify' && (
        <ModifyModal handleSubmit={updateMedia} buttonText="Update" />
      )}

      {type == 'add' && (
        <ModifyModal handleSubmit={updateMedia} buttonText="Add media" />
      )}

      {type == 'delete' && (
        <DeleteModal deleteFunc={handleRemoveMedia} itemsCount={items.length} />
      )}
    </section>
  );
}
