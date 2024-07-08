// import { color } from 'jodit/types/plugins/color/color';
import React, { useState } from 'react';
import ColorPicker from 'react-pick-color';
import dynamic from 'next/dynamic';

const CustomEditor = dynamic(() => {
    return import('../../custom-editor');
}, { ssr: false });

function MyAudioUploadForm() {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [ebook, setEbook] = useState({
        file: null,
        title: '',
        writer: '',
        voice: '',
        duration: '',
        color: '#fff',
        background: '',
        category: '',
        mature_content: false,
        premium: false,
        type: '',
        summary: '',
        info: '',
        message: ''
    })

    function setInfodata(data) {
        console.log('info data --', data)
    }
    const handleChange = (event) => {
        const selectedFile = event.target.files[0];
        // Basic audio format validation (optional)
        if (!selectedFile.type.match('audio/*')) {
            setMessage('Please select an audio file.');
            return;
        }
    };



    return (
        <div className='admin__add__slider__wrap'>
            <form >

                <div className='audio__book__input__fields clearfix'>
                    <div className='audio__book__input__field'>
                        <label>বইয়ের নাম</label>
                        <input type='text' placeholder='বইয়ের নাম লিখুন' />
                    </div>
                    <div className='audio__book__input__field'>
                        <label>লেখক</label>
                        <input type='text' placeholder='লেখকের নাম লিখুন' />
                    </div>
                </div>
                <div className='audio__book__input__fields clearfix'>
                    <div className='audio__book__input__field'>
                        <label>সময়</label>
                        <input type='text' placeholder='অডিও কত মিনিটের সেটা লিখুন' />
                    </div>
                    <div className='audio__book__input__field'>
                        <label>কণ্ঠ</label>
                        <input type='text' placeholder='যিনি কণ্ঠ দিয়েছেন তার নাম লিখুন' />
                    </div>
                </div>
                <div className='audio__book__input__fields clearfix'>
                    <div className='admin__input  text-black'>
                        <label>বইয়ের ধরণ</label>
                        <select
                            name="optons" id="options">
                            <option>বইয়ের ধরণ নির্বাচন করুন</option>
                        </select>
                    </div>

                    <div className='admin__input text-black'>
                        <label>বইয়ের কভার ইমেজ</label>
                        <div className='audio__file__upload'>
                            <input type="file" id="audioFileInput" onChange={handleChange} />
                            <button type="submit" disabled={isLoading}>
                                {/* {isLoading ? 'Uploading...' : 'Upload Audio'} */}
                            </button>
                            {/* {message && <p>{message}</p>} */}
                        </div>
                    </div>
                </div>
                <div className='audio__book__input__fields clearfix flex w-full'>
                    <div className='w-[33.333%] text-black'>
                        <label>পূর্ণবয়স্ক উপাদান?</label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="mature_content"
                                    value={true}
                                    checked={ebook.mature_content === true}
                                />
                                হ্যাঁ
                            </label>
                            <label className='ml-[30px]'>
                                <input
                                    type="radio"
                                    name="mature_content"
                                    value={false}
                                    checked={ebook.mature_content === false}
                                />
                                না
                            </label>
                        </div>
                    </div>
                    <div className='w-[33.333%] text-black'>
                        <label>বইটি কি প্রিমিয়াম ?</label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    name="premium"
                                    value={true}
                                    checked={ebook.premium === true}
                                />
                                হ্যাঁ
                            </label>
                            <label className='ml-[30px]'>
                                <input
                                    type="radio"
                                    name="premium"
                                    value={false}
                                    checked={ebook.premium === false}
                                />
                                না
                            </label>
                        </div>
                    </div>
                    <div className='w-[33.333%] text-black'>
                        <label>ব্যাকগ্রাউন্ড</label>
                        <div className=''>
                            <label>
                                <input
                                    type="radio"
                                    name="background"
                                    value="background"
                                    checked={ebook.background === 'background'}
                                />
                                ব্যাকগ্রাউন্ড সহ
                            </label>
                            <label className='ml-[30px]'>
                                <input
                                    type="radio"
                                    name="background"
                                    value="no_background"
                                    checked={ebook.background === 'no_background'}
                                />
                                ব্যাকগ্রাউন্ড ছাড়া
                            </label>
                        </div>
                    </div>
                </div>
                <div className='audio__book__input__fields clearfix'>
                    <div className='admin__input'>
                        <ColorPicker color={ebook.color} />
                    </div>
                    <div className='admin__input dashboardCk'>
                        <label>সারসংক্ষেপ</label>
                        <CustomEditor
                            initialData=''
                            setContent={setInfodata}
                        />
                        {/* <textarea type='text' placeholder='বইয়ের সারসংক্ষেপ' /> */}
                    </div>
                </div>
                <div className='audio__book__input__fields clearfix'>
                    <div className='admin__input dashboardCk'>
                        <label>কলাকুশলী</label>
                        <CustomEditor
                            initialData=''
                            setContent={setInfodata}
                        />
                        {/* <textarea type='text' placeholder='info' /> */}
                    </div>
                    <div className='admin__input dashboardCk'>
                        <label>লেখকের মন্তব্য</label>
                        <CustomEditor
                            initialData=''
                            setContent={setInfodata}
                        />
                        {/* <textarea type='text' placeholder='message' /> */}
                    </div>
                </div>
            </form>
            <div className='submit__btn flex  !mt-[40px]'>
                <div className='w-[50%] pl-[12px]'>
                    <button
                        className="page__common__yello__btn w-[80%] h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                    >
                        ক্রিয়েট করুন 
                    </button>

                </div>
            </div>
        </div>
    );
}

export default MyAudioUploadForm;