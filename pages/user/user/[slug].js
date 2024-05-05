import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/sidebar/Sidebar';
import UserProfileBanner from '../../../components/userprofile/userProfileBanner';
import { apiBasePath } from '../../../utils/constant';
import ProfilePostLeftContent from '../../../components/userprofile/ProfilePostLeftContent';

export default function WriterProfile() {
    const router = useRouter()
    const slug = router.query.slug;



    // user post
    const [userPost, setUserPost] = useState([]);


    // profile information fetch
    const [username, setUserName] = useState('')
    const [designation, setDesignation] = useState('');
    const [profileStatus, setProfileStatus] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState('');
    const [follower, setFollower] = useState(0);
    const [post, setPost] = useState(0);
    const [following, setFollowing] = useState(0);


    //  fetch data from local store
    const [isLoading, setIsLoading] = useState(true);

    const [status, setStatus] = useState("");
    const [loggedInUser, setLoggedInUser] = useState("");
    const [userUuid, setUserUuid] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userToken, setUserToken] = useState("");



    useEffect(() => {
        console.log("-----------------------------  SLUG -----------------------", slug);
        fetch(`${apiBasePath}/getprofile/${slug}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log('pofile details on user profile--------------->>>>>>>', data);
                setDesignation(data.object.profile.designation)
                setProfileStatus(data.object.profile.profileStatus)
                setGender(data.object.profile.gender)
                setDob(data.object.profile.dob)
                setAddress(data.object.profile.address)
                setEmail(data.object.profile.email)
                setPhone(data.object.profile.phone)
                setImage(data.object.profile.image || '')
                setFollower(data.object.stats.follower)
                setFollowing(data.object.stats.following)
                setPost(data.object.stats.post)
                setUserName(data.object.name)


                // console.log(' profile image----------->>>>', image)
            })
            .catch((error) => console.error("Error fetching data:", error));



        // user post

        async function fetchDataAsync() {
            try {
                const result = await fetchData(
                    `${apiBasePath}/postsbyuser/${slug}`
                );

                setUserPost(result.object);

            } catch (error) {
                //alert("Error fetching user post");
                console.log("Error fetching user post")
            }
        }

        fetchDataAsync();

    }, [router.query])


    useEffect(() => {
        setLoggedInUser(localStorage.getItem("name") || "");
        setUserToken(localStorage.getItem("token") || "");
        setUserUuid(localStorage.getItem("uuid") || "");
        // setUserPhone(localStorage.getItem("phone") || "");

    }, []);

    function followUserhandler(user_id, following) {

    }

    return (
        router.isReady &&
        <>
            {/* main section */}
            <section className='pt-[95px] text-black' >
                {/* profile header */}
                <section>

                    <div>
                        <div>
                            <UserProfileBanner
                                image={image}
                                post={post}
                                follower={follower}
                                following={following}
                                username={username}
                                designation={designation}
                                profileStatus={profileStatus}
                            />

                        </div>

                        <div className='container  '>
                            <button
                                className='mt-[30px] ml-[12.5%] h-[43px] bg-[#F9A106] hover:bg-[#c67256] px-[48px] p-1 rounded-lg text-white text-[16px]'
                                onClick={() => followUserhandler()}
                            >
                                অনুসরণ করুন
                            </button>

                        </div>

                    </div>

                </section>

                {/* profile body */}

                <section>
                    <div className='all__post__sec__wrap'>
                        <div className='container'>
                            <div className='lg:flex lg:flex-row'>
                                {/* body */}
                                <div className='lg:w-[70%]'>
                                    {<ProfilePostLeftContent slug={slug} />}
                                </div>
                                {/* sidebar */}
                                <div className='lg:w-[30%]'>
                                    <Sidebar />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </section>
        </>
    )
}
