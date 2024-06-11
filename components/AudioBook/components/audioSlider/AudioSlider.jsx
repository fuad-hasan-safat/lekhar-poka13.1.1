import React from 'react'
import { audioSlider } from '../sampleData/audioSliderdata'

export default function AudioSlider() {
  return (
    <>
    {audioSlider.map((sliderData, index)=>{
        console.log(sliderData.background)
        if(sliderData.background){
            return(
                <>
                
                </>
            )
        }else{
            return(
                <>
                <p>without Color Sclider</p>

                </>
            )
        }
    })}
    </>
  )
}
