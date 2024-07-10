import React, { useState } from 'react'
import { apiBasePath } from '../../../utils/constant';
import axios from 'axios';

export default function CreateAudioQuote() {
    const [quote, setQuote] = useState({
        title: ''
    })
    const handleChange = (event) => {
        const { value } = event.target;
        setQuote(prevState => ({ ...prevState, title: value }))
    }

    const validateFields = () => {
        for (const key in quote) {
            if (quote[key].trim() === '' || quote[key] === null) {
                alert(`Please fill in the ${key} field.`);
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateFields()) {
            return
        };

      
        console.log('Submit quote --', quote.title)

        try {
            const response = await axios.post(`${apiBasePath}/createquote`, {
                title: quote.title
            });

            console.log('Success:', response.data);
            setQuote({ title: '' });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    console.log('Quote --->>', quote.title)
    return (
        <div className='admin__add__slider__wrap'>
            <form onSubmit={handleSubmit}>
                <div className='audio__book__input__field'>
                    <label>উক্তি লিখুন</label>
                    <input
                        name='title'
                        type='text'
                        placeholder='উক্তি লিখুন'
                        value={quote.title}
                        onChange={handleChange}
                    />
                </div>
            </form>
            <div className='submit__btn flex  !mt-[27px]'>
                <div className='w-[50%] pl-[12px]'>
                    <button
                        className="page__common__yello__btn w-[80%] h-[45px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        ক্রিয়েট করুন
                    </button>
                </div>
            </div>
        </div>
    )
}
