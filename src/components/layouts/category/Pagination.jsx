import { pagBackIcon, pagNextIcon } from "@/utils/Svgs";

const Pagination = ({ perPage, totalData, paginate, currentPage }) => {
  const pageNumber = [];
  const style = "bg-black bg-opacity-10";

  for (let i = 1; i <= Math.ceil(totalData / perPage); i++) {
    pageNumber.push(i);
  }

  const prevPage = () => {
    if (currentPage !== 1) {
      paginate(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== pageNumber.length) {
      paginate(currentPage + 1);
    }
  };

  // Function to handle page numbers with ellipses
  const getDisplayedPages = () => {
    const totalPages = pageNumber.length;

    // Show full list if there are six or fewer pages
    if (totalPages <= 6) return pageNumber;

    if (currentPage <= 3) {
      return [...pageNumber.slice(0, 3), "...", totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, "...", ...pageNumber.slice(totalPages - 3)];
    } else {
      return [1, "...", currentPage, "...", totalPages];
    }
  };

  return (
    <nav className="mt-8 pt-5 flex flex-row justify-between border-t border-t-black border-opacity-10 w-full select-none">
      <div
        className={`${
          currentPage === 1
            ? "text-[#AFAFAF]"
            : "text-black hover:bg-black hover:bg-opacity-10"
        } border border-black border-opacity-10 flex cursor-pointer items-center justify-center rounded-lg bg-transparent px-3.5 py-2 hover:transition-colors gap-x-2`}
        onClick={prevPage}
      >
        {pagBackIcon}
        <p className="font-medium text-sm">Previous</p>
      </div>
      <ul className="pagination flex flex-row justify-between gap-4">
        {/* Page Numbers */}
        {getDisplayedPages().map((number, index) => (
          <li
            key={index}
            onClick={() => typeof number === "number" && paginate(number)}
            className={`w-10 h-10 flex cursor-pointer items-center justify-center rounded-md  hover:bg-black hover:bg-opacity-10 hover:transition-colors ${
              currentPage === number ? style : "bg-transparent"
            } ${number === "..." ? "pointer-events-none" : ""}`}
          >
            {number === "..." ? <span>{number}</span> : <a>{number}</a>}
          </li>
        ))}

        {/* Next Button */}
      </ul>

      <div
        className={`${
          currentPage === pageNumber.length
            ? "text-[#AFAFAF]"
              : "text-black hover:bg-black hover:bg-opacity-10"
            } border border-black border-opacity-10 flex cursor-pointer items-center justify-center rounded-lg bg-transparent px-3.5 py-2 hover:transition-colors gap-x-2`}
        onClick={nextPage}
      >
        <p className="font-medium text-sm">Next</p>
        {pagNextIcon}
      </div>
    </nav>
  );
};

export default Pagination;
