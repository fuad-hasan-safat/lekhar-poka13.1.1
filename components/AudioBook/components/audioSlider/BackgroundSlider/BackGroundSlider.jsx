import React from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/router';

export default function BackGroundSlider({ sliderData, category }) {
    console.log('BACKGROUND SLIDER', sliderData)

    const router = useRouter();

    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint:767,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
              },
              {
                breakpoint:479,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1
                }
              },
        ]
    };

    function sliderClickHandler(audioId){
        router.push(`/audiobook/${audioId}`)
      }

    return (
        <>
            <Slider {...settings} className='backgroundSlider'>
                {sliderData.map((iteam, index) => {

                    const color = iteam?.color;
                    console.log({ color, iteam })
                    return (
                        <div className='backgroundSlider__single__wrap'>

                            <div 
                            key={index} 
                            className='backgroundSlider__single__iteam' 
                            style={{ backgroundColor: `${color}` }}
                            onClick={()=>sliderClickHandler(iteam.id)}
                            >
                                <div className='audio__bgslider__image'>
                                    <img src={iteam.image} alt='' />
                                </div>
                                <div className='audio__bgslider__text'>
                                    <h5> {iteam.title} </h5>
                                    <p>লেখকঃ {iteam.writer}</p>
                                    <p>কণ্ঠ {iteam.voice}</p>
                                    <p style={{marginBottom:'0'}}><i class="ri-time-line"></i> {iteam.duration}</p>
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
