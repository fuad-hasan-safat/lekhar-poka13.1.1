import React from 'react'

export default function AudioSingleCategory({ color, title, image }) {
    let clr = 'green';
    let bg_color = `bg-[` + color + `]`;
    console.log({ color, title })
    return (
        <div className='audio__cat__single__iteam' style={{ backgroundColor: `${color}` }}>

            <div className='audio__cat__title'>
                <h5> {title} </h5>
            </div>
            <div className='audio__cat__image'>
                <img src={image} alt='' />
            </div>
        </div>
    )
}
