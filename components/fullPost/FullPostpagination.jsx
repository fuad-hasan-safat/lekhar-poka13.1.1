'use client'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import parse from 'html-react-parser';
import { apiBasePath } from '../../utils/constant';
import axios from 'axios';

const FullPostPagination = ({ logText, customclass }) => {
  const router = useRouter()
  console.log(router.query)
  const slug = router.query.slug
  const [currentPage, setCurrentPage] = useState(0);
  const linesPerPage = 30;


  const logLines = logText?.split('</p>');

  const totalLines = logLines?.length;
  const totalPages = Math.ceil(totalLines / linesPerPage);

  const startIndex = currentPage * linesPerPage;
  const endIndex = startIndex + linesPerPage;
  const [userUuid, setUserUuid] = useState("");

  // const [savedPage, setSavedPage] = useState(())




  useEffect(() => {
    setUserUuid(localStorage.getItem("uuid") || "");

    console.log('User UUID in useeffect ------------>>>>+++++++++++++++++++++>>>', userUuid)

    getSavedpage();


  }, [router.query])

  useEffect(() => {
    if (currentPage !== 0) {
      saveCurrentPage();

    }


  }, [currentPage, router.query])


  const getSavedpage = async () => {
    // console.log("get saved page")
    const userUUID = localStorage.getItem("uuid")
    console.log({ userUUID, slug, userUuid })

    try {
      const response = await axios.post(
        `${apiBasePath}/getpostpage`,
        {
          userId: userUUID,
          postId: slug,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log('get saved opage ----->>>>>>>+++++', response)

      if (response.data.status === 'success') {
        setCurrentPage(response.data.saved_page)
        console.log('get =======>>>saved page =====>>>>>', response.data.saved_page)
      } else {
        setCurrentPage(0)

      }
    } catch (error) {
      setCurrentPage(0)

    }

  }


  const saveCurrentPage = async (selected) => {
    console.log('calling api to save page number----------------------------')
    const userUUID = localStorage.getItem("uuid")


    // console.log(body_data)


    try {
      const response = await axios.post(
        `${apiBasePath}/recordpostpage`,
        {
          userId: userUUID,
          postId: slug,
          currentPage: currentPage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response)

      if (response.status === 'success') {
        console.log("page save ----", response.msg)
      }

      if (response.status === 'failed') {
        console.log("page save ----", response.msg)
      }

    } catch (error) {

    }
  }

  const handlePageChange = ({ selected }) => {
    saveCurrentPage(selected);
    // console.log('Handle page ------ selected ----', selected)

    setCurrentPage(selected);

  };





  return (
    router.isReady &&
    <div>
      <div>
        {logLines
          ?.slice(startIndex, endIndex)
          .map((line, index) => (
            <div key={startIndex + index} className={'lg:text-[18px] md:text-[17px] sm:text-[16px] xs:text-[14px]'} dangerouslySetInnerHTML={{ __html: line }} ></div>

          ))}
      </div>

      {totalPages > 1 && <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        forcePage={currentPage}
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
      }

    </div>
  );
};

export default FullPostPagination;
