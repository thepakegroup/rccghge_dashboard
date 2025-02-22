import { DeleteModalV2 } from "@/components/base-components/DeleteModalV2";
import { remove } from "@/helper/apiFetch";
import useUpdateToast from "@/hooks/updateToast";
import { Trash } from "@/icons";
import { QueryObserverResult } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";

export const MinistryIntakeTableAction = ({
  item,
  getRequests,
}: {
  item: any;
  getRequests: () => Promise<QueryObserverResult<Error, any>>;
}) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  //
  const updateToast = useUpdateToast();
  const deleteRequest = async () => {
    try {
      setDeleting(true);
      const res = await remove(`/group-membership-requests/${item?.id}`);
      if (res.status === 200 || res.status === 201 || res.statusText === "OK") {
        updateToast({
          title: `SuccessFul!`,
          type: "update",
          info: `${res.data?.message}`,
        });
        setShowDelete(false);
        await getRequests();
      }
    } catch (error: any) {
      updateToast({
        title: `Error!`,
        type: "error",
        info: `${error.response.data?.message}`,
      });
    } finally {
      setDeleting(false);
    }
  };
  //
  return (
    <Fragment>
      <Trash onClick={() => setShowDelete(true)} />
      {showDelete && (
        <DeleteModalV2
          title={`Are you sure you want to delete ${item?.name}'s Request?`}
          setShowModal={setShowDelete}
          deleteFunc={deleteRequest}
          deleting={deleting}
        />
      )}
    </Fragment>
  );
};
