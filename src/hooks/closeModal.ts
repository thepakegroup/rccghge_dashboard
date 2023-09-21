import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setModalToggle } from "@/store/slice/Modal";


const useCloseModal = () => {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modal.isModalOpen);

  const handleCloseModal = () => {
    dispatch(setModalToggle({ isModalOpen: !isModalOpen }));
  };

  return handleCloseModal
}

export default useCloseModal