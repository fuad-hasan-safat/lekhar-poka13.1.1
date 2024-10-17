import React, { useEffect, useState } from 'react'
import { apiBasePath } from '../../../../utils/constant';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { toastAction } from '../../../redux/toast-slice';

export default function CreateRating({ setUserComments, setIsNewComment }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const userUuid = useSelector((state) => state.usersession.userUuid);
    const [loggedInUserId, setLoggedInUserId] = useState(null)

    useEffect(()=>{
      const loggedInUser = localStorage.getItem('userId') || null ;
      console.log('logged in user in profile -->', loggedInUser)
      setLoggedInUserId(loggedInUser);
    },[])
    const [userRating, setUserRating] = useState('');
    const [profileInfo, setProfileInfo] = useState([]);
    const [canPostStatus, setCanPostStatus] = useState(false)


    let notification = '';

    useEffect(() => {

        fetch(`${apiBasePath}/getprofile/${loggedInUserId}`)
            .then((response) => response.json())
            .then((data) => {

                if (!data.object.profile_completion_status) {
                    setCanPostStatus(false)
                } else {
                    setCanPostStatus(true)
                }

            })
            .catch((error) => console.error("Error fetching data:", error));

        fetch(`${apiBasePath}/getprofile/${loggedInUserId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('pofile details on user profile--------------->>>>>>>', data);
                setProfileInfo(data.object.profile)
            })
            .catch((error) => console.error("Error fetching data:", error));

    }, [loggedInUserId])

    function reloadPage() {
        setTimeout(() => {
            router.reload();
        }, 1000)
    }

    async function submitRating() {
        if (!canPostStatus) {
            notification = 'আপনার প্রোফাইল সম্পূর্ণ করুণ!';
            dispatch(toastAction.setWarnedNotification(notification));
            return;
        }
        if (loggedInUserId) {
            const postData = {
                ebook_id: `${router.query.slug}`,
                name: profileInfo?.name,
                comment: userRating,
                user_id: loggedInUserId
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
                // const newComment = {
                //     ...postData,
                //     _id : ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)),
                // }
                // setUserComments((prevData) => ([
                //     ...prevData,
                //     newComment,
                // ]))
                setIsNewComment((prev) => !prev); 
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
