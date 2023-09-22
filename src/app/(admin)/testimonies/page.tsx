'use client';

import AddItemButton from '@/components/AddItemButton';
import DeleteModal from '@/components/DeleteModal';
import Card from '@/components/Testimonies/Card';
import TestimonyModal from '@/components/Testimonies/TestimonyModal';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';
import Image from 'next/image';

const Testimonials = () => {
  const type = useGetTypeOfModal();

  return (
    <section>
      <div className="flex justify-end">
        <AddItemButton />
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
        <section className="mt-4 card-one-grid">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </section>
      </section>
      {type === 'modify' && <TestimonyModal />}
      {type == 'delete' && <DeleteModal />}
    </section>
  );
};

export default Testimonials;
