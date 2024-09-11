"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SliderPost from './sliderPost/SliderPost';
import { apiBasePath } from '@/utils/constant';

// ...
const CarouselIndicators = ({ images, activeIndex, onClick }) => {
  return (
    <div className="space-x-1 absolute bottom-[136px]  z-[2] mx-[15%] mb-4 flex list-none p-0 content-center justify-center">
      {images.map((_, index) => (
        <><button
          key={index}
          className={`carousel__indicator    ${index === activeIndex ? ' bg-orange-400 shadow-md h-[15px] w-[15px]' : 'bg-gray-400 h-[12px] w-[12px] mt-[2px]'
            }`}
          onClick={() => onClick(index)}
        />
        </>
      ))}
    </div>
  );
};


const Carousel1 = ({ interval = 3000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [data, setData] = useState(sliderPosts); // State to store fetched data
  const [error, setError] = useState(null); // State to store any errors

  useEffect(() => {

    // fetch(`${apiBasePath}/sliders`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setData(data)
    //   }).catch(error => console.log("Error fetching data"))

    async function fetchDataAsync() {
      try {
        const result = await fetchData(
          `${apiBasePath}/sliders`
        );
       // console.log("sliders         ->>>>>>>>>>>>>>>>", result.object);
        setData(result)
      } catch (error) {
        // alert(error)
      }
    }

    fetchDataAsync();
  }, []);


  useEffect(() => {
    const autoPlayInterval = setInterval(nextSlide, interval);
    return () => {
      clearInterval(autoPlayInterval);
    };
  }, [interval]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1
    );
  };
  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className="carousel relative pt-[125px]">
      <button onClick={prevSlide} className="carousel__btn carousel__btn--prev z-1000">
        &lt;
      </button>
      <div className='absolute pl-[302px] pt-[150px]'>
        {<SliderPost
          key={`${data[activeIndex]._id} of ${data[activeIndex].title}`}
          title={data[activeIndex].title}
          caption={data[activeIndex].caption}
          discription={data[activeIndex].content}
          id={data[activeIndex].id}
        />}
      </div>
      <div className=''>
        <CarouselIndicators
          images={data}
          activeIndex={activeIndex}
          onClick={goToSlide}
        />
      </div>


      <div className='w-full h-[780px] justify-center transition-all  cubic-bezier(0.77, 0, 0.175, 1)'>
        <img
          src={`http://192.168.88.248:3002/${data[activeIndex].image}`}
          alt={`Slide ${activeIndex}`}
          // width={1920}
          //height={780}
          className="carousel__img"
        />

      </div>
      <button onClick={nextSlide} className="carousel__btn carousel__btn--next">
        &gt;
      </button>
    </div>
  );
};
export default Carousel1;