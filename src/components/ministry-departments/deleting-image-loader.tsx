import { MotionDiv, MotionPresence } from "@/util/motion-exports";
import { BtnLoader } from "../base-components/btn-loader";

export const DeletingImageLoader = ({ deleting }: { deleting: boolean }) => {
  return (
    <MotionPresence>
      {deleting && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[887] flex justify-center items-center h-screen overflow-hidden bg-black/40 backdrop-blur-sm"
        >
          <BtnLoader />
        </MotionDiv>
      )}
    </MotionPresence>
  );
};
