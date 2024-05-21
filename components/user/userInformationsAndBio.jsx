'use client'
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import Classes from './profile.module.css';
import { apiBasePath } from '../../utils/constant';
import axios from 'axios';
import { useRouter } from 'next/router';



export default function UserInformationsAndBio({ username, setUsername }) {

    const router = useRouter();
    // const [, ] = useState('')
    const [fullName, setFullName] = useState('');
    const [designation, setDesignation] = useState('');
    const [designationFromApi, setDesignationFromApi] = useState([])
    const [profileStatus, setProfileStatus] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setemail] = useState('');
    const [gender, setGender] = useState('');
    const [highlight, setHighlight] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState(null);
    const [bio, setBio] = useState('')
    const [bioId, setBioId] = useState('')
    const [isSubmit, setIsSubMit] = useState(false)
    const [isSubmitEmail, setIsSubMitEmail] = useState(false)

    // get saved info
    const [status, setStatus] = useState("");
    // const [username, setUsername] = useState("");
    const [userUuid, setUserUuid] = useState("");
    const [userToken, setUserToken] = useState("");
    const [number, setnumber] = useState("");

    // designation list
    const [selectedDesignation, setSelectedDesignation] = useState(null);
    const [desigNationId, setDesigNationId] = useState('')
    const designationChange = (selected) => {
        console.log({ selected })
        setSelectedDesignation(selected); // Selected option object
        setDesignation(selected?.label)
        setDesigNationId(selected?.value)
    };
    // profile state

    const [birthOfDate, setBirthOfDate] = useState(null);

    const handleDate = (date) => {
        setBirthOfDate(date);
    };




    function saveImageFromURL(url, filename) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                setImageFile(blob);
            })
            .catch(error => console.error('Error:', error));
    }




    // Fetch user data on component mount
    useEffect(() => {
        setUsername(localStorage.getItem("name") || "");
        setUserToken(localStorage.getItem("token") || "");
        setUserUuid(localStorage.getItem("uuid") || "");
        setnumber(localStorage.getItem("phone") || "");

        //  ge tprofile data-----
        fetch(`${apiBasePath}/getprofile/${localStorage.getItem("uuid")}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log('pofile details --------------->>>>>>>', data);
                // setDesignation(data.object.profile?.designation || '')
                setDesignation(data.object.profile?.designation || '')
                setProfileStatus(data.object.profile?.profileStatus || '')
                setGender(data.object.profile.gender)
                setBirthOfDate(data.object.profile.dob)
                setUsername(data.object.profile.name || '')
                setAddress(data.object.profile?.address || '')
                setemail(data.object.profile.email)
                setPhoneNumber(data.object.profile.phone)
                setGender(data.object.profile.gender)

                saveImageFromURL(`${apiBasePath}/${data.object.profile.image?.slice(data.object.profile.image.indexOf("/") + 1)}`, 'profile.jpg')

                if (data.object.profile.phone?.length > 0) {
                    setIsSubMit(true);
                }

                if (data.object.profile.email?.length > 0) {
                    setIsSubMitEmail(true)
                }


            })
            .catch((error) => console.error("Error fetching profile:", error));




        const fetchUserBioData = async () => {
            const response = await fetch(`${apiBasePath}/bio/${localStorage.getItem("uuid")}`);
            const data = await response.json();
            setBio(data?.content)
            setBioId(data?._id)
            // console.log('------------>>> BIO  <<<-------------', data)

        };

        fetchUserBioData();


        //  get designations options 
        fetch(`${apiBasePath}/designation`)
            .then((response) => response.json())
            .then((data) => {
                setDesignationFromApi(data);
                console.log('DESIGNATION 000000000000000000 )', data)
            })
            .catch((error) => console.error("Error fetching data:", error));

        console.log({ address, phoneNumber })
    }, []);

    //  set designation options
    let designationOptions = []


    for (let i = 0; i < designationFromApi.length; i++) {
        // if(designationFromApi[i].title === designation){
        //     setSelectedDesignation({value:designationFromApi[i].title, label: designationFromApi[i].title})
        // }
        let data = { value: designationFromApi[i].title, label: designationFromApi[i].title };
        // console.log('---data -----------'. data)
        designationOptions.push(data);
    }





    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("From submit ------------------------")
        // console.log(typeof(address))

        if (!gender) {
            alert('Select your gender')
        } else if (!birthOfDate) {
            alert('Give your birth date')
        } else {

            //const formattedDate = moment(startDate).format('DD-MM-YYYY');
            console.log({ selectedDesignation, designation })
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
            formData.append('user_id', localStorage.getItem("uuid"));
            // const token = JSON.parse(localStorage.getItem('token'));
            try {
                const response = await fetch(`${apiBasePath}/profile`, {
                    method: 'PUT',
                    headers: {
                        // 'x-access-token': token,
                    },
                    body: formData
                });

                // console.log('------>>>> PROFILE RESPONSE <<<<<<--------', response)

                if (response.ok) {
                    const data = await response.json();
                    alert('প্রোফাইল সফলভাবে আপডেট হয়েছে')
                    console.log('Profile updated successfully:', data);
                    setIsSubMit(true)

                    router.reload()

                } else {
                    console.error('Failed to update profile:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating profile:', error);
            }

        }

        //  update bio
        try {
            const response = await axios.post(
                `${apiBasePath}/bio`,
                {
                    user_id: `${localStorage.getItem("uuid")}`,
                    content: bio,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

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

        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };


    const customStyles = {
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            color: "#000"
        }),
    };


    return (
        <>
            <div className='edit__btn__wrap m-auto lg:pt-0 md:pt-[40px] sm:pt-[50px] xs:pt-[70px] text-black mx-[110px]'>
                <div className="text-[28px] mb-2 text-[#F9A106]">বিস্তারিত</div>
                <div className="text-[20px] text-[#737373] space-y-3 ">
                    <div className=' lg:flex lg:flex-row w-full'>
                        <div className="lg:w-[50%]">
                            <div>
                                <label className='text-[#ffa844] '> লিঙ্গ </label>
                                <div className='flex justify-left align-items-center items-center flex-row space-x-2'>
                                    <div htmlFor="sex">
                                        <img
                                            className='w-[15px] h-[15px]'

                                            src="/images/usericons/sexicon.svg"
                                        />
                                    </div>
                                    <select
                                        id="sex"
                                        name="sex"
                                        className='bg-transparent w-[90%]'
                                        required
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}>
                                        <option value="">নির্বাচন করুন</option>
                                        <option value="male">পুরুষ</option>
                                        <option value="female">নারী</option>
                                    </select>
                                </div>
                            </div>


                        </div>

                        <div className="lg:w-[50%] lg:mt-0 md:mt-0 sm:mt-[15px] xs:mt-[15px]">
                            <div>
                                <label className='text-[#ffa844] '> মোবাইল নাম্বার </label>
                                <div className="flex justify-left align-items-center items-center flex-row space-x-2 ">
                                    <div htmlFor="phoneNumber">
                                        <img
                                            className='w-[15px] h-[15px]'

                                            src="/images/usericons/phone.svg"
                                        />
                                    </div>
                                    {isSubmit ? <>
                                        <p>{phoneNumber}</p>
                                    </> : <>

                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            className='w-[90%] px-4 py-1'
                                            placeholder='8801XXXXXXXXX'
                                            required
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </>}

                                </div>

                            </div>



                        </div>
                    </div>

                    <div className=' lg:flex lg:flex-row w-full pt-[15px]'>
                        <div className='lg:w-[50%]'>

                            <div className='W-[90%] mb-[15px] flex flex-col'>
                                <label className='text-[#ffa844] '> পদবী </label>

                                <select
                                    id="designation"
                                    name="designation"
                                    className='bg-transparent w-[93%]'
                                    required
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}>
                                    <option value="">নির্বাচন করুন</option>
                                    {designationFromApi.map((category) => (
                                        <option key={category._id} value={category.title}>
                                            {category.title}
                                        </option>
                                    ))}

                                </select>
                                {/* <Select
                                    className='w-[95%]'
                                    value={selectedDesignation}
                                    onChange={designationChange}
                                    styles={customStyles}
                                    options={designationOptions}
                                /> */}

                            </div>


                            <div>
                                <label className='text-[#ffa844] '> জন্ম তারিখ </label>
                                <div className='w-[95%] flex justify-left  align-items-center flex-row space-x-2'>
                                    <div htmlFor="birthDate py-2">
                                        <img
                                            className='w-[23px] h-[23px] -ml-[2px]'
                                            src="/images/usericons/birthdate.svg"
                                        />
                                    </div>

                                    <input
                                        className="shadow appearance-none border rounded bg-transparent  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="birthDate"
                                        type="date"
                                        value={birthOfDate}
                                        onChange={(e) => setBirthOfDate(e.target.value)}

                                        required

                                    />
                                </div>

                            </div>





                        </div>
                        <div className='lg:w-[50%] lg:mt-0 md:mt-0 sm:mt-[15px] xs:mt-[15px]'>
                            <div>
                                <label className='text-[#ffa844] '> ইমেইল </label>
                                <div className="flex justify-left align-items-center items-center flex-row space-x-2">
                                    <div htmlFor="email">
                                        <img
                                            className='w-[15px] h-[15px] '

                                            src="/images/usericons/email.svg"
                                        />
                                    </div>
                                    {isSubmitEmail ? <>
                                        <p>{email}</p>
                                    </> : <>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className='w-full px-4 py-1'
                                            placeholder='mail@domain.com'
                                            required
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}

                                        />
                                    </>}

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className='my-[15px] w-full'>
                        <hr></hr>
                    </div>

                    <div className='lg:flex lg:flex-col'>

                        <div>
                            <label className='text-[#ffa844] '> ঠিকানা </label>
                            <div className="flex justify-left items-center flex-row w-full space-x-2 pt-2">
                                <div htmlFor="address">
                                    <img
                                        className='h-[18px]'
                                        src="/images/usericons/location.svg"
                                    />
                                </div>
                                <textarea
                                    id="address"
                                    name="address"
                                    placeholder='ঠিকানা'
                                    className='w-full border border-gray-200 rounded-[10px] px-[15px] py-[5px]'
                                    value={`${address === ('undefined' || undefined) ? '' : address}`}
                                    onChange={(e) => setAddress(e.target.value)}

                                />
                            </div>

                        </div>

                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="ProfileStatus" className='text-[#ffa844]'> স্ট্যাটাস </label>
                        <input className='border h-[45px] p-3 rounded-[10px]' id='ProfileStatus' type='text'
                            value={`${profileStatus === 'undefined' ? '' : profileStatus}`}
                            onChange={(e) => setProfileStatus(e.target.value)}
                            placeholder='স্ট্যাটাস' />


                    </div>


                    <div className='mt-[80px] w-full'>
                        <h1 htmlFor="bio" className="text-[20px] mt-5 text-[#F9A106]">জীবন বৃত্তান্ত</h1>
                        <textarea
                            id="bio"
                            name="bio"
                            placeholder='জীবন বৃত্তান্ত'
                            className='w-full border border-gray-200 rounded-2xl h-[120px] px-[10px] py-[5px] text-black'
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className='bg-[#fd9915] hover:bg-[#cf7b1b] text-white hover:text-white text-[22px] px-[25px] py-[5px] rounded-2xl mt-[25px] '
                    >প্রোফাইল আপডেট</button>
                </div>
            </div>
        </>
    )

}