import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";

const PaginationButtons = ({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1,
      },
    },
  };

  // console.log(typeof totalPages);

  const handlePageClick = ({ selected }: { selected: number }) => {
    // console.log(selected + 1);
    setCurrentPage(selected + 1);
  };

  const showNextButton = currentPage !== totalPages;
  const showPrevButton = currentPage !== 1;

  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        nextLabel={
          showNextButton && (
            <span className="w-10 h-10 flex items-center justify-center bg-[#d3d3d3] rounded-md">
              <BsChevronRight />
            </span>
          )
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel={
          showPrevButton && (
            <span className="w-10 h-10 flex items-center justify-center bg-[#d3d3d3] rounded-md mr-4">
              <BsChevronLeft />
            </span>
          )
        }
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block border border-solid border-[#d3d3d3] hover:bg-[#d3d3d3] w-10 h-10 flex items-center justify-center rounded-md mr-4"
        activeClassName="bg-secondary text-white"
      />
    </motion.div>
  );
};

export default PaginationButtons;
