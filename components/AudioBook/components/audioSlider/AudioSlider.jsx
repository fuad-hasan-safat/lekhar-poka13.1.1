import React, { Fragment } from 'react'
import { audioSlider } from '../sampleData/audioSliderdata'
import WithoutBgSlider from './withoutBackGroundSlider/WithoutBgSlider'
import BackGroundSlider from './BackgroundSlider/BackGroundSlider'


export default function AudioSlider() {
  return (
    <>
    {audioSlider.map((sliderData, index)=>{
        console.log(sliderData.background)
       return(
        <Fragment key={index}>
        {sliderData.background === 'no_background' && <WithoutBgSlider sliderData={sliderData.sliderData} />}
        {sliderData.background === 'background' && <BackGroundSlider sliderData={sliderData.sliderData} />}
        </Fragment>
       )
    })}
    </>
  )
}
