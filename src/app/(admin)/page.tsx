'use client';

import Card from '@/components/Home/Card';
import ScrollModalToTop from '@/components/Home/ScrollModal';
import Image from 'next/image';
import DeleteModal from '@/components/DeleteModal';
import ModifyModal from '@/components/Home/ModifyModal';
import AddItemButton from '@/components/AddItemButton';
import useGetTypeOfModal from '@/hooks/getTypeOfModal';

export default function Home() {
  const type = useGetTypeOfModal();

  return (
    <section>
      <div className="flex justify-end">
        <AddItemButton />
      </div>
      <section className="mt-3">
        <div className="flex-center gap-1">
          <Image src="icons/img.svg" alt="" width={18} height={18} />
          <p className="text-base text-fade-ash font-bold">
            Social media images
          </p>
        </div>
        <div className="card-wrapper">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section>
      <section className="mt-6">
        <div className="flex-center gap-1">
          <Image src="icons/img.svg" alt="" width={18} height={18} />
          <p className="text-base text-fade-ash font-bold">Media images</p>
        </div>
        <div className="card-wrapper">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section>
      <ScrollModalToTop />
      {type == 'modify' && <ModifyModal buttonText="Update" />}
      {/* delete modal */}
      {type == 'delete' && <DeleteModal />}
    </section>
  );
}
