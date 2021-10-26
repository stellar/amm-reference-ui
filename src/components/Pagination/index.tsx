import { useState } from "react";
import { Icon, IconButton } from "@stellar/design-system";
import "./styles.scss";

enum NavigationDirection {
  prev = "previous",
  next = "next",
}

interface PaginationProps {
  pageSize: number;
  itemCount: number;
  onPageChangeDone: (currentPage: number) => void;
}

export const Pagination = ({
  pageSize,
  itemCount,
  onPageChangeDone,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!pageSize || !itemCount) {
    return null;
  }

  const pageCount = Math.ceil(itemCount / pageSize);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageCount;

  const handlePageNavigation = (direction: NavigationDirection) => {
    const newPage =
      direction === NavigationDirection.prev
        ? currentPage - 1
        : currentPage + 1;
    setCurrentPage(newPage);
    onPageChangeDone(newPage);
  };

  const customProps = {
    customSize: "1rem",
    customColor: "var(--pal-text-link)",
  };

  if (pageCount === 1) {
    return null;
  }

  return (
    <div className="Pagination">
      <IconButton
        icon={<Icon.ChevronLeft />}
        altText="Previous page"
        disabled={isFirstPage}
        onClick={() => handlePageNavigation(NavigationDirection.prev)}
        {...customProps}
      />
      {`${currentPage} of ${pageCount}`}
      <IconButton
        icon={<Icon.ChevronRight />}
        altText="Next page"
        disabled={isLastPage}
        onClick={() => handlePageNavigation(NavigationDirection.next)}
        {...customProps}
      />
    </div>
  );
};
