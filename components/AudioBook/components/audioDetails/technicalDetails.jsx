import React from 'react'

export default function TechnicalDetails({ technicalDetails }) {
    return (
        <div className='audio__tab__content_wrap'>
            <div className='audio__tab__caption'>
                <h5>কলাকুশলী</h5>
                <hr></hr>
            </div>

            <div className='audio__tab__details'>
               <p>ভয়েস ওভার শিল্পী- {technicalDetails?.voice_over}</p>
               <p>প্রোডাকশন ম্যানেজার- {technicalDetails?.production_manager}</p>
               <p>কোয়ালিটি অ্যাসুরেন্স- {technicalDetails?.quality_assurance}</p>
               <p>সাউন্ড ইঞ্জিনিয়ার- {technicalDetails?.sound_engineer}</p>
            </div>


        </div>
    )
}
