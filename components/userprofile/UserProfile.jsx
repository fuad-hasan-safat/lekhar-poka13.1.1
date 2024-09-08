"use client";
import { useContext, useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Loading from '../common/loading'
import UserProfileBanner from '../userprofile/userProfileBanner'
import { apiBasePath } from "../../utils/constant";
import ProfilePostLeftContentUnApproved from './ProfilePostLeftContentUnapproved';
import ProfilePostLeftContentApproved from './ProfilePostLeftContentApproved';
import { UserContext } from '../lekharpokaStore/user-context';

export default function UserProfile() {

  const userUuid = useSelector(state => state.usersession.userUuid)

  const router = useRouter();
  const { setIsProfileLoaded } = useContext(UserContext);

  const [writer, setWriter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  // const [userUuid, setUserUuid] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userToken, setUserToken] = useState("");
  const [userProfileData, setuserprofiledata] = useState({
    userName: '',
    userImage: '',
    userPhone: '',
    userEmail: '',
    userBirthDate: '',
    userDesignation: '',
    userGender: '',
    userStatus: '',
    userAddress: '',
    userBio: '',
  })

  //  category and writer fetch
  const [category, setCategory] = useState([]);
  const [writers, setWriters] = useState([]);

  // -------
  const [isWriterAdded, setIsWriterAdded] = useState(false)
  const [isCategoryAdded, setIsCategoryAdded] = useState(false)
  const [isProfileUpdated, setIsProfileUpdated] = useState(false)

  const [bio, setBio] = useState('')
  const [bioId, setBioId] = useState('')
  const [canPostStatus, setCanPostStatus] = useState(false)
  // 

  const [profileInfo, setProfileInfo] = useState([])
  const [profileName, setProfileName] = useState('')
  const [approvedPost, setApprovedPost] = useState(0)
  const [unapprovedPost, setUnapprovedPost] = useState(0)
  const [profileStats, setProfileStats] = useState([])
  const [profileStatus, setProfileStatus] = useState('')
  const [status, setStatus] = useState("");



  //  follow/ follower and profile controller [profile/ following/ follower]
  const [profileController, setProfileController] = useState("profile")

  const handleClose = () => setProfileController('profile');

  useEffect(() => {
    setIsProfileLoaded(false);
    setUsername(localStorage.getItem("name") || "");
    setUserToken(localStorage.getItem("token") || "");
    setUserPhone(localStorage.getItem("phone") || "");
    setWriter(localStorage.getItem("name"));
  }, []);

  useEffect(() => {
    setStatus(localStorage.getItem("status") || "");
  }, [status]);

  useEffect(() => {

    if(!userUuid) return;

    fetch(`${apiBasePath}/getprofile/${userUuid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('pofile details on user profile--------------->>>>>>>', data);
        setProfileInfo(data.object.profile)
        setApprovedPost(data.object.approved_post)
        setUnapprovedPost(data.object.unapproved_post)
        setProfileName(data.object.name)
        setProfileStatus(data.object.status)
        setProfileStats(data.object.stats)
        setuserprofiledata((prevData) => ({
          ...prevData,
          userName: data.object.profile?.name,
          userImage: `${apiBasePath}/${ data.object.profile?.image.slice( data.object.profile?.image?.indexOf("/") + 1)}`,
          userPhone: data.object.profile?.phone,
          userEmail: data.object.profile?.email,
          userBirthDate: data.object.profile?.dob,
          userGender: data.object.profile?.gender,
          userDesignation: data.object.profile?.designation,
          userStatus: data.object.profile?.profileStatus,
          userAddress: data.object.profile?.address,
        }))

        if (!data.object.stats) {
          setCanPostStatus(false)
        } else {
          setCanPostStatus(true)
        }
        
        if(data.object.name === null) return ;

        // console.log(' profile image----------->>>>', image)
      })
      .catch((error) => console.error("Error fetching data:", error));


    fetch(`${apiBasePath}/writers`)
      .then((response) => response.json())
      .then((data) => {
        setWriters(data);
      })
      .catch((error) => console.error("Error fetching data:", error));


    fetch(`${apiBasePath}/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(setIsLoading(false));


    const fetchUserBioData = async () => {
      try{
        if(userUuid){
          const response = await fetch(`${apiBasePath}/bio/${userUuid}`);
          const data = await response.json();
          setBio(data?.content)
          setBioId(data?._id)
          setuserprofiledata((prevData) => ({
            ...prevData,
            userBio: data?.content,
          }))
        }
    
      }catch(error){
        console.log('Bio fetch error')
      }
    
      // console.log('------------>>> BIO  <<<-------------', data)

    };

    fetchUserBioData();
    setIsCategoryAdded(false)
    setIsWriterAdded(false)
    setIsProfileUpdated(false)
    setIsProfileLoaded(true);
  }, [isWriterAdded, isCategoryAdded]);



  // Drop down category
  let Categoryoptions = [];
  let writersOptions = [];

  for (let i = 0; i < category.length; i++) {

    let data = { value: category[i]._id, label: category[i].title };

    Categoryoptions.push(data);

  }

  for (let i = 0; i < writers.length; i++) {

    let data = { value: writers[i]._id, label: writers[i].name };

    writersOptions.push(data);

  }


  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <>
        <section className="all__post__sec__wrap">
          <div className="relative w-full xl:h-[315px] lg:h-[315px] md:h-[315px] sm:h-[280px] xs:h-[220px] -z-10  overflow-hidden" style={{ background: `url('/images/usericons/userbanner.svg')center center / cover no-repeat` }}>
          </div>
        </section>
        <section className='text-black'>
          <div className='container'>
            <div className='lg:flex lg:flex-row'>
              {/* left part */}
              <div className='lg:w-[30%] lg:mb-[110px] md:mb-[50px] sm:mb-[40px] xs:mb-[40px]'>
                <UserProfileBanner
                  userProfileData={userProfileData}
                  setuserprofiledata={setuserprofiledata}
                  bio={bio}
                  profileInfo={profileInfo}
                  profileName={profileName}
                  approvedPost={approvedPost}
                  unapprovedPost={unapprovedPost}
                  profileStatus={profileStatus}
                  profileStats={profileStats}
                  setProfileController={setProfileController}
                />

              </div>
              <div className='lg:w-[60%] lg:pl-[60px] lg:pt-[60px] mb-[40px]'>
                <div className='lg:mb-[50px] md:mb-[40px] sm:mb-[30px] xs:mb-[20px]'>
                  <button
                    onClick={() => router.push('/user/createpost')}
                    className='page__common__yello__btn  px-[50px] md:px-[50px] sm:px-[40px] xs:px-[40px] lg:py-[18px] md:py-[18px] sm:py-[15px] xs:py-[14px] bg-[#F9A106] text-white text-[20px] font-semibold rounded-[16px]'><i class="ri-add-box-fill"></i> নতুন লেখা যুক্ত করুন
                  </button>
                </div>
                <div>
                  <ProfilePostLeftContentUnApproved />
                </div>
                <div>
                  <ProfilePostLeftContentApproved />
                </div>

                {/* {
                  profileController === 'follower' &&
                  <FollowerList userId={slug} showModal={'follower'} handleClose={handleClose} />
                }

                {
                  profileController === 'following' &&
                  <FollowingList userId={slug} showModal={'following'} handleClose={handleClose} />
                } */}
              </div>

            </div>
          </div>
        </section>
      </>
    );
  }
}
