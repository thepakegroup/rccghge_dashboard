import useModalType from '@/hooks/modalType';
import { useAppDispatch } from '@/store/hooks';
import { setDeleteFunc } from '@/store/slice/content';
import { setEditMediaId } from '@/store/slice/mediaItems';
import { setMission } from '@/store/slice/mission';
import Image from 'next/image';

interface infoI {
  title: string;
  description: string;
  id: number;
}

const OurMissionInfo = ({ title, description, id }: infoI) => {
  const handleButton = useModalType();

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    handleButton('delete');
    dispatch(setEditMediaId(id));
    dispatch(setDeleteFunc('mission'));
  };

  const handleEdit = () => {
    handleButton('modify');
    dispatch(setEditMediaId(id));
    dispatch(
      setMission({
        title,
        description,
        category: 'all',
        id,
        btnType: 'edit',
      })
    );
  };

  return (
    <div className="flex-center justify-between bg-[#F2F2F2] rounded-lg p-4">
      <div className="font-semibold flex-[70%]">
        <h2 className="text-base">{title}</h2>
        <span className="text-sm text-ash-300">{description}</span>
      </div>
      <div className="flex-center justify-end gap-6 flex-[30%]">
        <button onClick={handleEdit}>
          <Image src="icons/edit.svg" alt="" width={24} height={24} />
        </button>
        <button onClick={handleDelete}>
          <Image src="icons/delete.svg" alt="" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default OurMissionInfo;
