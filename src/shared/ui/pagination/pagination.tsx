import React from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  pageCount?: number;
  onPageChangeHandler: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageCount,
  onPageChangeHandler,
}) => {
  if (!pageCount || pageCount <= 1) return null;

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChangeHandler(page);
    }
  };

  const handleArrowClick = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      onPageChangeHandler(currentPage - 1);
    } else if (direction === "next" && currentPage < pageCount) {
      onPageChangeHandler(currentPage + 1);
    }
  };

  const getPageRange = (): number[] => {
    const range: number[] = [];
    const maxVisiblePages = 5;

    let start = Math.max(1, currentPage - 2);
    const end = Math.min(pageCount, start + maxVisiblePages - 1);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const pageRange = getPageRange();
  const hasPageRange = pageRange.length > 0;
  const firstPageInRange = hasPageRange ? pageRange[0] : null;
  const lastPageInRange = hasPageRange ? pageRange[pageRange.length - 1] : null;

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.pageItem} ${
          currentPage === 1 ? styles.disabled : ""
        }`}
        onClick={() => handleArrowClick("prev")}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>

      {firstPageInRange !== undefined &&
        firstPageInRange !== null &&
        firstPageInRange > 1 && (
          <>
            <button
              className={`${styles.pageItem} ${
                1 === currentPage ? styles.active : ""
              }`}
              onClick={() => handlePageClick(1)}
            >
              1
            </button>
            {firstPageInRange > 2 && (
              <span className={styles.ellipsis}>...</span>
            )}
          </>
        )}

      {hasPageRange &&
        pageRange.map((page) => (
          <button
            key={page}
            className={`${styles.pageItem} ${
              page === currentPage ? styles.active : ""
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}

      {firstPageInRange !== undefined &&
        lastPageInRange !== null &&
        lastPageInRange !== null &&
        lastPageInRange !== undefined &&
        lastPageInRange < pageCount && (
          <>
            {lastPageInRange < pageCount - 1 && (
              <span className={styles.ellipsis}>...</span>
            )}
            <button
              className={`${styles.pageItem} ${
                pageCount === currentPage ? styles.active : ""
              }`}
              onClick={() => handlePageClick(pageCount)}
            >
              {pageCount}
            </button>
          </>
        )}

      <button
        className={`${styles.pageItem} ${
          currentPage === pageCount ? styles.disabled : ""
        }`}
        onClick={() => handleArrowClick("next")}
        disabled={currentPage === pageCount}
      >
        &raquo;
      </button>
    </div>
  );
};
