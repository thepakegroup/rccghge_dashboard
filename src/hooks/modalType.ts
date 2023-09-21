import { useAppDispatch } from "@/store/hooks";
import { setModalToggle } from "@/store/slice/Modal";

const useModalType = () => {
  const dispatch = useAppDispatch();

  const handleButton = (type: any) => {
    dispatch(setModalToggle({ isModalOpen: true, type }));
  };

  return handleButton
}

export default useModalType