import { ReactElement } from "react";
import { setModalToggle } from "../store/slice/Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import useCloseModal from "@/hooks/closeModal";

const ModalWrapper = ({ children }: { children: ReactElement }) => {
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpen);

  const handleCloseModal = useCloseModal();

  return (
    <>
      {isModalOpen && (
        <div onClick={handleCloseModal} className="modal-wrapper">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-red w-full max-w-[467px]"
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWrapper;
