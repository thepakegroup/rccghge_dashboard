import { useAppSelector } from "@/store/hooks";


const useGetTypeOfModal = () => {
  const { type } = useAppSelector((state) => state.modal);

  return type
}

export default useGetTypeOfModal