'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Circle } from 'lucide-react';
import { apiBasePath } from "../../utils/constant";
import { fetchData } from "../../function/api";


export function ImageSlider() {
    const [data, setData] = useState([])
    const [imageIndex, setImageIndex] = useState(0)
    const router = useRouter();



    useEffect(() => {

        fetch(`${apiBasePath}/sliders`)
            .then(response => response.json())
            .then(data => {
                setData(data)
            }).catch(error => console.log("Error fetching --------------- slider -------------- data"))


    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex(index => (index === data.length - 1 ? 0 : index + 1));
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [data.length]);


    //  handler

    async function fetchDataAsync(postId) {
        try {
            const result = await fetchData(
                `${apiBasePath}/getslider/${postId}`
            );
        
            router.push(`/post/${result.object.post._id}`)
          
        } catch (error) {

            console.log(error)
        } finally {
        }
    }

    function featureHandler(postId) {
        fetchDataAsync(postId);
    }


    // slider states


    function showNextImage() {
        setImageIndex(index => {
            if (index === data.length - 1) return 0
            return index + 1
        })
    }

    function showPrevImage() {
        setImageIndex(index => {
            if (index === 0) return data.length - 1
            return index - 1
        })
    }


    return (
        <section aria-label="Image Slider" style={{ width: "100%", height: "100%", position: "relative" }}>

            {data.length > 0 ?

                <div>
                    <div
                        className="relative slider__bg__img"
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            overflow: "hidden",
                        }}
                    >
                        {data.map(({ _id, title, caption, image, content='' }, index) => (

                            <div className="slider__bg__img img-slider-img"
                                key={_id}
                                aria-hidden={imageIndex !== index}
                                style={{ background: `url(${apiBasePath}/${image.slice(image.indexOf("/") + 1)})`, translate: `${-100 * imageIndex}%` }}
                            >
                                <div className="container">
                                    <div className="slider__desc__innr">
                                        <div className="slider__desc">
                                            <h1 className="lg:text-[52px] md:text-[48px] sm:text-[44px] xs:text-[38px] text-[#f58807]" >{title}</h1>
                                            <h2 className="lg:text-[28px] md:text-[24px] sm:text-[22px] xs:text-[18px] text-[#595D5B]">{caption}</h2>
                                            <p className="text-[16px] text-[#595D5B] w-[90%]">{content?.slice(0,100)}</p>

                                            <button
                                                onClick={() => featureHandler(_id)}
                                                className="page__common__btn w-[176px] inline-block  lg:mt-[25px] md:mt-[20px] sm:mt-[20px] xs:mt-[20px] bg-orange-400 px-2 lg:h-[56px] md:h-[50px] sm:h-[50px] xs:h-[50px] rounded-md text-[19px]  text-white"
                                            >
                                             বিস্তারিত <i class="ri-arrow-right-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                         
                        ))}
                    </div>

                </div>
                :
                <div>
                    <p></p>
                </div>
            }

            {/* <button
                onClick={showPrevImage}
                className="img-slider-btn img-slider-btn-lft"
                style={{ left: 0 }}
                aria-label="View Previous Image"
            >
                <img
                    src="/images/svgs/previous.svg"
                />
            </button>
            <button
                onClick={showNextImage}
                className="img-slider-btn img-slider-btn-rgt"
                style={{ right: 0 }}
                aria-label="View Next Image"
            >
                <img
                    src="/images/svgs/next.svg"
                />
            </button> */}
            <div
                className="slider__pagination"
                style={{
                    position: "absolute",
                    bottom: "3rem",
                    left: "0",
                    right:'0',
                    // right: "50%",
                    // translatex: "-50%",
                    display: "flex",
                    gap: ".3rem",
                }}
            >
             <div className="slider__pagination__cntlr" style={{display: "flex",gap: ".3rem"}}>
                    {data.map((_, index) => (

                        <button
                            key={index}
                            className={`img-slider-dot-btn ${index === imageIndex ? 'active-img-slider-dot-btn' : ''}`}
                            aria-label={`View Image ${index + 1}`}
                            onClick={() => setImageIndex(index)}
                        >
                            {index === imageIndex ? (
                                <Circle aria-hidden />
                            ) : (
                                <Circle aria-hidden />
                            )}
                        </button>
                    ))}
                </div>
            </div>
            <div id="after-image-slider-controls" />
        </section>
    )
}