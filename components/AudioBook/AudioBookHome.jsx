import React from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
import AudioRecentSlider from './components/AudioRecentSlider/AudioRecentSlider';



export const HmAudioSlideData=[
    {
        title:'বই হচ্ছে শ্রেষ্ঠ আত্মীয়, যার সঙ্গে কোনদিন ঝগড়া হয় না,কোনদিন মনোমালিন্য হয় না। - প্রতিভা বসু',
    },
    {
        title:'বই হচ্ছে শ্রেষ্ঠ আত্মীয়, যার সঙ্গে কোনদিন ঝগড়া হয় না,কোনদিন মনোমালিন্য হয় না। - প্রতিভা বসু',
    },
    {
        title:'বই হচ্ছে শ্রেষ্ঠ আত্মীয়, যার সঙ্গে কোনদিন ঝগড়া হয় না,কোনদিন মনোমালিন্য হয় না। - প্রতিভা বসু',
    },
    {
        title:'বই হচ্ছে শ্রেষ্ঠ আত্মীয়, যার সঙ্গে কোনদিন ঝগড়া হয় না,কোনদিন মনোমালিন্য হয় না। - প্রতিভা বসু',
    },
    {
        title:'বই হচ্ছে শ্রেষ্ঠ আত্মীয়, যার সঙ্গে কোনদিন ঝগড়া হয় না,কোনদিন মনোমালিন্য হয় না। - প্রতিভা বসু',
    },
]

const AudioBookHome = () => {

    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };

    return (
        <section className='hm__audio__book__sec'>
            <div className='container'>
                <div className='hm__audio__book__wrap'>
                    <div className='audiu__logo'>
                        <a href='/audiobook'><img src='/images/audio-logo.png' alt='Audio Logo'/></a>
                    </div>
                    <Slider {...settings}>
                        {HmAudioSlideData.map((item,index)=>
                            <div className='hm__audio__slide__item'>
                                <p>{item.title}</p>
                            </div>
                         )}
                    </Slider>
                </div>
                <div className='hm__audio__recent__wrap'>
                    <div className='hm__audio__see__more'>
                        <h3>সাম্প্রতিক</h3>
                        <Link className='hm__audio__common__btn' href='#'>সব দেখুন</Link>
                    </div>
                    <AudioRecentSlider />
                </div>
            </div>
        </section>
    );
};

export default AudioBookHome;