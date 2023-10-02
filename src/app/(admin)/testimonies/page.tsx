'use client';

import AddItemButton from '@/components/AddItemButton';
import DeleteModal from '@/components/DeleteModal';
import Loader from '@/components/Loader';
import Card from '@/components/Testimonies/Card';
import TestimonyModal from '@/components/Testimonies/TestimonyModal';
import { useFetchData } from '@/hooks/fetchData';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import useUpdateToast from '@/hooks/updateToast';
import { useAppSelector } from '@/store/hooks';
import { testimonyI } from '@/util/interface/testimony';
import Image from 'next/image';
import { useRef } from 'react';

const Testimonials = () => {
  const type = useGetTypeOfModal();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { id } = useAppSelector((state) => state.testimony);

  const { data, loading, fetchData } = useFetchData('/api/getTestimony');

  const testimonies: testimonyI[] = data?.message.data;

  const updateToast = useUpdateToast();

  const deleteTestimony = async () => {
    const res = await fetch(`/api/deleteTestimony/${id}`, {
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

  const updateTestimony = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    const updateData = {
      title,
      content,
      id,
    };

    const res = await fetch(`/api/updateTestimony`, {
      method: 'POST',
      body: JSON.stringify(updateData),
    });

    const data = await res.json();

    if (data.error === false) {
      fetchData();
      updateToast({
        title: `Testimony updated!`,
        info: title,
      });
    }
  };

  return (
    <section>
      <div className="flex justify-end mt-2">
        <AddItemButton sectionRef={sectionRef} />
      </div>
      <section className="mt-4">
        <div className="text-ash-100 flex flex-col gap-3 md:flex-row">
          <label
            htmlFor="search"
            className="relative px-3 py-2 bg-white border border-[#D0D5DD] rounded-md"
          >
            <Image
              src="icons/search.svg"
              alt=""
              width={18}
              height={18}
              className="absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer"
            />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search testimonies"
              className="pl-5 rounded-md border-none outline-none"
            />
          </label>
          <label htmlFor="selection" className="">
            <select
              name="selection"
              id="selection"
              placeholder="sorted by"
              className="px-3 py-3 bg-white border border-[#D0D5DD] rounded-md"
            >
              <option value="sorted by">Sorted by</option>
              <option value="most recent">Most recent</option>
              <option value="older">Older</option>
            </select>
          </label>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <section className="mt-4 card-one-grid">
            {testimonies.map((testimony: any) => {
              const { title, published, content, created_at } = testimony;
              return (
                <Card
                  key={testimony.id}
                  title={title}
                  published={published}
                  content={content}
                  createdAt={created_at}
                  id={testimony.id}
                />
              );
            })}
          </section>
        )}
      </section>
      {type === 'modify' && (
        <TestimonyModal handleSubmit={updateTestimony} buttonText="Update" />
      )}
      {type === 'add' && (
        <TestimonyModal handleSubmit={updateTestimony} buttonText="Add media" />
      )}
      {type == 'delete' && <DeleteModal deleteFunc={deleteTestimony} />}
    </section>
  );
};

export default Testimonials;
