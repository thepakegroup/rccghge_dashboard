import Image from "next/image";
import ModalWrapper from "./ModalWrapper";
import useCloseModal from "@/hooks/closeModal";
import { useAppDispatch } from "@/store/hooks";
import { clearItems } from "@/store/slice/mediaItems";

interface deleteI {
  deleteFunc?: any;
  itemsCount?: number;
}

const DeleteModal = ({ deleteFunc, itemsCount }: deleteI) => {
  const handleCloseModal = useCloseModal();

  const handleDelete = () => {
    deleteFunc();
    dispatch(clearItems());
    handleCloseModal();
  };

  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(clearItems());
    handleCloseModal();
  };

  return (
    <ModalWrapper>
      <div
        onClick={(e) => e.stopPropagation()}
        className="delete-modal flex-center flex-col justify-center"
      >
        <Image src="icons/delete.svg" alt="" width={24} height={24} />
        <div className="text-base font-medium text-center mt-3 mb-6">
          Are you sure you want to delete {itemsCount === 0 ? 1 : itemsCount}{" "}
          item{itemsCount && itemsCount > 1 && "s"}?
        </div>
        <div className="flex-center gap-3 text-sm [&>button]:px-8 [&>button]:py-2 [&>button]:rounded-md">
          <button onClick={closeModal} className="border-2 border-[#D0D5DD]">
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
