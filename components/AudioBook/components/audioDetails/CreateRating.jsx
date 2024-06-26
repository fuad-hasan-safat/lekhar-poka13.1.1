import React, { useState } from 'react'

export default function CreateRating() {

    const [userRating, setUserRating] = useState('');

    function submitRating(){

    }
    return (
        <div className={``}>

            <textarea
                id="message"
                name="message"
                placeholder='আপনার মন্তব্য'
                value={userRating}
                onChange={(e)=> setUserRating(e.target.value)}
                required
                className='bg-[#FCF7E8] text-gray-500 text-[20px] w-full lg:h-[270px] md:h-[240px] sm:h-[220px] xs:h-[200px] rounded-[5px] p-5 focus:outline-none focus:border-b-[3px] focus:border-b-[#F9A106]'
            />

            <button
            onClick={submitRating}
                className={`page__common__btn contact__form__btn font-[600] bg-[#F9A106] w-full h-[50px] rounded-[5px] text-[20px] text-white`}
            >
                সাবমিট
            </button>

        </div>
    );
}
