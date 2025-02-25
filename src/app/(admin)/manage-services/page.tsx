"use client";

import AddItemButton from "@/components/AddItemButton";
import DeleteModal from "@/components/DeleteModal";
import Loader from "@/components/Loader";
import ModifyModal from "@/components/ManageEvents/ModifyModal";
import { useFetchData } from "@/hooks/fetchData";
import useGetTypeOfModal from "@/hooks/getTypeOfModal";
import useUpdateToast from "@/hooks/updateToast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearItems, setFileName } from "@/store/slice/mediaItems";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import UpdateModal from "@/components/ManageEvents/UpdateModal";
import { post, remove } from "@/helper/apiFetch";
import PaginationButtons from "@/components/PaginationButtons";
import { serviceTime } from "@/util/interface/serviceTime";
import ServiceInfo from "@/components/PageWriteUp/ServiceInfo";
import { convertTo12HourFormat } from "@/helper/convertTo12HrTime";
import { setService } from "@/store/slice/service";
import ModifyServiceModal from "@/components/ManageServices/ModifyServiceModal";

const ManageServices = () => {
  const type = useGetTypeOfModal();
  const dispatch = useAppDispatch();
  const updateToast = useUpdateToast();
  const [currEditItemID, setCurrEditItemID] = useState<number | null>(null);
  const [currEditItem, setCurrEditItem] = useState<serviceTime | null>(null);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { id } = useAppSelector((state) => state.mediaItems);

  const { data, loading, fetchData } = useFetchData({
    url: `service-times`,
    method: "client",
  });

  const services: serviceTime[] = data?.message;

  // Set Edit Data
  useEffect(() => {
    if (currEditItemID) {
      const EditItem = services?.filter(
        (item: any) => item.id === currEditItemID
      )[0];

      setCurrEditItem(EditItem);
    }
  }, [currEditItemID, services]);

  // Token & Header
  const token = Cookies.get("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Delete Service
  const deleteService = async () => {
    setLoader(true);
    try {
      const res = await remove(`service-time/${id}`);

      fetchData();
      updateToast({
        type: "delete",
      });

      setLoader(false);
    } catch (error) {
      setLoader(false);

      updateToast({
        type: "error",
        title: "Error!",
        info: `${(error as AxiosError)?.message}`,
      });
    }
  };

  // // Pagination
  // const totalPages = metadata?.last_page;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <section className="relative min-h-[88vh]">
      <div className="md:hidden flex justify-end mt-3">
        <AddItemButton title="Add new service" />
      </div>

      <section className="my-[26px]">
        {loading || loader ? (
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 min-[1180px]:grid-cols-4 gap-y-5 gap-x-[31.09px]">
            {Array.from({ length: 6 }, (_, index) => (
              <div
                key={index}
                className="h-[240px] bg-gray-300 shadow-sm animate-pulse rounded-md"
              />
            ))}
          </div>
        ) : (
          <div className="card-wrapper gap-y-[30px] gap-x-[30px]">
            {services?.map((service) => {
              return (
                <ServiceInfo
                  key={service?.id}
                  id={service?.id}
                  image={service?.image_url as string}
                  name={service?.service_name}
                  serviceTime={service?.service_period}
                  description={service?.service_description}
                />
              );
            })}
          </div>
        )}
      </section>

      {services && !services.length ? (
        <p className="w-full text-center py-10">No services Found!</p>
      ) : null}

      {/* Pagination */}
      {/* {services?.length > 0 && (
        <div className="absolute bottom-0 right-[45%]">
          <PaginationButtons
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )} */}

      {/* {currEditItemID && (
        <UpdateModal
          editItemId={currEditItemID}
          onResetEditId={() => {
            setCurrEditItemID(null);
            setCurrEditItem(null);
          }}
          handleSubmitEvent={updateMedia}
          // handleImageChange={handleImageChange}
          buttonText="Update"
          editItemData={currEditItem}
        />
      )} */}

      {type == "delete" && <DeleteModal deleteFunc={deleteService} />}

      {type == "add" && <ModifyServiceModal fetchData={fetchData} />}

      {type == "modify" && <ModifyServiceModal fetchData={fetchData} />}

      <div className="hidden md:flex">
        <AddItemButton
          onclick={() => dispatch(setService({ btnType: "add" }))}
          title="Add new service"
        />
      </div>
    </section>
  );
};

export default ManageServices;
