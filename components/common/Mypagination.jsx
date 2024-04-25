import React, { useState, useEffect } from "react";
import { Pagination } from "react-paginate";

  const MyPagination = ({ postsPerPage, totalPosts, handlePageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // Reset current page on data change
  }, [totalPosts]);

  const handlePaginationClick = (data) => {
    setCurrentPage(data.selected + 1); // Selected index starts from 0
    handlePageChange(data.selected + 1); // Pass the actual page number
  };

  const pageCount = Math.ceil(totalPosts / postsPerPage);

  return (
    <Pagination
      pageCount={pageCount}
      initialPage={currentPage - 1} // Selected index starts from 0
      onPageChange={handlePaginationClick}
      className="pagination justify-center mt-4" // Add your desired styles
      forcePage={currentPage - 1} // Maintain current page on re-render
      renderOnZeroPageCount={null} // Hide pagination if no pages
    />
  );
};

export default MyPagination;