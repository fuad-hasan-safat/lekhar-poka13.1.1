import React from 'react';
import Slider from "react-slick";
import { useRouter } from 'next/router';
import { apiBasePath } from '../../../../../utils/constant';

export default function WithoutBgSlider({ sliderData, category }) {
  console.log('WITHOUT BACKGROUND SLIDER', sliderData)

  const router = useRouter();

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
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  };

  function sliderClickHandler(audioId) {
    router.push(`/audiobook/${audioId}`)
  }

  return (
    <>
      <Slider {...settings} className='hmCategorySlider'>
        {sliderData.map((item, index) =>
          <div key={index} className='hm__audio__recent__slide__item'>

            <div className='hm__audio__recent__slide__item__innr' onClick={() => sliderClickHandler(item._id)}>
              <div className='hm__audio__recent__slide__item__img'>
                <img src={`${apiBasePath}/${item.image?.slice(item.image.indexOf('/') + 1)}`} alt='Slider Img' />
              </div>
              <div className='hm__audio__recent__slide__dsc'>
                <h5 h5 className='charLim'>{item.title}</h5>
                <p className='charLim font-[600]'>লেখক : {item?.writer}</p>
                <ul className='clearfix reset-list'>
                  <li className='charLim'>কন্ঠ: {item?.voice}</li>
                  <li className='flex items-center font-[400]'><span className='inline-block text-[20px]'><i class="ri-time-line"></i></span> <span className='inline-block pl-[5px] text-[12px]' >{item?.duration}</span> </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </Slider>
    </>

  );
}
