'use client';

import { formatDate } from '@/helper/dateFormat';
import { useFetchData } from '@/hooks/fetchData';
import useModalType from '@/hooks/modalType';
import { useAppDispatch } from '@/store/hooks';
import { setTestimonyId } from '@/store/slice/testimony';
import Image from 'next/image';

interface cardI {
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  id: number;
}

const Card = ({ title, content, published, createdAt, id }: cardI) => {
  const handleButton = useModalType();
  const dispatch = useAppDispatch();

  const { fetchData } = useFetchData('/api/getTestimony');

  const { formattedDate, formattedTime } = formatDate(createdAt);

  const handleDeleteTestimony = () => {
    dispatch(setTestimonyId(id));
    handleButton('delete');
  };

  const handleEdit = () => {
    dispatch(setTestimonyId(id));
    handleButton('modify');
  };

  const publishTestimony = async () => {
    const res = await fetch(`/api/publish`, {
      method: 'POST',
      body: JSON.stringify({ id, published: !published }),
    });

    const data = await res.json();

    console.log(data);

    if (data.error === false) {
      fetchData();
    }
  };

  return (
    <div className="bg-white border border-[#AEBCD1] rounded-lg p-3">
      <div>
        <span>{formattedDate}</span>
        <span>{formattedTime.split(',')[1]}</span>
      </div>
      <div className="my-[1.38rem]">
        <p className="text-base font-semibold">{title}</p>
        <p className="text-ash-200 text-sm">{content}</p>
      </div>
      <div className="flex-center justify-between">
        <button
          onClick={publishTestimony}
          className={`text-sm font-semibold capitalize px-4 py-2 rounded-md ${
            published
              ? 'border border-blue-100 text-blue-100'
              : 'bg-blue-100 text-white'
          }`}
        >
          {published ? 'Published' : 'publish'}
        </button>
        <div className="flex-center gap-6">
          <button onClick={handleEdit}>
            <Image src="icons/edit.svg" alt="" width={24} height={24} />
          </button>
          <button onClick={handleDeleteTestimony}>
            <Image src="icons/delete.svg" alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
