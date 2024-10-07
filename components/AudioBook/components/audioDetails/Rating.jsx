import React, { useEffect, useRef, useState } from 'react';
import CreateRating from './CreateRating';
import { useSelector } from 'react-redux';
import DialugueModal from '../../../common/notification/DialugueModal';

export default function Rating({ singleAudioData }) {

    const userUuid = useSelector(state => state.usersession.userUuid);
    const dialogueRef = useRef();
    const editPostRef = useRef();
    const [openCommentId, setOpenCommentId] = useState(null);  // Track the comment ID for 'More Options'

    useOutsideAlerter(editPostRef);

    const [userComments, setUserComments] = useState(singleAudioData.rating);

    function moreOptionHandler(commentId) {
        if (openCommentId === commentId) {
            setOpenCommentId(null);  // Close the options if the same comment is clicked again
        } else {
            setOpenCommentId(commentId);  // Open the options for the clicked comment
        }
    }

    console.log({ openCommentId });

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpenCommentId(null);  // Close options when clicking outside
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    return (
        <div className='audio__tab__content_wrap'>
            <div className='audio__tab__caption'>
                <h5>শ্রোতাদের মন্তব্য</h5>
                <hr></hr>
            </div>
            <CreateRating setUserComments={setUserComments} singleAudioData={singleAudioData} />

            <div className='audio__tab__details my-[40px]'>
                <DialugueModal ref={dialogueRef} alert='আপনি কি পোস্ট মুছে ফেলতে চান' type='delete' />

                {userComments?.map((comment, index) => {
                    return (
                        <div className='relative' key={index}>
                            <span className='w-full flex justify-between'>
                                <p className='break-all inline-block pr-[10px]'> <span className='font-semibold'>{comment?.name}</span>: {comment?.comment}</p>
                                {comment.user_id === userUuid && (
                                    <span className='cursor-pointer' onClick={() => moreOptionHandler(comment?._id)}>
                                        <i className="ri-draggable"></i>
                                    </span>
                                )}
                            </span>

                            {openCommentId === comment._id && (
                                <ul ref={editPostRef} key={index} className='mt-[15px] absolute top-[20px] right-0 lg:text-[15px] sm:text-[13px] xs:text-[13px] backdrop-blur-md shadow-xl bg-[#FCF7E8] z-[1000] origin-top-right w-[110px] rounded-md ring-opacity-5 focus:outline-none'>
                                    <li className="block cursor-pointer py-[5px] hover:bg-[#F9A106] hover:text-white">
                                        <button className='w-full text-center'>সম্পাদন</button>
                                    </li>
                                    <hr />
                                    <li className="block cursor-pointer py-[5px] hover:bg-[#F9A106] hover:text-white">
                                        <button onClick={() => dialogueRef.current.showModal()} className='w-full text-center'>মুছে ফেলুন</button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
