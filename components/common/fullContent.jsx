import React, { useState } from "react";

const FullPost = ({ content, title, writer, catagory }) => {
    console.log(' detail ----------------->>>>> cat', catagory)

    const [numLines, setNumLines] = useState(10); 
    const [prevLines, setPrevLines] = useState(0);

    const handleLoadMore = () => {
        setPrevLines(numLines);
        setNumLines(prevNumLines => prevNumLines + 10);
        console.log(`prevline : ${prevLines} and next line : ${numLines}`)
    };

    const lines = content ? content.split('\n') : [];

    if (catagory === 'কবিতা') {
        return (
            <div className="kobita__content text-black pt-24 space-y-3 text-center">
                <div className="font-semibold text-[35px] text-yellow-400">{title}</div>
                <div className="text-[22px] text-[#595D5B] ">{writer}</div>
                {lines.slice(prevLines, numLines).map((line, index) => (
                    <div key={index} className="text-[16px] text-gray-500 text-justify" dangerouslySetInnerHTML={{ __html: line }} />
                ))}
                {numLines < lines.length && (
                    <button className="text-[14] text-yellow-400" onClick={handleLoadMore}>পরবর্তী </button>
                ) }
            </div>
        );
    } else {
        return (
            <div className=" text-black pr-[100px] pt-24 space-y-3">
                <div className="font-semibold text-[35px] text-[#FCD200]">{title}</div>
                <div className="text-[22px] text-[#595D5B] ">{writer}</div>
                {lines.slice(prevLines, numLines).map((line, index) => (
                    <div key={index} className="text-[16px] text-gray-500 text-justify" dangerouslySetInnerHTML={{ __html: line }} />
                ))}
                {numLines < lines.length && (
                    <button onClick={handleLoadMore}>পরবর্তী</button>
                ) }
            </div>
        );
    }
};

export default FullPost;