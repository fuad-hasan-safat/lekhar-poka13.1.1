import React, { useState } from "react";

const FullPostReaderMod = ({ content, title, writer, catagory, url }) => {


    if (catagory === 'কবিতা') {
        return (
            <>
                <div className="all__post__main__content font-serif">
                    <div className="kobita__content  text-black">
                        <div className="font-semibold lg:text-[35px] md:text-[33px] sm:text-[30px] xs:text-[28px] text-yellow-400">{title}</div>
                        <div className="lg:text-[22px] md:text-[22px] sm:text-[20px] xs:text-[18px] text-[#595D5B] mb-[10px]">{writer}</div>
                        <div className={`lg:text-[20px] md:text-[20px] sm:text-[18px] xs:text-[17px] text-justify text-[#595D5B] `} dangerouslySetInnerHTML={{ __html: content }}></div>

                    </div>
                </div>

            </>
        );
    } else {
        return (
            <>
                <div className="kobita__content read__mod__content text-black font-serif">
                    <div className="font-semibold lg:text-[35px] md:text-[33px] sm:text-[30px] xs:text-[28px] text-yellow-400">{title}</div>
                    <div className="lg:text-[22px] md:text-[22px] sm:text-[20px] xs:text-[18px] text-[#595D5B] mb-[10px]">{writer}</div>
                    <div className= {`lg:text-[20px] md:text-[20px] sm:text-[18px] xs:text-[17px] text-justify text-[#595D5B] `} dangerouslySetInnerHTML={{ __html: content }}></div>

                </div>

            </>
        );
    }
};

export default FullPostReaderMod;