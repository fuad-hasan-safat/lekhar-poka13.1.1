import React, { useState } from "react";
import FullPostPagination from "../fullPost/FullPostpagination";
import LogViewer from "../fullPost/FullPostpag";
import ShareOnFacebook from "../share/share";
import FullPostPaginationOthers from "../fullPost/FullPostpaginationOther";

const FullPost = ({ content, title, writer, catagory, url }) => {


    if (catagory === 'কবিতা') {
        return (
            <>
            <div className="kobita__content text-black">
                <div className="font-semibold text-[35px] pr-[70px] text-yellow-400">{title}</div>
                <div className="text-[22px] text-[#595D5B] mb-[10px]">{writer}</div>
                {/* <div className="text-[22px] text-[#595D5B] " dangerouslySetInnerHTML={{__html:content}}></div> */}
                <div>
                <FullPostPagination customclass='text-[16px] text-[#595D5B]' logText={content} />
                </div>
            </div>

             </>
        );
    } else {
        return (
            <>
            <div className="kobita__content text-black">
                <div className="font-semibold text-[35px] text-yellow-400">{title}</div>
                <div className="text-[22px] text-[#595D5B] mb-[10px]">{writer}</div>
                {/* <div className="text-[22px] text-[#595D5B] " dangerouslySetInnerHTML={{__html:content}}></div> */}
                <div>
                <FullPostPaginationOthers customclass='text-[16px] text-gray-500' logText={content} />
                </div>
            </div>

             </>
        );
    } 
};

export default FullPost;