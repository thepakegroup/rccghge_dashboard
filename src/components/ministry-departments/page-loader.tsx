export const PageLoader = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col justify-center items-center bg-white animate-pulse h-[200px] rounded-lg">
        <div className="w-[150px] h-[100px] bg-stone-300 rounded-lg" />
      </div>
      {/*  */}
      <div className="flex flex-col justify-center items-center bg-white animate-pulse rounded-lg py-4 px-3 gap-2">
        <div className="w-[80%] h-[14px] bg-stone-300 rounded self-start" />
        <div className="w-[90%] h-[18px] bg-stone-300 rounded self-start" />
      </div>
      {/*  */}
      <div className="flex flex-col justify-center items-center bg-white animate-pulse rounded-lg py-4 px-3 gap-2">
        <div className="w-[80%] h-[14px] bg-stone-300 rounded self-start" />
        <div className="w-[90%] h-[18px] bg-stone-300 rounded self-start" />
      </div>
      <div className="flex flex-col justify-center items-center bg-white animate-pulse h-[200px] rounded-lg">
        <div className="w-[150px] h-[100px] bg-stone-300 rounded-lg" />
      </div>
      {/*  */}
    </div>
  );
};
