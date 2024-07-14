'use client'
import React, { useState, useEffect } from 'react'
import Loading from '../../components/common/loading';
import { apiBasePath } from '../../utils/constant';
import Sidebar from '../../components/sidebar/Sidebar';
import MainContentDivider from '../../components/common/mainContentDivider'
import SobPostsOfWriterBody from '../../components/postOfWriter/sobPostsOfWriterBody'
import { useRouter } from 'next/router';
import Head from 'next/head';
import { countWords } from '../../function/api';
import SinglePostConponent from '../../components/common/singlePostComponent';
import WriterProfileBanner from '../../components/userprofile/writerProfileBanner';
import FollowerList from '../../components/userprofile/followerList';
import FollowingList from '../../components/userprofile/followingList';
import WriterPostList from '../../components/userprofile/WriterPostList';


export default function PostOfWriterPage() {
    const router = useRouter();
    const slug = router.query.slug;

    const [postList, setPostList] = useState([])
    const [bio, setBio] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [writerInfo, setWriterInfo] = useState([])
    const [writerBio, setWriterBio] = useState([])
    const [profileInfo, setProfileInfo] = useState([])
    const [isSelfWriter, setIsSelfWriter] = useState(false)
    const [error, setError] = useState(null); // State to store any errors
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const postsPerPage = 5; // Number of posts to display per page
    const [profileController, setProfileController] = useState("profile")

    const handleClose = () => setProfileController('profile');

    useEffect(() => {

        // console.log("QUERY ", router.query.slug);
        const fetchPosts = async () => {
            console.log('------------------slug of writers ---------------', slug)
            try {
                const response = await fetch(`${apiBasePath}/postswriter/${slug}`);
                const data = await response.json();
                setPostList(data.object);
                setWriterInfo(data.writer_info)
                setProfileInfo(data?.user_profile)
                setWriterBio(data?.writer_bio)
                setBio(data.writer_bio?.content)
                setIsSelfWriter(data.self_writer)

                console.log('posts of writer ----------------------------------', data)

                setTotalPages(Math.ceil(data.object.length / postsPerPage));

            } catch (error) {
                setError(error);
                console.log('writer post ---', error)
            } finally {
                setIsLoading(false)
            }
        };
        if (router.isReady) {
            fetchPosts();
        }

    }, [router.query]);



    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, postList.length); // Ensure endIndex doesn't exceed posts length

    const displayedPosts = postList.slice(startIndex, endIndex);



    if (isLoading) {
        return <Loading />;
    } else {


        return (

            <div>
                <Head>
                    <title>লেখক পোস্ট</title>
                 

                </Head>
                <section className="all__post__sec__wrap">
                    <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[220px] -z-10  overflow-hidden" style={{ background: `url('/images/usericons/userbanner.svg')center center / cover no-repeat` }}>
                    </div>
                </section>
                <section className='text-black'>
                    <div className='container'>
                        <div className='lg:flex lg:flex-row'>
                            {/* left part */}
                            <div className='lg:w-[30%]   lg:mb-[110px]'>

                                <WriterProfileBanner
                                    setProfileController={setProfileController}
                                    writerInfo={writerInfo}
                                    writerBio={writerBio}
                                    profileInfo={profileInfo}
                                    isSelfWriter={isSelfWriter}
                                />


                                {/* {
                                    profileController === 'follower' &&
                                    <FollowerList userId={writerInfo?.user_id} showModal={'follower'} handleClose={handleClose} />
                                }

                                {
                                    profileController === 'following' &&
                                    <FollowingList userId={writerInfo?.user_id} showModal={'following'} handleClose={handleClose} />
                                } */}

                            </div>

                            <div className='lg:w-[60%] lg:p-[40px] mb-[40px]'>
                                <WriterPostList profileInfo={profileInfo}  postList={postList} />
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        );
    }
}
