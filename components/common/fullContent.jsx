import React, { useState } from "react";
import FullPostPagination from "../fullPost/FullPostpagination";
import LogViewer from "../fullPost/FullPostpag";
import ShareOnFacebook from "../share/share";
import FullPostPaginationOthers from "../fullPost/FullPostpaginationOther";
import UserPostTitleAndcover from "./userPostTitleAndcover";

const FullPost = ({ id, content, title, writer, writer_id, catagory, url }) => {


    if (catagory === 'কবিতা') {
        return (
            <>
                <div className="kobita__content text-black">
                    <UserPostTitleAndcover
                        id={id}
                        title={title}
                        writer={writer}
                        writer_id={writer_id}
                    />
                    {/* <div className="font-semibold  w-full lg:text-[35px] md:text-[32px] sm:text-[29px] xs:text-[26px] pr-[115px] text-yellow-400">{title}</div>
                <div className="text-[22px] text-[#595D5B] mb-[10px]">{writer}</div> */}
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
                    <UserPostTitleAndcover
                        id={id}
                        title={title}
                        writer={writer}
                        writer_id={writer_id}
                    />
                    {/* <div className="font-semibold  w-full lg:text-[35px] md:text-[32px] sm:text-[29px] xs:text-[26px] pr-[115px] text-yellow-400">{title}</div>
                    <div className="text-[22px] text-[#595D5B] mb-[10px]">{writer}</div> */}
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