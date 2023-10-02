'use client';

import AddItemButton from '@/components/AddItemButton';
import DeleteModal from '@/components/DeleteModal';
import Card from '@/components/Home/Card';
import Loader from '@/components/Loader';
import ModifyModal from '@/components/ManageEvents/ModifyModal';
import { useFetchData } from '@/hooks/fetchData';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import useUpdateToast from '@/hooks/updateToast';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearItems } from '@/store/slice/mediaItems';
import { eventI } from '@/util/interface/events';
import { useRef } from 'react';

const ManageEvents = () => {
  const type = useGetTypeOfModal();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { data, loading, fetchData } = useFetchData('/api/getAllEvents');
  const { items, file, id } = useAppSelector((state) => state.mediaItems);
  const dispatch = useAppDispatch();

  const events: eventI[] = data?.message.data;

  const handleRemoveEvents = async () => {
    const res = await fetch('/api/removeEvents', {
      method: 'POST',
      body: JSON.stringify(items),
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        type: 'delete',
      });
      dispatch(clearItems());
    }
  };

  const updateToast = useUpdateToast();

  const updateMedia = async (mediaInfo: any) => {
    const mediaData = {
      ...mediaInfo,
      banner: file,
      ...(type == 'modify' && id !== undefined ? { id } : {}),
    };

    const res = await fetch(
      `/api/${type == 'modify' ? 'updateEvent' : 'addEvent'}`,
      {
        method: 'POST',
        body: JSON.stringify(mediaData),
      }
    );

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        title: `Event ${type === 'modify' ? 'updated!' : 'added!'}`,
        info: mediaInfo.name,
      });
      dispatch(clearItems());
    }
  };

  return (
    <section>
      <div className="flex justify-end mt-2">
        <AddItemButton sectionRef={sectionRef} />
      </div>
      <section className="mt-3">
        {loading ? (
          <Loader />
        ) : (
          <div className="card-wrapper">
            {events.map((event) => {
              return <Card key={event.id} id={event.id} img={event.banner} />;
            })}
          </div>
        )}
      </section>
      {type == 'modify' && (
        <ModifyModal handleSubmit={updateMedia} buttonText="Update" />
      )}

      {type == 'add' && (
        <ModifyModal handleSubmit={updateMedia} buttonText="Add event" />
      )}

      {type == 'delete' && (
        <DeleteModal
          deleteFunc={handleRemoveEvents}
          itemsCount={items.length}
        />
      )}
    </section>
  );
};

export default ManageEvents;
