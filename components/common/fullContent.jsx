import React, { useState } from "react";
import FullPostPagination from "../fullPost/FullPostpagination";
import LogViewer from "../fullPost/FullPostpag";
import ShareOnFacebook from "../share/share";

const FullPost = ({ content, title, writer, catagory, url }) => {


    // if (catagory === 'কবিতা') {
        return (
            <>
            <div className="kobita__content text-black">
                <div className="font-semibold text-[35px] text-yellow-400">{title}</div>
                <div className="text-[22px] text-[#595D5B] ">{writer}</div>
                {/* <div className="text-[22px] text-[#595D5B] " dangerouslySetInnerHTML={{__html:content}}></div> */}
                <FullPostPagination customclass='text-[16px] text-gray-500' logText={content} />
            </div>
            {/* <ShareOnFacebook url={url} title={title} description={writer} image={' '} /> */}

             </>
        );
    // } else {
    //     return (
    //         <div className=" text-black lg:pr-[100px]">
    //             <div className="font-semibold text-[35px] text-[#FCD200]">{title}</div>
    //             <div className="text-[22px] text-[#595D5B] ">{writer}</div>
    //              <FullPostPagination customclass='text-[16px] text-gray-500' logText={content} />
    //         </div>
    //     );
    // } 
};

export default FullPost;