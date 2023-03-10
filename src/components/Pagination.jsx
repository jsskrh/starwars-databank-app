import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const style = {
  container: `flex justify-center items-center mt-10`,
  pageNumberContainer: `border border-white w-8 flex justify-center mr-2`,
  heroIcon: `h-5 w-5 cursor-pointer`,
  disabled: `cursor-default opacity-30`,
  bold: `font-bold`,
};

const Pagination = ({ currentPage, setCurrentPage, lastPage }) => {
  return (
    <div className={style.container}>
      <ChevronLeftIcon
        className={`${style.heroIcon} ${
          currentPage === 1 && style.disabled
        } mr-2`}
        onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
      />
      <button
        className={`${style.pageNumberContainer} ${
          currentPage === 1 && style.bold
        }`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </button>
      {Array.from({ length: lastPage - 1 }, (_, i) => i + 2).map((page) => (
        <button
          className={`${style.pageNumberContainer} ${
            currentPage === page && style.bold
          }`}
          onClick={() => setCurrentPage(page)}
          key={page}
        >
          {page}
        </button>
      ))}
      <ChevronRightIcon
        className={`${style.heroIcon} ${currentPage === 9 && style.disabled}`}
        onClick={() => currentPage !== 9 && setCurrentPage(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;
