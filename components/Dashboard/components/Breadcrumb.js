import React from 'react';

const Breadcrumb = ({title,subtitles1,subtitles2}) => {
    return (
        <div className='breadcrumb__wrap'>
            <h5>{title}</h5>
            <ul>
                <li><a href='#'>{subtitles1}</a><i class="ri-arrow-right-double-line"></i></li>
                <li><a href='#'>{subtitles2}</a></li>
            </ul>
        </div>
    );
};

export default Breadcrumb;