'use client'
import React, { useContext, useEffect, useState } from 'react'
import ImageCropProvider from '../cropComponents/ImageCropProvider'
import ImageCrop from '../cropComponents/ImageCrop'
import { apiBasePath } from '../../../utils/constant'
import Class from './profileEdit.module.css'
import axios from 'axios'
import { UserContext } from '../../lekharpokaStore/user-context'
import { readFile } from '../cropComponents/cropImage'
import { useDispatch, useSelector } from 'react-redux'
import { toastAction } from '../../redux/toast-slice'

export default function ProfileModal({ setShowModal, setuserprofiledata, showModal, handleClose, image = '' }) {

    const dispatch = useDispatch();
    const { setUser } = useContext(UserContext);
    const userUuid = useSelector((state) => state.usersession.userUuid);

    const [loggedInUserId, setLoggedInUserId] = useState(null)

    useEffect(()=>{
      const loggedInUser = localStorage.getItem('userId') || null ;
      console.log('logged in user in profile -->', loggedInUser)
      setLoggedInUserId(loggedInUser);
    },[])

    let notification = ''

    const [gender, setGender] = useState('');
    const [designation, setDesignation] = useState('');
    const [designationFromApi, setDesignationFromApi] = useState([])
    const [birthOfDate, setBirthOfDate] = useState(null);
    const [profileStatus, setProfileStatus] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setemail] = useState('');
    const [error, setError] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [updatedImage, setUpdatedImage] = useState(null);
    const [bio, setBio] = useState('')
    const [bioId, setBioId] = useState('')
    const [isSubmit, setIsSubMit] = useState(false)
    const [isSubmitEmail, setIsSubMitEmail] = useState(false)
    const [follower, setFollower] = useState(0);
    const [following, setFollowing] = useState(0);
    const [approvedPostNum, setApprovedPostNum] = useState(0);
    const [unapprovedPostNum, setunApprovedPostNum] = useState(0);
    const [username, setUsername] = useState("");

    // Fetch user data on component mount
    useEffect(() => {
        //  ge tprofile data-----
        fetch(`${apiBasePath}/getprofile/${loggedInUserId}`)
            .then((response) => response.json())
            .then((data) => {

                setDesignation(data.object.profile?.designation || '')
                setProfileStatus(data.object.profile?.profileStatus || '')
                setGender(data.object.profile.gender)
                setBirthOfDate(data.object.profile.dob)
                setUsername(data.object.profile.name || '')
                setAddress(data.object.profile?.address || '')
                setemail(data.object.profile.email)
                setPhoneNumber(data.object.profile.phone)
                setGender(data.object.profile.gender)
                setFollower(data.object.stats.follower)
                setFollowing(data.object.stats.following)
                setApprovedPostNum(data.object.approved_post)
                setunApprovedPostNum(data.object.unapproved_post)

                if (data.object.profile?.image) {
                    saveImageFromURL(`${apiBasePath}/${data.object.profile.image?.slice(data.object.profile.image.indexOf("/") + 1)}`, 'profile.jpg')

                }

                if (data.object.profile.phone?.length > 0) {
                    setIsSubMit(true);
                }

                if (data.object.profile.email?.length > 0) {
                    setIsSubMitEmail(true)
                }
            })
            .catch((error) => console.error("Error fetching profile:", error));




        const fetchUserBioData = async () => {
            const response = await fetch(`${apiBasePath}/bio/${loggedInUserId}`);
            const data = await response.json();
            setBio(data?.content)
            setBioId(data?._id)
        };

        fetchUserBioData();


        //  get designations options 
        fetch(`${apiBasePath}/designation`)
            .then((response) => response.json())
            .then((data) => {
                setDesignationFromApi(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [showModal, loggedInUserId]);



    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showModal]);

    function validatePhoneNumber(input) {
        const isValid = /^01\d{9}$/.test(input);

        if (isValid) {
            return true;
        } else {
            return false;
        }
    }


    const validateEmail = (email) => {
        // Your email validation logic here
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setemail(newEmail);
        if (!validateEmail(newEmail)) {
            setError('সঠিক ইমেইল দিন !');
        } else {
            setError('');
        }
    }


    function saveImageFromURL(url, filename) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                setImageFile(blob);
            })
            .catch(error => console.error('Error:', error));
    }

    //  handle submit

    const handleSubmit = async (e) => {
        e?.preventDefault();

        console.log('Inside submit')

        const isValidPhone = validatePhoneNumber(phoneNumber);

        if (!isValidPhone && !isSubmit) {
            notification = 'মোবাইল নাম্বার অবশ্যই ০১ দিয়ে শুরু হবে এবং ১১ ডিজিট হবে!';
            dispatch(toastAction.setWarnedNotification(notification));
            return;
        }

        const isEmailValidated = validateEmail(email);
        if (!isEmailValidated) {
            notification = 'সঠিক ইমেইল দিন!';
            dispatch(toastAction.setWarnedNotification(notification));

            return;
        }


        try {
            const response = await axios.post(
                `${apiBasePath}/bio`,
                {
                    user_id: `${loggedInUserId}`,
                    content: bio,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log('bio post res', response)
            setuserprofiledata((prevData) => ({
                ...prevData,
                userBio: bio,
            }))

        } catch (error) {
            console.error('Error updating profile:', error);
        }




        try {
            const response = await axios.put(
                `${apiBasePath}/bio/${bioId}`,
                {
                    content: bio
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log('bio PUT res', response)
            setuserprofiledata((prevData) => ({
                ...prevData,
                userBio: bio,
            }))


        } catch (error) {
            console.error('Error updating profile:', error);
        }


        console.log('outside check,', image, imageFile)
        //  update profile data

        if (username.trim().length <= 0) {
            notification = 'দয়া করে প্রোফাইল এর নাম নির্বাচন করুন';
            dispatch(toastAction.setWarnedNotification(notification));
            
        }
        else if ((image?.length <= 0) && (!imageFile)) {
            notification = 'দয়া করে প্রোফাইল এর জন্য স্থিরচিত্র নির্বাচন করুন';
            dispatch(toastAction.setWarnedNotification(notification));
            
        }
        else if (designation?.length <= 0) {
            notification = 'আপনার পদবী প্রদান করুন';
            dispatch(toastAction.setWarnedNotification(notification));
        }
        else if (!gender) {
            notification = 'আপনার লিঙ্গ নির্ধারণ করুন';
            dispatch(toastAction.setWarnedNotification(notification));

        } else if (!birthOfDate) {
            dispatch(toastAction.setWarnedNotification('আপনার জন্ম তারিখ প্রদান করুন'));
        } else {
            const formData = new FormData();
            formData.append('file', imageFile);
            formData.append('name', username)
            formData.append('designation', designation);
            formData.append('profileStatus', profileStatus);
            formData.append('gender', gender);
            formData.append('dob', birthOfDate);
            formData.append('address', address);
            formData.append('email', email);
            formData.append('phone', phoneNumber);
            formData.append('user_id', loggedInUserId);
            try {
                const response = await fetch(`${apiBasePath}/profile`, {
                    method: 'PUT',
                    headers: {
                        // 'x-access-token': token,
                    },
                    body: formData
                });
                if (response.ok) {

                  if(updatedImage) {
                    setImageFile(updatedImage);

                    const imageDataUrl = await readFile(updatedImage);
                    setuserprofiledata((prevData) => ({
                        ...prevData,
                        userImage: imageDataUrl,
                    }))
                    setUser({ userImage: imageDataUrl });
                  } 

                    setuserprofiledata((prevData) => ({
                        ...prevData,
                        userName: username,
                        userPhone: phoneNumber,
                        userEmail: email,
                        userBirthDate: birthOfDate,
                        userDesignation: designation,
                        userGender: gender,
                        userStatus: profileStatus,
                        userAddress: address,
                    }));
                    dispatch(toastAction.setSucessNotification('প্রোফাইল সফলভাবে আপডেট হয়েছে'));
                    handleClose();

                } else {
                    console.error('Failed to update profile:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            }

        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };



    return (
        <>

            <div className={`${showModal ? 'block' : 'hidden'} fixed z-[9999] inset-0 overflow-y-auto flex items-center justify-center bg-black/70`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className=" inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom mt-[650px] mb-[300px] bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all lg:max-w-[700px] sm:align-middle sm:max-w-lg sm:w-full xs:max-w-[340px] w-full">

                    <div className="bg-white pb-[60px] ">
                        <div className=" sm:flex sm:items-start h-[140px] bg-[#FFC973]">

                        </div>

                        <div className='-mt-[80px]'>
                            <ImageCropProvider>
                                <ImageCrop setuserprofiledata={setuserprofiledata} setUpdatedImage={setUpdatedImage} setImageFile={setImageFile} image={image === '' ? '/images/defaultUserPic/profile.jpg' : image} />
                            </ImageCropProvider>

                        </div>

                        <div className='px-[10px] lg:max-w-[640px] md:max-w-[570px] sm:max-w-[540px] xs:max-w-[310px] items-center justify-center place-content-center m-auto'>
                            <input
                                type='text'
                                className={`${Class.profile__input} h-[40px] px-[16px]`}
                                placeholder='আপনার নাম '
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            ></input>

                            <input
                                type='number'
                                className={`${Class.profile__input} h-[40px] px-[16px]`}
                                placeholder='মোবাইল নাম্বার'
                                required
                                value={phoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                }}
                                disabled={isSubmit}
                            ></input>

                            <div>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    className={`${Class.profile__input} h-[40px] px-[16px]`}
                                    placeholder='mail@domain.com'
                                    required
                                    value={email}
                                    onChange={handleEmailChange}
                                    disabled={isSubmitEmail}
                                ></input>
                                {error && <div className="pb-[8px] text-[#FCA000]">{error}</div>}

                            </div>

                            <input
                                id='birthdate'
                                type='date'
                                className={`${Class.profile__input} h-[40px] px-[16px]`}
                                placeholder='জন্ম তারিখ'
                                value={birthOfDate}
                                onChange={(e) => {
                                    setBirthOfDate(e.target.value);
                                }}
                            ></input>

                            <div className='flex flex-row  space-x-[24px] '>
                                <select
                                    id="designation"
                                    name="designation"
                                    className={`${Class.profile__input} h-[40px] px-[16px]`}
                                    required
                                    value={designation}
                                    onChange={(e) => {
                                        setDesignation(e.target.value);
                                    }}>
                                    <option value="">পদবী</option>
                                    {designationFromApi.map((category) => (
                                        <option key={category._id} value={category.title}>
                                            {category.title}
                                        </option>
                                    ))}

                                </select>
                                <select
                                    id="sex"
                                    name="sex"
                                    className={`${Class.profile__input} h-[40px] px-[16px]`}
                                    required
                                    value={gender}
                                    onChange={(e) => {
                                        setGender(e.target.value);
                                    }}>
                                    <option value="">লিঙ্গ</option>
                                    <option value="male">পুরুষ</option>
                                    <option value="female">নারী</option>
                                </select>

                            </div>

                            {/* <input
                                id='profilestatus'
                                type='text'
                                placeholder='স্ট্যাটাস'
                                className={`${Class.profile__input} h-[40px] px-[16px]`}
                                value={`${profileStatus === 'undefined' ? '' : profileStatus}`}
                                onChange={(e) => {
                                    setProfileStatus(e.target.value);
                                }}
                            >
                            </input> */}


                            <input
                                id='address'
                                name='address'
                                type='text'
                                className={`${Class.profile__input} h-[40px] px-[16px]`}
                                placeholder='ঠিকানা'
                                value={`${address === ('undefined' || undefined) ? '' : address}`}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}

                            ></input>

                            <textarea
                                id="bio"
                                name="bio"
                                placeholder='সংক্ষিপ্ত জীবনী'
                                required
                                className={`h-[180px] ${Class.profile__input} px-[16px] py-[16px] `}
                                value={bio}
                                onChange={(e) => {
                                    setBio(e.target.value);
                                }}
                            />

                        </div>

                        <div className="flex justify-center lg:text-[22px] md:text-[20px] sm:text-[16px] xs:text-[16px]">
                            <button
                                type="button"
                                className="page__common__yello__btn bg-white  text-[#F9A106]  py-[7px] lg:px-[125px] md:px-[80px] sm:px-[65px] xs:px-[40px] rounded border border-[#F9A106] focus:outline-none focus:shadow-outline mr-2"
                                onClick={handleClose}
                            >
                                বাতিল
                            </button>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="page__common__yello__btn ml-[6px] bg-[#FCA000] hover:bg-[#e3a230] text-white py-[7px] lg:px-[125px] md:px-[80px] sm:px-[60px] xs:px-[40px] rounded focus:outline-none focus:shadow-outline"
                            >
                                আপডেট
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
