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
import ProfilePostLeftContent from './ProfilePostLeftContent';
import CreateWriter from './createWriter';
import CreateCategory from './createCategory';

export default function UserProfile({ slug }) {
  // console.log("user profile main page---------------------->>>>>>>>>>>>><<<<<<<<<<<<<<<< SLUG ",slug)

  // --------------- editor ----------

  const editor = useRef(null);
  const [content, setContent] = useState("");

  // ---------------------

  //--------------- catagory -----------------
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedWriter, setSelectedWriter] = useState(null);

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

  const writerhandleChange = (selected) => {
    setSelectedWriter(selected); // Selected option object
    setWriter(selected?.label)
    setWriterId(selected?.value)
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      border: "1px solid #ccc",
      color: "#000"
    }),
  };

  // --------------------------------------------

  const router = useRouter();

  const [title, setTitle] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [userUuid, setUserUuid] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userToken, setUserToken] = useState("");
  const [userPost, setUserPost] = useState([]);

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
  const [post, setPost] = useState(0);
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
        setAddress(data.object.profile.address)
        setEmail(data.object.profile.email)
        setPhone(data.object.profile.phone)
        setImage(data.object.profile.image || '')
        setFollower(data.object.stats.follower)
        setFollowing(data.object.stats.following)
        setPost(data.object.stats.post)

        console.log('pofile post )()()() details on user profile--------------->>>>>>>');


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

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSummary = (e) => {
    setSummary(e.target.value);
  };


  // audio file 
  const [selectedFile, setSelectedFile] = useState(null);


  function textEditorHandler(e) {
    setContent(e.target.value);
    console.log(e.target.value);
  }






  const handleSubmit = async () => {
    if (!canPostStatus) {
      alert('দয়া করে প্রোফাইল তৈরি করুন')
    }
    else {

      if (!title) {
        alert('দয়া করে আপনার লেখার শিরোনাম দিন')
      }
      else if (!selectedOption) {
        alert('দয়া করে আপনার লেখার ধরণ নির্বাচন করুন')
      }
      else if (!summary) {
        alert('দয়া করে আপনার লেখার সারমর্ম লিখুন')
      } else if (!writer && !checkboxValue) {
        alert('দয়া করে লেখক নির্বাচন করুন ')
      }
      else {

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("category", selectedOption?.label);
        formData.append("cat_id", selectedOption?.value);
        formData.append("writer", writer);
        formData.append("writer_id", writerId);
        formData.append("title", title);
        formData.append("summary", summary);
        formData.append("content", content);
        formData.append("rating", 1);
        formData.append("status", false);
        formData.append("uploaded_by", userUuid);
        formData.append("new_writer", checkboxValue);

        if (title && selectedOption && summary) {

          console.log(writer, writerId)

          try {
            const response = await fetch(`${apiBasePath}/posts`, {
              method: "POST",
              headers: {

              },
              body: formData,
            });

            if (response.ok) {
              const data = await response.json();
              console.log("sucessfully sent:", data);
              alert("Send Data Sucessfully");

              setSelectedFile(null);
              setTitle('');
              setCategory('');
              setWriters('');
              setContent('');
              setSummary('');
            } else {
              console.error("Failed to update profile:", response.statusText);
              alert(response.statusText);
            }
          } catch (error) {
            console.error("Error updating profile:", error);
            alert(error);
          }
        } else {
          alert('শিরোনাম, লেখার ধরণ ও সারসংক্ষেপ লিখুন')
        }
      }

    }


  };

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
                post={post}
                follower={follower}
                following={following}
                username={username}
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
                      <div className="lg:pr-6 md:pr-0 sm:pr-0 space-y-4 ">
                        <input
                          onChange={handleTitle}
                          value={title}
                          className="w-full h-[62px] p-4 bg-[#FCF7E8] border-solid border-slate-800 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="title"
                          type="text"
                          placeholder="শিরোনাম"
                          required
                        />
                        <textarea
                          onChange={handleSummary}
                          value={summary}
                          className="w-full h-[200px] p-4 bg-[#FCF7E8] border-solid border-slate-800 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="summary"
                          type="textarea"
                          placeholder="সারসংক্ষেপ"
                          required
                        />
                        <div className="text-yellow-800 text-[22px]">আপনার লেখার ধরণ নির্বাচন করুন</div>

                        <div>
                          <Select
                            value={selectedOption}
                            onChange={categoryhandleChange}
                            styles={customStyles}
                            options={Categoryoptions}
                          />
                        </div>
                        <div className='profile__btn__midl'>

                          <CreateCategory setIsCategoryAdded={setIsCategoryAdded} />

                        </div>

                        <div className="text-yellow-800 text-[22px]">লেখক নির্বাচন করুন(<span className="text-red-500">যদি আপনার নাম তালিকায় থাকে</span>)</div>
                        <div className=" place-content-center justify-center ">

                          <div className="">
                            <Select
                              value={selectedWriter}
                              onChange={writerhandleChange}
                              styles={customStyles}
                              options={writersOptions}
                            />

                            <input type="date" class="form-control" />

                          </div>
                          <div className='profile__btn__midl'>
                            <CreateWriter setIsWriterAdded={setIsWriterAdded} />
                          </div>

                          <div className="pt-[10px]">

                            <h1 className="text-black text-[16px]">নিচের বক্সটি চেক করুন (<span className="text-red-500"> যদি আপনার নাম তালিকায় না থাকে</span>) </h1>
                            <Checkbox label="" name="myCheckbox" onChange={handleCheckboxChange} />
                            {/* <p className="text-black">Checkbox value: {checkboxValue.toString()}</p> */}

                          </div>


                        </div>


                        <div className="text-yellow-800 text-[22px]">আপনার লেখা নিচে লিখুন</div>

                        <div className="joidcss">

                          <EditorProvider>
                            <Editor
                              value={content}
                              onChange={textEditorHandler}
                              containerProps={{ style: { color: 'black' } }}

                            >
                              <Toolbar>
                                <BtnBold />
                                <BtnItalic />
                              </Toolbar>
                            </Editor>
                          </EditorProvider>

                        </div>


                        <div>
                          <AudioFileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                        </div>
                        <button
                          onClick={handleSubmit}
                          className="px-[20px] h-[43px] bg-[#F9A106] rounded-md text-[16px] text-white items-center profile__btn__midl"
                        >
                          পোস্ট করুন
                        </button>
                        <hr class="my-4 border-gray-200" />
                      </div>

                      <div>
                        {<ProfilePostLeftContent slug={slug} />}
                      </div>
                    </div>
                    <div className="lg:w-[30%] flex flex-col ">
                      <UserDetails
                        sex={gender}
                        birthdate={dob}
                        location={address}
                        mail={email}
                        phone={phone}
                        userID={userUuid}
                        setIsProfileUpdated={setIsProfileUpdated}
                      />
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
