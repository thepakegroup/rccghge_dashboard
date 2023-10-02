import { useAppDispatch } from "@/store/hooks";
import { setToast } from "@/store/slice/toast";

interface toastI{
  title?: string;
  info?: string;
  type?:'delete' | 'update' | 'add'
}

const useUpdateToast = () => {
  const dispatch = useAppDispatch()

  const updateToast = ({title,info,type}:toastI) => {
  dispatch(
      setToast({
        isToast: true,
        title:title as string,
        info,
        type
      })
  );
  }
  
  return updateToast
}

export default useUpdateToast
