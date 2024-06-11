import React from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


export const AudioRecentSliderData=[
    {
        image: '/audioBook/audio-slider/audio-slider-img-1.png',
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
    {
        image: '/audioBook/audio-slider/audio-slider-img-1.png',
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
    {
        image: '/audioBook/audio-slider/audio-slider-img-1.png',
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
    {
        image: '/audioBook/audio-slider/audio-slider-img-1.png',
        title:'তিন গোয়েন্দা',
        kText:'লেখক : রকিব হাসান',
        vText:'কন্ঠ: রকিব হাসান তুষার',
        time:'১:৪১ মিনিট',
    },
]

const AudioRecentSlider = () => {

    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
      };

    return (
        <Slider {...settings} className='hmRecentSlider'>
        {AudioRecentSliderData.map((item,index)=>
            <div className='hm__audio__recent__slide__item'>
                <div className='hm__audio__recent__slide__item__innr'>
                    <div className='hm__audio__recent__slide__item__img'>
                        <img src={item.image} alt='Slider Img' />
                    </div>
                    <div className='hm__audio__recent__slide__dsc'>
                       <h5>{item.title}</h5> 
                       <p>{item.kText}</p>
                       <ul className='clearfix reset-list'>
                          <li>{item.vText}</li>
                          <li>{item.time}</li>
                       </ul>
                    </div>
                </div>
            </div>
         )}
    </Slider>
    );
};

export default AudioRecentSlider;