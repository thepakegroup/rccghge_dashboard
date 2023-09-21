import useModalType from '@/hooks/modalType';
import Image from 'next/image';

const Content = () => {
  const handleButton = useModalType();
  return (
    <div className="bg-[#F2F2F2] rounded-lg p-6 text-sm flex flex-col gap-[0.69rem]">
      <div className="font-bold [&>span]:font-normal">
        Donate: <span>Giving via checks</span>
      </div>
      <p>
        Please make checks payable to Heaven’s Glorious Embassy. By contributing
        via check, you authorize the church to use information from your check
        to process your payment electronically. These checks may be dropped off
        in the offering boxes at the exits of the Worship Center or in person at
        the church offices. They may also be mailed to our Finance department at
        the address below: HEAVEN’S GLORIOUS EMBASSY Finance Department 3800 E.
        Parker Road, Plano, Texas 75074
      </p>
      <div className="flex-center gap-6">
        <button className="flex-center gap-1 text-sm text-ash-300 font-semibold rounded-md px-3 py-2 bg-[#D0D5DD]">
          <span>See more</span>
          <Image
            src="icons/arrowdown.svg"
            alt=""
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </button>
        <button onClick={() => handleButton('modify')}>
          <Image src="icons/edit.svg" alt="" width={24} height={24} />
        </button>
        <button onClick={() => handleButton('delete')}>
          <Image src="icons/delete.svg" alt="" width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default Content;
