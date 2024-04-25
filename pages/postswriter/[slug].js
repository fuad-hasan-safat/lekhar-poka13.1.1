'use client'
import React, { useState, useEffect } from 'react'
import Loading from '../../components/common/loading';
import { apiBasePath } from '../../utils/constant';
import Sidebar from '../../components/sidebar/Sidebar';
import MainContentDivider from '../../components/common/mainContentDivider'
import SobPostsOfWriterBody from '../../components/postOfWriter/sobPostsOfWriterBody'
import { useRouter } from 'next/router';


export default function PostOfWriterPage() {
    const router = useRouter();
    const slug = router.query.slug;

    const [postList, setPostList] = useState([])
    const [isLoading, setIsLoading] = useState(true);


    const [error, setError] = useState(null); // State to store any errors
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const postsPerPage = 5; // Number of posts to display per page



    useEffect(() => {

        console.log("QUERY ", router.query.slug);
        const fetchPosts = async () => {
            console.log('------------------slug of writers ---------------', slug)
            try {
                const response = await fetch(`${apiBasePath}/postswriter/${slug}`);
                const data = await response.json();
                setPostList(data.object);

                console.log('posts of writer ----------------------------------', data.object)

                // Calculate total pages based on posts and postsPerPage
                setTotalPages(Math.ceil(data.object.length / postsPerPage));

            } catch (error) {
                setError(error);
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
            <section>
                <div className='container flex flex-row pt-[94px]'>
                    <div className="pt-20 text-3xl w-[70%]">


                        {isLoading ? (
                            <Loading />
                        ) : error ? (
                            <div>Error fetching posts: {error.message}</div>
                        ) : (
                            <>
                                <div className="pt-20  text-3xl mr-[50px]">
                                    {displayedPosts.length && (
                                        displayedPosts.map((post, index) => (
                                            <>
                                                <div key={index}>
                                                    <SobPostsOfWriterBody
                                                        id={post._id}
                                                        title={post.title}
                                                        writer={post.writer}
                                                        content={post.content.split('\n').slice(0, 8).join('\n')}
                                                    />
                                                </div>
                                                {index < displayedPosts.length - 1 && <MainContentDivider />}
                                            </>
                                        ))
                                    )}
                                </div>
                                {totalPages > 1 && <div className="py-10 space-x-4"> {/* Add a class for styling */}
                                    <button
                                        className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"

                                        onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                                        প্রথম পৃষ্ঠা
                                    </button>
                                    <button
                                        className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"

                                        onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                        পূর্ববর্তী পৃষ্ঠা
                                    </button>
                                    <span
                                        className="text-sm text-gray-700 "
                                    >পৃষ্ঠা {currentPage} এর {totalPages}</span>
                                    <button
                                        className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"

                                        onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                        পরবর্তী পৃষ্ঠা
                                    </button>
                                    <button
                                        className="text-[16px] bg-orange-400 px-2 text-white rounded-2xl h-[40px]"

                                        onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                                        শেষ পৃষ্ঠা
                                    </button>
                                </div>
                                }
                            </>
                        )}

                    </div>
                    <div className='w-[30%]'>
                        <Sidebar />
                    </div>
                </div>
            </section>
        );
    }
}
