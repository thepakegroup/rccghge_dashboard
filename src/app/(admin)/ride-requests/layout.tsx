import React, { Fragment, ReactNode, Suspense } from "react";

const RideRequestLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Fragment>
      <Suspense>{children}</Suspense>
    </Fragment>
  );
};

export default RideRequestLayout;
