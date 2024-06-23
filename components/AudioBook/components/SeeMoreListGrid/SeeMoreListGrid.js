import React from 'react';


export const AudioSeeMoreData=[
    {
        image: '/audioBook/audio-slider/audio-slider-img-1.png',
        title:'তিন গোয়েন্দা',
        kText:'লেখক : রকিব হাসান',
        vText:'কন্ঠ: রকিব হাসান তুষার',
        time:'১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-2.png',
        title:'তিন গোয়েন্দা',
        kText:'লেখক : রকিব হাসান',
        vText:'কন্ঠ: রকিব হাসান তুষার',
        time:'১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-3.png',
        title:'তিন গোয়েন্দা',
        kText:'লেখক : রকিব হাসান',
        vText:'কন্ঠ: রকিব হাসান তুষার',
        time:'১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-4.png',
        title:'তিন গোয়েন্দা',
        kText:'লেখক : রকিব হাসান',
        vText:'কন্ঠ: রকিব হাসান তুষার',
        time:'১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-5.png',
        title:'তিন গোয়েন্দা',
        kText:'লেখক : রকিব হাসান',
        vText:'কন্ঠ: রকিব হাসান তুষার',
        time:'১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-6.png',
        title:'তিন গোয়েন্দা',
        kText:'লেখক : রকিব হাসান',
        vText:'কন্ঠ: রকিব হাসান তুষার',
        time:'১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-1.png',
        title:'তিন গোয়েন্দা',
        kText:'লেখক : রকিব হাসান',
        vText:'কন্ঠ: রকিব হাসান তুষার',
        time:'১:৪১ মিনিট',
    },
]

const SeeMoreListGrid = () => {
    return (
        <>
        {AudioSeeMoreData.map((item,index)=>
            <div key={index} className='hm__audio__recent__slide__item'>
                <div className='hm__audio__recent__slide__item__innr'>
                    <div className='hm__audio__recent__slide__item__img'>
                        <img src={item.image} alt='Slider Img' />
                    </div>
                    <div className='hm__audio__recent__slide__dsc'>
                    <h5>{item.title}</h5> 
                    <p>{item.kText}</p>
                    <ul className='clearfix reset-list'>
                        <li>{item.vText}</li>
                        <li><i class="ri-time-line"></i> {item.time}</li>
                    </ul>
                    </div>
                </div>
            </div> 
            )}
        </>
    );
};

export default SeeMoreListGrid;