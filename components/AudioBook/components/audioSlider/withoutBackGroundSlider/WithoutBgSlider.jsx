import React from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function WithoutBgSlider({ sliderData, category }) {
    console.log('WITHOUT BACKGROUND SLIDER', sliderData)

    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1199,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
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

    return (
        <>         
            <Slider {...settings} className='hmCategorySlider'>
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
                                    <li><i class="ri-time-line"></i> {item.duration}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </Slider>
        </>

    );
}
