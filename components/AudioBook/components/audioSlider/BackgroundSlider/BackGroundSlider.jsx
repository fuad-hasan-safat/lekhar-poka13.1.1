import React from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function BackGroundSlider({ sliderData, category }) {
    console.log('BACKGROUND SLIDER', sliderData)

    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <>
            <Slider {...settings} className='hmRecentSlider'>
                {sliderData.map((iteam, index) => {

                    const color = iteam?.color;
                    console.log({ color, iteam })
                    return (
                        <div className='backgroundSlider__single__wrap'>

                            <div key={index} className='backgroundSlider__single__iteam' style={{ backgroundColor: `${color}` }}>
                                <div className='audio__bgslider__image'>
                                    <img src={iteam.image} alt='' />
                                </div>
                                <div className='audio__bgslider__text'>
                                    <h5> {iteam.title} </h5>
                                    <p>লেখকঃ {iteam.writer}</p>
                                    <p>কণ্ঠ {iteam.voice}</p>
                                    <p>slider color {iteam?.color}</p>
                                </div>

                            </div>
                        </div>
                    )

                }


                )}
            </Slider>
        </>

    );
}
