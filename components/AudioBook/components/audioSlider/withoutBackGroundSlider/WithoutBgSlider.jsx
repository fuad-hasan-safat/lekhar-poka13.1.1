import React from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function WithoutBgSlider({ sliderData }) {
    console.log('WITHOUT BACKGROUND SLIDER', sliderData)

    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    return (
        <>
        <p>Without back ground Slider called</p>
            <Slider {...settings} className='hmRecentSlider'>
                {sliderData.map((item, index) =>
                    <div key={index} className='hm__audio__recent__slide__item'>
                        <div className='hm__audio__recent__slide__item__innr'>
                            <div className='hm__audio__recent__slide__item__img'>
                                <img src={item.image} alt='Slider Img' />
                            </div>
                            <div className='hm__audio__recent__slide__dsc'>
                                <h5>{item.title}</h5>
                                <p>{item.writer}</p>
                                <ul className='clearfix reset-list'>
                                    <li>{item.voice}</li>
                                    <li>{item.duration}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </Slider>
        </>

    );
}
