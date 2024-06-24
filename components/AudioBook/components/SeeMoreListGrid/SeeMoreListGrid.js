import React, { useState, useEffect, useRef } from 'react';

const initialData = [
    // Your data here
    {
        image: '/audioBook/audio-slider/audio-slider-img-1.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-2.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-3.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-4.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-5.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-6.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-1.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-1.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-2.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-3.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-4.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-5.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-6.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
    {
        image: '/audioBook/audio-slider/audio-slider-img-1.png',
        title: 'তিন গোয়েন্দা',
        kText: 'লেখক : রকিব হাসান',
        vText: 'কন্ঠ: রকিব হাসান তুষার',
        time: '১:৪১ মিনিট',
    },
];

const SeeMoreListGrid = () => {
    const [displayCount, setDisplayCount] = useState(6);
    const [loading, setLoading] = useState(false);
    const observerRef = useRef();

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                loadMoreData();
            }
        });
        
        const target = document.querySelector('#load-more-trigger');
        if (target) {
            observerRef.current.observe(target);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    const loadMoreData = () => {
        if (loading) return;

        setLoading(true);

        setTimeout(() => {
            setDisplayCount((prevCount) => Math.min(prevCount + 3, initialData.length));
            setLoading(false);
        }, 1500);
    };

    return (
        <div>
            {initialData.slice(0, displayCount).map((item, index) => (
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
                                <li><i className="ri-time-line"></i> {item.time}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
            <div id="load-more-trigger" style={{ height: '1px' }}></div>
            {loading && <p>Loading more content...</p>}
        </div>
    );
};

export default SeeMoreListGrid;