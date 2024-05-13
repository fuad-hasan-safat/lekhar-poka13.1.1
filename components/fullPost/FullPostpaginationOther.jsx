'use client'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import parse from 'html-react-parser';
import { apiBasePath } from '../../utils/constant';
import axios from 'axios';

const FullPostPaginationOthers = ({ logText, customclass }) => {
  const router = useRouter()
  console.log(router.query)
  const slug = router.query.slug
  const [currentPage, setCurrentPage] = useState(0);
  const linesPerPage = 60;


  const logLines = logText?.split('\n');

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
    saveCurrentPage();


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
    const userUUID = localStorage.getItem("uuid")

    // console.log({ userUUID, slug })
    let body_data = {
      userId: userUUID,
      postId: slug,
      currentPage: currentPage,
    }

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
            <div key={startIndex + index} className={'text-[18px] text-justify'} dangerouslySetInnerHTML={{ __html: line }} ></div>
            // parse(line, { replace: (domNode) => { // Add the replace option
            //   if (domNode.attribs && domNode.attribs.style) {
            //     delete domNode.attribs.style;
            //   }
            //   return domNode;
            // } })
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

export default FullPostPaginationOthers;
