import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useFetchData } from "@/hooks/fetchData";
import { setModalToggle } from "@/store/slice/Modal";

interface testimoneyModalI {
  buttonText: string;
  handleSubmit: any;
  editItemId: number | null;
  onResetEditId: () => void;
}

const UpdateTestimonyModal = ({
  buttonText,
  handleSubmit,
  editItemId,
  onResetEditId,
}: testimoneyModalI) => {
  // const handleCloseModal = useCloseModal();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const isModalOpen = useAppSelector((state) => state.modal.isModalOpen);

  const handleCloseModal = () => {
    dispatch(setModalToggle({ isModalOpen: !isModalOpen }));
    onResetEditId();
  };

  const { data } = useFetchData({
    url: `/api/getTestimonyById/${editItemId}`,
  });

  const testimony = data?.message;

  const handleSubmitTestimony = () => {
    handleSubmit({ title, content });
    handleCloseModal();
  };

  useEffect(() => {
    if (testimony) {
      setTitle(testimony?.title);
      setContent(testimony?.content);
    }
  }, [testimony]);

  return (
    <>
      {isModalOpen && (
        <div onClick={handleCloseModal} className="modal-wrapper">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-red w-full max-w-[632px]"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="modal p-6 w-full"
            >
              <div className="flex items-start justify-between text-xs text-[#686868]">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-2 md:flex-row">
                    <p className="font-bold">Posted on:</p>
                    <div className="">
                      <span>Aug 22, 2023</span>
                      <span>2:48am</span>
                    </div>
                  </div>
                  <span>smart.okolichiaza@gmail.com</span>
                </div>
                <div
                  onClick={handleCloseModal}
                  className="flex-center justify-end font-semibold text-base text-orange cursor-pointer"
                >
                  <span>Close</span>
                  <Image
                    src="icons/close.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-6">
                <label htmlFor="type" className="input-field">
                  <span>Title</span>
                  <textarea
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    rows={2}
                    className="input"
                  />
                </label>
                <label htmlFor="type" className="input-field">
                  <span>Body</span>
                  <textarea
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                    rows={5}
                    className="input"
                  />
                </label>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleSubmitTestimony}
                  className="px-6 py-4 bg-secondary-02 w-full text-white rounded-md"
                >
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateTestimonyModal;
