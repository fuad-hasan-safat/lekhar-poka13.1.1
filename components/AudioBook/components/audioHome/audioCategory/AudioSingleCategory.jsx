import React, { useContext } from 'react'
import { SeeAllSliderContext } from '../../../../store/seeall-slider-context';
import { useRouter } from 'next/router';

export default function AudioSingleCategory({ color, title, image }) {
    const router = useRouter();
    let clr = 'green';
    let bg_color = `bg-[` + color + `]`;
    console.log({ color, title })
    const {setSliderInfo} = useContext(SeeAllSliderContext);


    function categoryClickHandle(){
        setSliderInfo('no_background', title)
        router.push('/audiobook/seemorelist')
    }

    return (
            <div className='audio__cat_Single_wrap' onClick={categoryClickHandle}>

                <div className='audio__cat__single__iteam' style={{ backgroundColor: `${color}` }}>
                    <div className='audio__cat__title'>
                        <h5> {title} </h5>
                    </div>
                    <div className='audio__cat__image'>
                        <img src={image} alt='Audio Cat Image' />
                    </div>

                </div>

            </div>

    )
}
