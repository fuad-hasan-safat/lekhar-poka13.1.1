"use client"
import { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { apiBasePath } from "../../../utils/constant";
import { useRouter } from "next/router";
import Loading from "../loading";
import { countWords } from "../../../function/api";
import MainContentDivider from "../mainContentDivider";
import SinglePostConponent from "../singlePostComponent";
import { useSelector } from "react-redux";

export default function PostPageLeftContent() {
    const router = useRouter();
    const catTitle = useSelector(state => state.category.selectedNavbarCategory);
    const [postList, setPostList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null); // State to store any errors
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isHasMore, setisHasMore] = useState(false);


    useEffect(() => {

        const fetchTotalPage = async () => {

            try {

                const response = await fetch(`${apiBasePath}/categorypostpages/${catTitle}`);
                const data = await response.json();

                setTotalPages(data?.length);

                if (data?.length > 1) {
                    setisHasMore(true)
                }

            } catch (error) {
                setError(error);
            }

        };
        setPostList([]);
        fetchTotalPage();

    }, [catTitle, router.catTitle]);


    const fetchPosts = async () => {

        try {

            const response = await fetch(`${apiBasePath}/categoryposts/${catTitle}/${currentPage}`);
            const data = await response.json();
            console.log("KOBITA: ", data)
            setPostList(postList.concat(data));

        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {

        fetchPosts();
    }, [currentPage, catTitle, router.catTitle]);


    const loadnextPage = () => {

        setCurrentPage(currentPage + 1)

        if (currentPage >= totalPages) {
            setisHasMore(false)
        }

    }

    return (
        <div>
            {isLoading ? (
                <Loading />
            ) : error ? (
                <div></div>
            ) : (
                router.isReady &&
                <>
                    <div className=''>
                        {postList.length ?
                            <div className='flex'>
                                <div className="lakha__main__content pt-20  text-3xl lg:mr-[100px] md:mr-[70px] ">
                                    {postList.length && (
                                        postList?.map((post, index) => (
                                            <>
                                                <div key={index}>
                                                    <SinglePostConponent
                                                        id={post._id}
                                                        title={post.title}
                                                        writer={post.profile_name}
                                                        writer_id={post.writer_id}
                                                        category={post.category}
                                                        image={post?.image}
                                                        uploadedBy={post?.uploaded_by}
                                                        writer_image={post?.profile_image}
                                                        profileName={post?.profile_name}
                                                        updatedAt={post?.updatedAt}
                                                        // content={countWords(post.content, 20)}
                                                        content={post.category === 'কবিতা' ? countWords(post.content, 20) : countWords(post.content, 50)}
                                                    />
                                                </div>
                                                {index < postList.length - 1 && <MainContentDivider />}
                                            </>
                                        ))
                                    )}

                                    <InfiniteScroll
                                        dataLength={postList?.length} //This is important field to render the next data
                                        next={loadnextPage}
                                        hasMore={isHasMore}
                                        loader={<h6>ডাটা লোড হচ্ছে ...</h6>}
                                        scrollThreshold={0.5}
                                    >
                                    </InfiniteScroll>

                                </div>

                            </div> :

                            <div className="pt-10 text-gray-800">  এই মুহূর্তে কোনো লেখা নেই </div>
                        }

                    </div>
                </>
            )}
        </div>
    );

}

