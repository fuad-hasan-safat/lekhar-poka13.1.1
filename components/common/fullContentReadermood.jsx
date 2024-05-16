import React, { useState } from "react";

const FullPostReaderMod = ({ content, title, writer, catagory, url }) => {


    if (catagory === 'কবিতা') {
        return (
            <>
                <div className="all__post__main__content ">
                    <div className="kobita__content  text-black">
                        <div className="font-semibold text-[35px] text-yellow-400">{title}</div>
                        <div className="text-[22px] text-[#595D5B] mb-[10px]">{writer}</div>
                        <div className="text-[22px] text-[#595D5B] font-serif" dangerouslySetInnerHTML={{ __html: content }}></div>

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
                    <div className="text-[22px] text-[#595D5B] font-serif" dangerouslySetInnerHTML={{ __html: content }}></div>

                </div>

            </>
        );
    }
};

export default FullPostReaderMod;