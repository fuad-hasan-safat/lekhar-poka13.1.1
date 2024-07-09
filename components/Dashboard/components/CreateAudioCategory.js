import React, { useState } from 'react'
import ColorPicker, { themes } from 'react-pick-color'
import { apiBasePath } from '../../../utils/constant';

export default function CreateAudioCategory() {

    const [audioCategory, setAudioCategory] = useState({
        file: null,
        title: '',
        background: 'background',
        color: '',
    })


    const resetAudioCategory = () => {
        setAudioCategory({
            file: null,
            title: '',
            background: 'background',
            color: '',
        })
    }

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        if (type === 'file') {
            const selectedFile = files[0];
            if (!selectedFile.type.match('image/*')) {
                alert('Please select an image file.');
                return;
            } else {
                setAudioCategory((prevAudiocategory) => ({ ...prevAudiocategory, file: selectedFile }));
            }
        } else {
            setAudioCategory((prevAudioCategory) => ({ ...prevAudioCategory, [name]: value }));
        }
    };

    const validateFields = () => {
        for (const key in audioCategory) {
            if (audioCategory[key] === '' || audioCategory[key] === null) {
                alert(`Please fill in the ${key} field.`);
                return false;
            }
        }
        return true;
    };

    const createAudioCategory = async (event) => {
        event.preventDefault();
        if (!validateFields()) {
            // alert("সব ফিল্ড পূরণ করুন")
            return
        };

        const formData = new FormData();
        for (const key in audioCategory) {
            formData.append(key, audioCategory[key]);
        }

        try {

            const response = await fetch(`${apiBasePath}/createaudiocategory`, {
                method: 'POST',
                body: formData
            })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log('Success:', result);
            resetAudioCategory();
        } catch (error) {
            console.log('Audio category create error', error);
        }
    }


    return (
        <div className='admin__add__slider__wrap'>
            <form onSubmit={createAudioCategory}>
                <div className='audio__book__input__fields clearfix'>
                    <div className='audio__book__input__field'>
                        <label>বইয়ের ধরণ লিখুন</label>
                        <input
                            name='title'
                            type='text'
                            placeholder='বইয়ের ধরণ লিখুন'
                            value={audioCategory.title}
                            onChange={handleChange}
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
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='audio__book__input__fields clearfix'>
                    <div className='admin__input'>
                        <label>ব্যাকগ্রাউন্ড কালার</label>
                        <ColorPicker
                            color={audioCategory.color}
                            theme={themes.dark}
                            onChange={(color) => setAudioCategory(prevState => ({ ...prevState, color: color.hex }))}
                        />
                    </div>
                </div>
            </form>
            <div className='submit__btn'>
                <div className='w-full place-content-end flex justify-end '>
                    <button
                        type='submit'
                        onClick={createAudioCategory}
                        className="page__common__yello__btn max-w-[310px] w-full h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                    >
                        ক্রিয়েট করুন
                    </button>
                </div>
            </div>
        </div>
    )
}
