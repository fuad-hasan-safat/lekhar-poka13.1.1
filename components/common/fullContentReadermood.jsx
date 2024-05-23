import React, { useState } from "react";
import FullPostPagination from "../fullPost/FullPostpagination";
import FullPostPaginationOthers from "../fullPost/FullPostpaginationOther";

const FullPostReaderMode = ({ content, title, writer, writer_id, catagory, url }) => {

    console.log({ catagory })


    if (catagory === 'কবিতা') {
        return (
            <>
                <div className="read__mod__content font-serif">
                    <div className="  text-black">
                        <div className="font-semibold lg:text-[35px] md:text-[33px] sm:text-[30px] xs:text-[28px] text-yellow-400">{title}</div>
                        <a
                            className="lg:text-[22px] md:text-[22px] sm:text-[20px] xs:text-[18px] text-[#595D5B] mb-[10px]"
                            href={`/postswriter/${writer_id}`}
                        >{writer}</a>
                        {/* <div className={`lg:text-[20px] md:text-[20px] sm:text-[18px] xs:text-[17px] text-justify text-[#595D5B] `} dangerouslySetInnerHTML={{ __html: content }}></div> */}
                        <FullPostPagination logText={content} />

                    </div>
                </div>

            </>
        );
    } else {
        return (
            <>
                <div className="kobita__content read__mod__content text-black font-serif">
                    <div className="font-semibold lg:text-[35px] md:text-[33px] sm:text-[30px] xs:text-[28px] text-yellow-400">{title}</div>
                    <a
                        className="lg:text-[22px] md:text-[22px] sm:text-[20px] xs:text-[18px] text-[#595D5B] mb-[10px]"
                        href={`/postswriter/${writer_id}`}
                    >{writer}</a>
                    {/* <div className= {`lg:text-[20px] md:text-[20px] sm:text-[18px] xs:text-[17px] text-justify text-[#595D5B] `} dangerouslySetInnerHTML={{ __html: content }}></div> */}
                    <FullPostPaginationOthers logText={content} />

                </div>

            </>
        );
    }
};

export default FullPostReaderMode;