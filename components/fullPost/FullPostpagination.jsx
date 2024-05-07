import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const FullPostPagination = ({ logText, customclass }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const linesPerPage = 10;

  const logLines = logText?.split('<br>');

  const totalLines = logLines?.length;
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
          ?.slice(startIndex, endIndex)
          .map((line, index) => (
            <div key={startIndex + index} className={customclass} dangerouslySetInnerHTML={{__html: line}} ></div>
          ))}
      </div>
      {/* <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        className='flex space-x-6 flex-wrap'
      /> */}
        <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousLabel={'পূর্ববর্তী'}
        nextLabel={'পরবর্তী'}
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
      />

    </div>
  );
};

export default FullPostPagination;
