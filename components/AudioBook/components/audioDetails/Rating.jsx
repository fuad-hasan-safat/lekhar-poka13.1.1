import React, { useEffect, useRef, useState } from 'react';
import CreateRating from './CreateRating';
import { useDispatch, useSelector } from 'react-redux';
import DialugueModal from '../../../common/notification/DialugueModal';
import { apiBasePath, serverEndApiBasePath } from '../../../../utils/constant';
import axios from 'axios';
import { useRouter } from 'next/router';
import { toastAction } from '../../../redux/toast-slice';

export default function Rating({ singleAudioData }) {

    const router = useRouter();
    const slug = router.query.slug;
    const dispatch = useDispatch();
    const userUuid = useSelector(state => state.usersession.userUuid);
    const dialogueRef = useRef();
    const editPostRef = useRef();
    const [openCommentId, setOpenCommentId] = useState(null);  // Track the comment ID for 'More Options'
    useOutsideAlerter(editPostRef);
    const [userComments, setUserComments] = useState(null);
    const [isNewComment, setIsNewComment] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [deleteCommentId, setDeleteCommentId] = useState(null);


    useEffect(() => {
        getAudioComment();
    }, [slug, isNewComment])

    async function getAudioComment() {
        console.log('router', router)
        try {
            const response = await axios.get(`${apiBasePath}/getaudiobook/${slug}`);
            console.log('Response:', response.data?.rating);
            setUserComments(response.data?.rating);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    }

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


    function handleEditClick(commentId, currentComment) {
        setEditCommentId(commentId);  // Set the comment ID being edited
        setEditedComment(currentComment);  // Pre-fill with the current comment text
    }

    async function saveEditedComment(commentId) {
        try {
            const updatedComment = {
                comment: editedComment,
            };
            // await axios.put(`${apiBasePath}/updatecomment/${commentId}`, updatedComment); // Update on server

            if(editedComment.trim().length === 0){
                const notification = 'কিছু লিখুন !';
                dispatch(toastAction.setWarnedNotification(notification));
                return;
            }

            setUserComments((prevComments) =>
                prevComments.map((comment) =>
                    comment._id === commentId ? { ...comment, comment: editedComment } : comment
                )
            );

            const notification = 'আপনার মন্তব্য সম্পাদন করা হয়েছে';
            dispatch(toastAction.setSucessNotification(notification));

            setEditCommentId(null);
        } catch (error) {
            const notification = 'আপনার মন্তব্য সম্পাদন করা যায়নি।';
            dispatch(toastAction.setWarnedNotification(notification));
            console.error('Error updating comment:', error.response ? error.response.data : error.message);
        }
    }

    function deleteCommentHandler(commentId) {
        setDeleteCommentId(commentId);
        dialogueRef.current.showModal();
    }

    async function deleteComment() {
        try {
            // await axios.delete(`${apiBasePath}/deletecomment/${deleteCommentId}`);  // API call to delete comment

            setUserComments((prevComments) =>
                prevComments.filter((comment) => comment._id !== deleteCommentId)
            );

            const notification = 'আপনার মন্তব্য মুছে ফেলা হয়েছে ।';
            dispatch(toastAction.setSucessNotification(notification));
            dialogueRef.current.close();

            setDeleteCommentId(null);  // Reset after deletion

        } catch (error) {
            const notification = 'আপনার মন্তব্য মুছে ফেলা যায়নি।';
            dispatch(toastAction.setWarnedNotification(notification));
            console.error('Error deleting comment:', error.response ? error.response.data : error.message);
        }
    }


    return (
        <div className='audio__tab__content_wrap'>
            <div className='audio__tab__caption'>
                <h5>শ্রোতাদের মন্তব্য</h5>
                <hr></hr>
            </div>
            <CreateRating
                setUserComments={setUserComments}
                setIsNewComment={setIsNewComment}
            />

            <div className='audio__tab__details my-[40px]'>
                <DialugueModal ref={dialogueRef} alert='আপনি কি পোস্ট মুছে ফেলতে চান' address={deleteComment} type='delete' />

                {userComments?.map((comment, index) => (
                    <div className='relative' key={index}>
                        <span className='w-full flex justify-between'>
                            {editCommentId === comment._id ? (
                                // Render textarea for editing
                                <textarea
                                    className='bg-[#FCF7E8] text-gray-500 text-[20px] w-full rounded-[5px] p-5 focus:outline-none'
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
                                />
                            ) : (
                                // Render the normal comment text
                                <p className='break-all inline-block pr-[10px]'>
                                    <span className='font-semibold'>{comment?.name}</span>: {comment?.comment}
                                </p>
                            )}

                            {comment.user_id === userUuid && (
                                <span className='cursor-pointer' onClick={() => moreOptionHandler(comment._id)}>
                                    <i className="ri-draggable"></i>
                                </span>
                            )}
                        </span>

                        {openCommentId === comment._id && (
                            <ul
                                ref={editPostRef}
                                className='mt-[15px] absolute top-[20px] right-0 lg:text-[15px] sm:text-[13px] xs:text-[13px] backdrop-blur-md shadow-xl bg-[#FCF7E8] z-[1000] origin-top-right w-[110px] rounded-md ring-opacity-5 focus:outline-none'
                            >
                                <li className="block cursor-pointer py-[5px] hover:bg-[#F9A106] hover:text-white">
                                    <button
                                        className='w-full text-center'
                                        onClick={() => handleEditClick(comment._id, comment.comment)}
                                    >
                                        সম্পাদন
                                    </button>
                                </li>
                                <hr />
                                <li className="block cursor-pointer py-[5px] hover:bg-[#F9A106] hover:text-white">
                                    <button onClick={() => deleteCommentHandler(comment._id)} className='w-full text-center'>
                                        মুছে ফেলুন
                                    </button>
                                </li>
                            </ul>
                        )}

                        {editCommentId === comment._id && (
                            <div className='flex justify-end mt-2'>
                                <button
                                    className='bg-green-500 text-white px-4 py-1 rounded-md mr-2'
                                    onClick={() => saveEditedComment(comment._id)}
                                >
                                    সংরক্ষন
                                </button>
                                <button
                                    className='bg-red-500 text-white px-4 py-1 rounded-md'
                                    onClick={() => setEditCommentId(null)}  // Cancel edit
                                >
                                    বাতিল 
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
