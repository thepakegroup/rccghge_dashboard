import Image from 'next/image';
import ModalWrapper from './ModalWrapper';
import useCloseModal from '@/hooks/closeModal';

const DeleteModal = () => {
  const handleCloseModal = useCloseModal();

  const handleDelete = () => {
    handleCloseModal();
  };

  return (
    <ModalWrapper>
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal flex-center flex-col justify-center"
      >
        <Image src="icons/delete.svg" alt="" width={24} height={24} />
        <div className="text-base font-medium text-center mt-3 mb-6">
          Are you sure you want to delete 2 items?
        </div>
        <div className="flex-center gap-3 text-sm [&>button]:px-8 [&>button]:py-2 [&>button]:rounded-md">
          <button
            onClick={handleCloseModal}
            className="border-2 border-[#D0D5DD]"
          >
            No
          </button>
          <button onClick={handleDelete} className="bg-[#CB1A14] text-white">
            Delete
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteModal;
