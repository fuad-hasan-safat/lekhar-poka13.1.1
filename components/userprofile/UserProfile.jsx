"use client";
import Loading from '../common/loading'
import { useEffect, useState } from "react";
import UserProfileBanner from '../userprofile/userProfileBanner'
import { apiBasePath } from "../../utils/constant";
import Link from "next/link";
import UserInformationsAndBio from '../user/userInformationsAndBio';
import FollowerList from './followerList';
import FollowingList from './followingList';

export default function UserProfile({ slug }) {

  const [writer, setWriter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userToken, setUserToken] = useState("");

  //  category and writer fetch
  const [category, setCategory] = useState([]);
  const [writers, setWriters] = useState([]);

  // -------
  const [isWriterAdded, setIsWriterAdded] = useState(false)
  const [isCategoryAdded, setIsCategoryAdded] = useState(false)
  const [isProfileUpdated, setIsProfileUpdated] = useState(false)

  // profile information fetch
  const [designation, setDesignation] = useState('');
  const [profileStatus, setProfileStatus] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [follower, setFollower] = useState(0);
  const [approvedPostNum, setApprovedPostNum] = useState(0);
  const [unapprovedPostNum, setunApprovedPostNum] = useState(0);
  const [profileUserName, setProfileuserName] = useState('')
  const [bio, setBio] = useState('')
  const [bioId, setBioId] = useState('')
  const [following, setFollowing] = useState(0);
  const [canPostStatus, setCanPostStatus] = useState(false)

  //  follow/ follower and profile controller [profile/ following/ follower]
  const [profileController, setProfileController] = useState("profile")

  const handleClose = () => setProfileController('profile');

  useEffect(() => {
    setUsername(localStorage.getItem("name") || "");
    setUserToken(localStorage.getItem("token") || "");
    setUserUuid(localStorage.getItem("uuid") || "");
    setUserPhone(localStorage.getItem("phone") || "");
    setWriter(localStorage.getItem("name"));
  }, []);

  useEffect(() => {
    setStatus(localStorage.getItem("status") || "");
  }, [status]);

  useEffect(() => {

    fetch(`${apiBasePath}/getprofile/${slug}`)
      .then((response) => response.json())
      .then((data) => {
         console.log('pofile details on user profile--------------->>>>>>>', data);
        setDesignation(data.object.profile.designation || '')
        setProfileStatus(data.object.profile.profileStatus || '')
        setGender(data.object.profile.gender || '')
        setDob(data.object.profile.dob || '')
        setUsername(data.object.profile.name || '')
        setAddress(data.object.profile.address || '')
        setEmail(data.object.profile.email || '')
        setPhone(data.object.profile.phone || '')
        setImage(data.object.profile.image || '')
        setFollower(data.object.stats.follower)
        setFollowing(data.object.stats.following)
        setApprovedPostNum(data.object.approved_post)
        setunApprovedPostNum(data.object.unapproved_post)
        // console.log('pofile get PROFILE post )()()() details on user profile--------------->>>>>>>', data.object);

        if (!data.object.stats) {
          setCanPostStatus(false)
        } else {
          setCanPostStatus(true)
        }

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
      const response = await fetch(`${apiBasePath}/bio/${localStorage.getItem("uuid")}`);
      const data = await response.json();
      setBio(data?.content)
      setBioId(data?._id)
      // console.log('------------>>> BIO  <<<-------------', data)

    };

    fetchUserBioData();
    setIsCategoryAdded(false)
    setIsWriterAdded(false)
    setIsProfileUpdated(false)
  }, [slug, isWriterAdded, isCategoryAdded]);



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
        {status && (
          <div className="">
            <div>
              <UserProfileBanner
                image={image}
                apprevedPost={approvedPostNum}
                unApprovedPost={unapprovedPostNum}
                follower={follower}
                following={following}
                username={username}
                phone={phone}
                email={email}
                address={address}
                dob={dob}
                gender={gender}
                bio={bio}
                setUsername={setUsername}
                designation={designation}
                profileStatus={profileStatus}
                setProfileController={setProfileController}
              />
            </div>

            <div className='container'>
              <hr className='my-[40px]'></hr>
            </div>

            <section className="all__page__main__content">
              <div className="container">
                <div className="row">
                  <div className="col-md-12"></div>
                  <div className="lg:flex lg:flex-row lg:pt-[80px] md:pt-[60px] sm:pt-[40px] xs:pt-[40px]">
                    <div className="w-full">

                      <div>
                        {/* {true &&
                          <UserInformationsAndBio
                            username={username}
                            setUsername={setUsername}
                            sex={gender}
                            birthdate={dob}
                            location={address}
                            mail={email}
                            phone={phone}
                            userID={userUuid}
                            setIsProfileUpdated={setIsProfileUpdated}
                          />

                        } */}
                        {
                          profileController === 'follower' &&
                          <FollowerList showModal={'follower'} handleClose={handleClose} />
                        }

                        {
                          profileController === 'following' &&
                          <FollowingList showModal={'following'} handleClose={handleClose} />
                        }

                        {/* <UserDetails
                          sex={gender}
                          birthdate={dob}
                          location={address}
                          mail={email}
                          phone={phone}
                          userID={userUuid}
                          setIsProfileUpdated={setIsProfileUpdated}
                        /> */}
                      </div>


                    </div>
            
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
        {!status && (
          <div className="text-gray-800">
            <div>
              আপনি লগ ইন করেননি,
            </div>
            <Link href='/'> প্রচ্ছদ পৃষ্ঠায় যান</Link>
          </div>
        )}
      </>
    );
  }
}
