import React from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function BackGroundSlider({ sliderData }) {
    console.log('BACKGROUND SLIDER', sliderData)

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
            <p>Back ground slider called</p>
            <Slider {...settings} className='hmRecentSlider'>
                {sliderData.map((iteam, index) =>
                    <div className='backgroundSlider__single__wrap'>
                        <div key={index} className='backgroundSlider__single__iteam' style={{ backgroundClip: `${iteam?.color}` }}>
                            <div className='audio__bgslider__image'>
                                <img src={iteam.image} alt='' />
                            </div>
                            <div className='audio__bgslider__text'>
                                <h5> {iteam.title} </h5>
                                <p>লেখকঃ {}</p>
                            </div>

                        </div>
                    </div>

                )}
            </Slider>
        </>

    );
}
