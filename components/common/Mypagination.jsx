import React, { useState, useEffect } from "react";
import { Pagination } from "react-paginate";

const MyPagination = ({ postsPerPage, totalPosts, handlePageChange }) => {

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); 
  }, [totalPosts]);

  const handlePaginationClick = (data) => {
    setCurrentPage(data.selected + 1); // Selected index starts from 0
    handlePageChange(data.selected + 1); // Pass the actual page number
  };

  const pageCount = Math.ceil(totalPosts / postsPerPage);

  return (

    <Pagination
      pageCount={pageCount}
      initialPage={currentPage - 1} 
      onPageChange={handlePaginationClick}
      className="pagination justify-center mt-4" 
      forcePage={currentPage - 1} 
      renderOnZeroPageCount={null} 
    />
    
  );
};

export default MyPagination;