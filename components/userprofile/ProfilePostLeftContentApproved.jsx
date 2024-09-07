"use client";
import { useContext, useEffect, useState } from "react";
import MainContentDivider from "../common/mainContentDivider";
import { apiBasePath } from "../../utils/constant";
import Loading from "../common/loading";
import axios from "axios";
import SinglePostConponent from "../common/singlePostComponent";
import { UserContext } from "../lekharpokaStore/user-context";
import { userPostAction } from "../redux/userpost-slice";
import { useDispatch, useSelector } from "react-redux";

export default function ProfilePostLeftContentApproved() {
  const dispatch = useDispatch();
  const approvedItems = useSelector((state) => state.userpost.approvedItems);
  const userUuid = useSelector((state) => state.usersession.userUuid);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of posts to display per page

  const { userImage } = useContext(UserContext);

  useEffect(() => {
    const username = localStorage.getItem("name") || "";
    const userToken = localStorage.getItem("token") || "";
    const slug = localStorage.getItem("uuid") || "";

    console.log({ username, slug, userToken });

    const fetchPosts = async () => {
      try {
        if(userUuid){
          const response = await axios.get(`${apiBasePath}/postsbyuser/${userUuid}`);
          const data = response.data;
          console.log('APPROVED POST----->>', response);
  
          // Dispatch to Redux store
          dispatch(userPostAction.addApiPostsToApproved(data.object));
  
          setIsLoading(false);

        }
     
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [dispatch, userImage]);

  useEffect(() => {
    console.log('Approved Items:', approvedItems); // Debugging: Check the contents of approvedItems
  }, [approvedItems]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(approvedItems.length / postsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = Math.min(startIndex + postsPerPage, approvedItems.length);
  const displayedPosts = approvedItems.slice(startIndex, endIndex);

  return (
    <div className="text-black">
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="mt-[70px]">আপনার লেখা খুঁজে পাওয়া যাচ্ছে না । </div>
      ) : (
        <>
          {approvedItems.length > 0 ? (
            <div className="flex">
              <div className="lakha__main__content text-3xl">
                {displayedPosts.map((post, index) => {
                  console.log('Rendering post:', post); // Debugging: Log each post being rendered

                  let bannerImage = post?.image;
                  if (!bannerImage) {
                    bannerImage = post?.writer_image;
                  }
                  console.log('approved banner image', bannerImage);

                  return (
                    <div key={post._id}> {/* Ensure _id is unique */}
                      <SinglePostConponent
                        id={post._id}
                        title={post.title}
                        writer={post.profile_name}
                        writer_id={post.writer_id}
                        image={bannerImage}
                        content={
                          post.category === 'কবিতা'
                            ? `${post.content.split(/\s+/).slice(0, 20).join(" ")}`
                            : `${post.content.split(/\s+/).slice(0, 30).join(" ")}`
                        }
                        category={post.category}
                        postStatus={post.status}
                        uploadedBy={post?.uploaded_by}
                        writer_image={post?.writer_image}
                        profileName={post?.profile_name}
                        updatedAt={post?.updatedAt}
                        isProfile={true}
                      />
                      {index < displayedPosts.length - 1 && <MainContentDivider />}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="pt-10">এই মুহূর্তে কোনো অনুমোদিত লেখা নেই</div>
          )}
        </>
      )}
    </div>
  );
}
