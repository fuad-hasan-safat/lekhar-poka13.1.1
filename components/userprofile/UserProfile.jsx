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
import Sidebar from '../sidebar/Sidebar'
import { fetchData } from "../../function/api";
import { apiBasePath } from "../../utils/constant";
import Link from "next/link";

import Checkbox from '../common/Checkbox'
import AudioFileUpload from '../userprofile/AudiofileUpload'

export default function UserProfile({ slug }) {


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
    setStatus(localStorage.getItem("status") || "");
  }, [status]);

  useEffect(() => {
    setUsername(localStorage.getItem("name") || "");
    setUserToken(localStorage.getItem("token") || "");
    setUserUuid(localStorage.getItem("uuid") || "");
    setUserPhone(localStorage.getItem("phone") || "");
    setWriter(localStorage.getItem("name"));
    setWriter(username);
  }, []);


  useEffect(() => {

    fetch(`${apiBasePath}/getprofile/${slug}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('pofile details on user profile--------------->>>>>>>', data);
        setDesignation(data.object.profile.designation)
        setProfileStatus(data.object.profile.profileStatus)
        setGender(data.object.profile.gender)
        setDob(data.object.profile.dob)
        setAddress(data.object.profile.address)
        setEmail(data.object.profile.email)
        setPhone(data.object.profile.phone)
        setImage(data.object.profile.image || '')
        setFollower(data.object.profile.follower)
        setFollowing(data.object.profile.following)
        setPost(data.object.profile.post)

        console.log('pofile gender details on user profile--------------->>>>>>>', gender);


        if (!data.object.stats) {
          setCanPostStatus(false)
        } else {
          setCanPostStatus(true)
        }

        console.log(' profile image----------->>>>', image)
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

    // user post

    async function fetchDataAsync() {
      try {
        const result = await fetchData(
          `${apiBasePath}/postsbyuser/${slug}`
        );
        console.log(
          "result        user profile  ->>>>>>>>>>>>>>>>",
          result.object
        );
        setUserPost(result.object);
        console.log(
          "result        user USER POST  ->>>>>>>>>>>>>>>>",
          userPost
        );
      } catch (error) {
        //alert("Error fetching user post");
        console.log("Error fetching user post")
      }
    }

    fetchDataAsync();
  }, []);



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
  const audioRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);




  // jodit editor config
  const joditconfig = {
    // Other configurations...
    placeholder: 'লিখুন',
    color: 'black',
    selectionStay: true,

  };

  function textEditorHandler(e) {
    setContent(e.target.value);
  }


  const handleKeyUp = (event) => {
    // Check if the current selection is empty (no characters selected)
    const selection = editorRef.current?.getSelection(); // Assuming Jodit provides a getSelection method
    if (!selection || selection.toString().trim() === '') {
      // If selection is empty, prevent default behavior only for specific key presses
      // (e.g., arrow keys, navigation keys) that might cause unintended deselection
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(event.key)) {
        event.preventDefault();
      }
    }
  };

  // const joditconfig = useMemo(
  // 	{
  // 		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
  // 		placeholder: placeholder || 'Start typings...'
  // 	},
  // 	[placeholder]
  // );



  const handleSubmit = async () => {
    if (!canPostStatus) {
      alert('দয়া করে প্রোফাইল তৈরি করুন')
    }
    else {

      if (!title) {
        alert('দয়া করে আপনার লেখার শিরোনাম')
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
              <div>
                <img
                  className="w-full"
                  src="/images/usericons/userbanner.svg"
                  alt="banner"
                />
              </div>
              <div className="grid place-content-center items-center text-center -mt-[110px]">
                <div className="table m-auto">
                  <img
                    className="w-[264px] h-[264px] rounded-full  border-4 border-solid border-white  "
                    src={image.length > 0 ? `${apiBasePath}/${image}` : '/images/defaultUserPic/profile.jpg'} />
                </div>
                <div className="grid place-content-center  text-center space-y-4">
                  <h1 className="text-[#FCD200] text-[35px]  items-center">
                    {username}
                  </h1>
                  <h1 className="text-[#595D5B] text-[22px]  items-center">
                    {designation}
                  </h1>
                  <h1 className="text-[#737373] text-[22px]  items-center">
                    {profileStatus}
                  </h1>
                </div>
                <div className="flex flex-row text-[#484848] text-[28px] justify-items-center  m-auto divide-x-2 space-x-3 pt-4">

                  <div className="">
                    <h1>{post}</h1>
                    <h1>পোস্ট</h1>
                  </div>

                  <div className="pl-2">
                    <h1>{follower}</h1>
                    <h1>ফলোয়ার</h1>
                  </div>
                  <div className="pl-2">
                    <h1>{following}</h1>
                    <h1>ফলোয়িং</h1>
                  </div>
                </div>
              </div>
            </div>
            <section className="all__post__sec__wrap">
              <div className="container">
                <div className="row">
                  <div className="col-md-12"></div>
                  <div className="flex flex-row pt-[80px]">
                    <div className="w-[71%]">
                      <div className="pr-6 space-y-4">
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

                        <Select
                          value={selectedOption}
                          onChange={categoryhandleChange}
                          styles={customStyles}
                          options={Categoryoptions}
                        />

                        <div className="text-yellow-800 text-[22px]">লেখক নির্বাচন করুন(<span className="text-red-500">যদি আপনার নাম তালিকায় থাকে</span>)</div>
                        <div className=" place-content-center justify-center ">

                          <div className="">
                            <Select
                              value={selectedWriter}
                              onChange={writerhandleChange}
                              styles={customStyles}
                              options={writersOptions}
                            />

                          </div>

                          <div className="pt-[10px]">

                            <h1 className="text-black text-[16px]">নিচের বক্সটি চেক করুন (<span className="text-red-500"> যদি আপনার নাম তালিকায় না থাকে</span>) </h1>
                            <Checkbox label="" name="myCheckbox" onChange={handleCheckboxChange} />
                            {/* <p className="text-black">Checkbox value: {checkboxValue.toString()}</p> */}

                          </div>


                        </div>


                        <div className="text-yellow-800 text-[22px]">আপনার লেখা নিচে লিখুন</div>

                        <div className="joidcss">

                          {/* <JoditEditor
                            ref={editor}
                            value={content}
                            config={joditconfig}
                             tabIndex={1} // tabIndex of textarea
                            onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                            onChange={(newContent) => setContent(newContent)}
                            onKeyUp={handleKeyUp}
                          /> */}

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

                        {/* <div className="text-gray-800">
                          <input type="file" accept="audio/*" onChange={handleFileChange} />
                          {selectedFile ? (
                            <p>Selected file: {selectedFile.name}</p>
                          ) : (
                            <p>অডিও ফাইল আপলোড করুন</p>
                          )}
                        </div> */}
                        <div>
                          <AudioFileUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
                          {/* <ChankFileUpload/> */}
                        </div>
                        <button
                          onClick={handleSubmit}
                          className="w-[219px] h-[43px] bg-[#F9A106] text-[16px] text-white"
                        >
                          পোস্ট করুন
                        </button>
                        <hr class="my-4 border-gray-200" />
                      </div>

                      <div>
                        {userPost.length &&
                          userPost.map((post, index) => (
                            <>
                              <div>
                                <div className="pb-3 pt-10">
                                  <div className="text-3xl text-yellow-400 font-bold">
                                    {post.title}
                                  </div>
                                </div>
                                <div className="pb-4">
                                  <div className="text-xl text-gray-800 font-semibold ">
                                    {post.writer}
                                  </div>
                                </div>
                                <div className="pb-3">
                                  <div
                                    className="text-[16px] text-gray-500 text-justify pr-11"
                                    dangerouslySetInnerHTML={{
                                      __html: post.content,
                                    }}
                                  />
                                </div>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                    <div className="w-[29%] flex flex-col">
                      <UserDetails
                        sex={gender}
                        birthdate={dob}
                        location={address}
                        mail={email}
                        phone={phone}
                        userID={userUuid}
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
