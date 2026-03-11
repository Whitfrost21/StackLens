interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
  if (totalPages <= 1) return null;

  // Ensure valid page number
  const validPage = Math.max(1, Math.min(currentPage, totalPages));

  return (
    <div className="flex justify-between mt-2 w-xs">
      <button
        onClick={() => onPageChange(validPage - 1)}
        disabled={validPage === 1}
        className="px-4 py-2 bg-zinc-800 rounded disabled:opacity-50 cursor-pointer"
      >
        Previous
      </button>

      <span className="text-zinc-400">
        Page {validPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(validPage + 1)}
        disabled={validPage === totalPages}
        className="px-4 py-2 bg-zinc-800 rounded disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
