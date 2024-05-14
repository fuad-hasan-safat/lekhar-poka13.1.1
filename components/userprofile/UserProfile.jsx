"use client";
import Loading from '../common/loading'
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState, useRef, useMemo } from "react";
// import JoditEditor from "jodit-react";
// import dynamic from 'next/dynamic';
// const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import {
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar
} from 'react-simple-wysiwyg';



import Select from "react-select";

import UserDetails from '../user/userdetails'
import UserProfileBanner from '../userprofile/userProfileBanner'
import Sidebar from '../sidebar/Sidebar'
import { fetchData } from "../../function/api";
import { apiBasePath } from "../../utils/constant";
import Link from "next/link";

import Checkbox from '../common/Checkbox'
import AudioFileUpload from '../userprofile/AudiofileUpload'
import ProfilePostLeftContent from './ProfilePostLeftContentApproved';
import CreateWriter from './createWriter';
import CreateCategory from './createCategory';
import UserInformationsAndBio from '../user/userInformationsAndBio';

export default function UserProfile({ slug }) {
  // console.log("user profile main page---------------------->>>>>>>>>>>>><<<<<<<<<<<<<<<< SLUG ",slug)

  //--------------- catagory -----------------
  const [selectedOption, setSelectedOption] = useState(null);

  // determine writer and writer id
  const [writer, setWriter] = useState('');
  const [writerId, setWriterId] = useState(null);

  // check box ---- (writer creation)
  const [checkboxValue, setCheckboxValue] = useState(false);

  const handleCheckboxChange = (isChecked) => {
    setCheckboxValue(isChecked);
    // Handle the changed checkbox value in your application logic here
  };

  const categoryhandleChange = (selected) => {
    setSelectedOption(selected); // Selected option object


  };

 

 
  // --------------------------------------------


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



  // summary
  const [summary, setSummary] = useState('')

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

  const [following, setFollowing] = useState(0);
  //
  const [canPostStatus, setCanPostStatus] = useState(false)

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
        // console.log('pofile details on user profile--------------->>>>>>>', data);
        setDesignation(data.object.profile.designation)
        setProfileStatus(data.object.profile.profileStatus)
        setGender(data.object.profile.gender)
        setDob(data.object.profile.dob)
        setUsername(data.object.profile.name)
        setAddress(data.object.profile.address)
        setEmail(data.object.profile.email)
        setPhone(data.object.profile.phone)
        setImage(data.object.profile.image?.slice(data.object.profile.image?.indexOf("/")+1) || '')
        setFollower(data.object.stats.follower)
        setFollowing(data.object.stats.following)
        setApprovedPostNum(data.object.approved_post)
        setunApprovedPostNum(data.object.unapproved_post)


       console.log('pofile get PROFILE post )()()() details on user profile--------------->>>>>>>', data.object);


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


    setIsCategoryAdded(false)
    setIsWriterAdded(false)
    setIsProfileUpdated(false)
  }, [slug, isWriterAdded, isCategoryAdded]);



  // Drop down category
  let Categoryoptions = [];
  let writersOptions = [];
  for (let i = 0; i < category.length; i++) {
    let data = { value: category[i]._id, label: category[i].title };
    // console.log('---data -----------'. data)
    Categoryoptions.push(data);
  }

  for (let i = 0; i < writers.length; i++) {
    let data = { value: writers[i]._id, label: writers[i].name };
    // console.log('---data -----------'. data)
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
                setUsername={setUsername}
                designation={designation}
                profileStatus={profileStatus}
              />
            </div>
            <section className="all__page__main__content">
              <div className="container">
                <div className="row">
                  <div className="col-md-12"></div>
                  <div className="lg:flex lg:flex-row lg:pt-[80px] md:pt-[60px] sm:pt-[40px] xs:pt-[40px]">
                    <div className="lg:w-[70%]">

                      <div>
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
                    <div className="lg:w-[30%] flex flex-col ">



                      <Sidebar />
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
