import React, { useState } from 'react'
import { apiBasePath } from '../../../../utils/constant';

export default function CreateRating({singleAudioData}) {

    const [userRating, setUserRating] = useState('');

    async function submitRating() {
        const postData = {
            rating: userRating,
        };

        try {
            const response = await fetch(`${apiBasePath}/commentaudiobook`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            const result = await response.json();
            console.log('Response:', result); // Handle the response as needed
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
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
                className='bg-[#FCF7E8] text-gray-500 text-[20px] w-full lg:h-[270px] md:h-[240px] sm:h-[220px] xs:h-[180px] rounded-[5px] p-5 focus:outline-none focus:border-b-[3px] focus:border-b-[#F9A106]'
            />

            <button
            onClick={submitRating}
                className={`page__common__btn contact__form__btn font-[600] bg-[#F9A106] w-full h-[50px] mt-[10px] rounded-[5px] lg:text-[20px] md:text-[18px] sm:text-[17px] xs:text-[16px] pt-[5px] text-white`}
            >
                সাবমিট
            </button>

        </div>
    );
}
