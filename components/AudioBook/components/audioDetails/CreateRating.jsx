import React, { useEffect, useState } from 'react'
import { apiBasePath } from '../../../../utils/constant';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toastAction } from '../../../redux/toast-slice';

export default function CreateRating({ setUserComments }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const userUuid = useSelector((state) => state.usersession.userUuid);
    const [userRating, setUserRating] = useState('');
    const [profileInfo, setProfileInfo] = useState([]);

    let notification = '';

    useEffect(() => {

        fetch(`${apiBasePath}/getprofile/${userUuid}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('pofile details on user profile--------------->>>>>>>', data);
                setProfileInfo(data.object.profile)
            })
            .catch((error) => console.error("Error fetching data:", error));

    }, [])

    function reloadPage() {
        setTimeout(() => {
            router.reload();
        }, 1000)
    }

    async function submitRating() {
        if (userUuid) {
            const postData = {
                ebook_id: `${router.query.slug}`,
                name: profileInfo?.name,
                comment: userRating,
                user_id: userUuid
            };

            console.log({ postData })

            if (postData.comment.trim() === '') {
                notification = 'দয়া করে আপনার মন্তব্য লিখুন ।';
                dispatch(toastAction.setWarnedNotification(notification));
                return;
            };

            try {
                const response = await axios.post(`${apiBasePath}/commentaudiobook`, postData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = response.data;
                notification = 'আপনার মন্তব্য প্রেরণ সফল হয়েছে।';
                dispatch(toastAction.setSucessNotification(notification));
                setUserRating('')
                setUserComments((prevData) => ([
                    ...prevData,
                    postData
                ]))
                console.log('Response:', result); // Handle the response as needed
                // reloadPage();
            } catch (error) {
                console.error('Error submitting rating:', error);
                notification = 'আপনার মন্তব্য যায়নি।';
                dispatch(toastAction.setWarnedNotification(notification));
            }

        }

    }




    return (
        <div className={``}>
            <textarea
                id="message"
                name="message"
                placeholder='আপনার মন্তব্য'
                value={userRating}
                onChange={(e) => setUserRating(e.target.value)}
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
