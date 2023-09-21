import Image from 'next/image';
import useModalType from '@/hooks/modalType';

const Card = () => {
  const handleButton = useModalType();

  return (
    <div className="flex flex-col gap-4 rounded-md p-2 bg-white">
      <div>
        <div className="flex-center justify-between">
          <span>Instagram</span>
          <input type="checkbox" name="" id="" />
        </div>
      </div>
      <Image src="/images/spotify.png" alt="" height={93} width={92} />
      <div className="flex justify-end">
        <div className="flex-center gap-[0.91rem]">
          <button onClick={() => handleButton('modify')}>
            <Image src="icons/edit.svg" alt="" width={18} height={18} />
          </button>
          <button>
            <Image src="icons/link.svg" alt="" width={18} height={18} />
          </button>
          <button onClick={() => handleButton('delete')}>
            <Image src="icons/delete.svg" alt="" width={18} height={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
