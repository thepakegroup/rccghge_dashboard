import { useRouter, useSearchParams } from "next/navigation";

export const Pagination = ({ meta }: { meta: any }) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  //
  const startItem = (meta.current_page - 1) * meta.per_page + 1;
  const endItem = Math.min(startItem + meta.per_page - 1, meta.total);
  //
  const router = useRouter();
  //
  return (
    <div className="flex items-center justify-between w-full py-2">
      <span className="text-sm text-gray-600">
        {startItem} - {endItem} of {meta.total} items
      </span>
      <div className="flex space-x-2">
        <button
          onClick={() => {
            if (meta.current_page > 1) {
              params.set("page", String(meta.current_page - 1));
              router.push(`?${params.toString()}`);
            }
          }}
          disabled={meta.current_page <= 1}
          className={`px-4 py-2 border border-gray-500 rounded-md ${
            meta.current_page > 1
              ? "text-gray-600 hover:bg-gray-100"
              : "text-gray-500 cursor-not-allowed"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => {
            if (meta.current_page < meta.last_page) {
              params.set("page", meta.current_page + 1);
              router.push(`?${params.toString()}`);
            }
          }}
          disabled={meta.current_page >= meta.last_page}
          className={`px-4 py-2 rounded-md ${
            meta.current_page < meta.last_page
              ? "bg-orange text-white hover:bg-orange"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};
