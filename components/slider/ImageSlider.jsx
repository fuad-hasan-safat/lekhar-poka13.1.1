'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Circle } from 'lucide-react';
import { apiBasePath } from "../../utils/constant";
import { fetchData } from "../../function/api";
// import '/public/assets/css/image-slider.css'
// import './image-slider.css'
// import { apiBasePath } from "@/utils/constant";

export function ImageSlider() {
    const [data, setData] = useState([])

    // api call 
    useEffect(() => {

        fetch(`${apiBasePath}/sliders`)
            .then(response => response.json())
            .then(data => {
                setData(data)
                console.log('slider data ------------>>>>', data)
            }).catch(error => console.log("Error fetching --------------- slider -------------- data"))


    }, []);

    //  handler
    const router = useRouter();

    async function fetchDataAsync(postId) {
        console.log('__________________(((((((((((((<<<<<<<<<<<<<<<<<------->>>>>>>>>>>>>>>>>)))))))))))))______', postId)
        try {
            const result = await fetchData(
                `${apiBasePath}/getslider/${postId}`
            );
            console.log("slider result          ->>>>>>>>>>>>>>>>", result.object.post);
            //   console.log({slug, result})
            //   setData(result.object.post);
            //   setIsLoading(false)
            router.push(`/post/${result.object.post._id}`)
            //   setIsLoading(false)
            //   console.log('data -------------- slider  -------------- slider >>>>>', data)
        } catch (error) {

            console.log(error)
        } finally {
            //   setIsLoading(false)
        }
    }

    function featureHandler(postId) {
        console.log('features handler ------>>>>>>>>>>>>', postId)



        fetchDataAsync(postId);

        // router.push(`/feature/${postId}`);
    }


    // slider states

    const [imageIndex, setImageIndex] = useState(0)

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
            {/* <a href="#after-image-slider-controls" className="skip-link">
                Skip Image Slider Controls
            </a> */}

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
                        {data.map(({ _id, title, caption, image, content }, index) => (

                            <div className="slider__bg__img img-slider-img"
                                key={_id}
                                aria-hidden={imageIndex !== index}
                                style={{ background: `url(${apiBasePath}/${image.slice(image.indexOf("/") + 1)})`, translate: `${-100 * imageIndex}%` }}
                            >
                                <div className="container">
                                    <div className="slider__desc__innr">
                                        <div className="slider__desc">
                                            <h1 className="lg:text-[52px] md:text-[48px] sm:text-[44px] xs:text-[38px] text-[#86312F]" >{title}</h1>
                                            <h2 className="lg:text-[28px] md:text-[24px] sm:text-[22px] xs:text-[18px] text-[#595D5B]">{caption}</h2>
                                            <p className="text-[16px] text-[#595D5B] w-[90%]">{content}</p>

                                            <button
                                                onClick={() => featureHandler(_id)}
                                                className="w-[176px] inline-block lg:mt-[30px] md:mt-[20px] sm:mt-[20px] xs:mt-[20px] bg-orange-400 px-2 lg:h-[56px] md:h-[50px] sm:h-[50px] xs:h-[50px] rounded-md text-[19px]  text-white"
                                            >
                                                বিস্তারিত
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            // <img
                            //     key={_id}
                            //     src={`${apiBasePath}/${image.slice(image.indexOf("/") + 1)}`}
                            //     alt={image}
                            //     aria-hidden={imageIndex !== index}
                            //     className="img-slider-img"
                            //     style={{ translate: `${-100 * imageIndex}%` }}
                            // />
                        ))}
                    </div>
                    {/* <div
                        className="absolute left-0 top-[50%] -translate-y-1/2"
                        style={{
                            width: "100%",

                            display: "flex",
                            overflow: "hidden",
                        }}
                    >
                    
                    </div> */}


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
                    left: "6%",
                    // right: "50%",
                    // translatex: "-50%",
                    display: "flex",
                    gap: ".3rem",
                }}
            >
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
            <div id="after-image-slider-controls" />
        </section>
    )
}