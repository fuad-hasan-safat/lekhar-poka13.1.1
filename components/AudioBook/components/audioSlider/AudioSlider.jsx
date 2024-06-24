import React, { Fragment, useContext } from 'react';
import { audioSlider } from '../sampleData/audioSliderdata'
import WithoutBgSlider from './withoutBackGroundSlider/WithoutBgSlider'
import BackGroundSlider from './BackgroundSlider/BackGroundSlider'
import Link from 'next/link';
import { SeeAllSliderContext } from '../../../store/seeall-slider-context';


export default function AudioSlider() {
  const {setSliderInfo} = useContext(SeeAllSliderContext)
  return (
    <>
      {audioSlider.map((sliderData, index) => {
        console.log(sliderData.background)
        return (
          <Fragment key={index}>
            <div className='hm__audio__see__more'>
              <h3>{sliderData.category}</h3>
              <Link className='hm__audio__common__btn' href='/audiobook/seemorelist' onClick={()=>setSliderInfo(sliderData.background,sliderData.category )}>সব দেখুন</Link>
            </div>
            {sliderData.background === 'no_background' && <WithoutBgSlider sliderData={sliderData.sliderData} />}
            {sliderData.background === 'background' && <BackGroundSlider sliderData={sliderData.sliderData} />}
          </Fragment>
        )
      })}
    </>
  )
}
