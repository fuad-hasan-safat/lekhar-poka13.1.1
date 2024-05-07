import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const FullPostPagination = ({ logText }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const linesPerPage = 10;

  const logLines = logText?.split('<br>');

  const totalLines = logLines.length;
  const totalPages = Math.ceil(totalLines / linesPerPage);

  const startIndex = currentPage * linesPerPage;
  const endIndex = startIndex + linesPerPage;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div>
        {logLines
          .slice(startIndex, endIndex)
          .map((line, index) => (
            <p key={startIndex + index} dangerouslySetInnerHTML={{__html: line}} ></p>
          ))}
      </div>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
};

export default FullPostPagination;
