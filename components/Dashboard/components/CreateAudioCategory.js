import React, { useState } from 'react'
import ColorPicker, { themes } from 'react-pick-color'

export default function CreateAudioCategory() {

    const [audioCategory, setAudioCategory] = useState({
        file: null,
        title: '',
        background:'background',
        color:'',
    })

    const handleChange = (event) =>{
        const {name, value, type, files} = event.target;

        if(type === 'file'){
            const selectedFile = files[0];
            if(!selectedFile.type.match('image/*')){
                alert('Please select an image file.');
                return;
            } else{
                setAudioCategory((prevAudiocategory)=>({...prevAudiocategory, file:selectedFile}));
            }
        }
    }

    const validateFields = () => {
        for (const key in ebook) {
            if (ebook[key] === '' || ebook[key] === null) {
                setMessage(`Please fill in the ${key} field.`);
                return false;
            }
        }
        return true;
    };


    return (
        <div className='admin__add__slider__wrap'>
            <form>
                <div className='audio__book__input__fields clearfix'>
                    <div className='audio__book__input__field'>
                        <label>বইয়ের ধরণ লিখুন</label>
                        <input
                            name='title'
                            type='text'
                            placeholder='বইয়ের ধরণ লিখুন'
                            value={audioCategory.title}
                        />
                    </div>

                    <div className='admin__input text-black'>
                        <label>বইয়ের ধরণ কভার ইমেজ</label>
                        <div className='audio__file__upload'>
                            <input
                                name='file'
                                type="file"
                                accept="image/*"
                                id="audioFileInput"
                            />
                        </div>
                    </div>
                </div>
                <div className='audio__book__input__fields clearfix'>
                    <div className='admin__input'>
                        <label>ব্যাকগ্রাউন্ড কালার</label>
                        <ColorPicker
                            color=''
                            theme={themes.dark}
                        />
                    </div>
                </div>
            </form>
            <div className='submit__btn'>
                <div className='w-full place-content-end flex justify-end '>
                    <button
                        className="page__common__yello__btn max-w-[310px] w-full h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                    >
                        ক্রিয়েট করুন
                    </button>
                </div>
            </div>
        </div>
    )
}
