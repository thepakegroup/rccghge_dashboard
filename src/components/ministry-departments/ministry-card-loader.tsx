export const MinistryCardLoader = ({ className }: { className?: string }) => {
  return (
    <div
      className={`h-[300px] bg-white rounded-lg overflow-hidden ${className}`}
    >
      <div className="w-full h-[180px] bg-stone-300 animate-pulse"></div>
      <div className="flex flex-col gap-4 mt-3 px-2">
        <div className="h-[10px] w-[60%] rounded-full bg-stone-300 animate-[pulse_1.5s_ease-in-out_infinite] duration-500" />
        <div className="h-[10px] w-[80%] rounded-full bg-stone-300 animate-pulse" />
        <div className="h-[10px] w-[80%] rounded-full bg-stone-300 animate-[pulse_1.5s_ease-in-out_infinite]" />
        <div className="h-[10px] w-[20%] rounded-full bg-stone-300 animate-pulse" />
      </div>
    </div>
  );
};
