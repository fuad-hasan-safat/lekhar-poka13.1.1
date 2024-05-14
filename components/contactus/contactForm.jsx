"use client"
import React, { useState } from 'react';
// import { arial } from "../fonts/arial";
import axios from 'axios';
import { apiBasePath } from '../../utils/constant';

const ContactForm = () => {
    // State variables to store form data
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        message: ''
    });

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit =  async (e) => {
        e.preventDefault();
        // Do something with the form data, for example, send it to an API
        console.log('Form data submitted:', formData);
        try {
            const response = await axios.post(`${apiBasePath}/contact`, {
                name: formData.fullName,
                mobile: formData.phoneNumber,
                message: formData.message
            });
            // Handle successful signup response (e.g., redirect)
            alert('ধন্যবাদ আপনার মন্তব্যের জন্য')
        } catch (error) {
            console.error('Signup error:', error);
            // Handle signup error (e.g., display error message)
        }



        // Reset form fields after submission
        setFormData({
            fullName: '',
            phoneNumber: '',
            message: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className='space-y-5'>
                <div className={``}>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder='Full Name'
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className='bg-[#FCF7E8] w-full lg:h-[62px] md:h-[55px] sm:h-[50px] xs:h-[45px] rounded-3xl p-5'
                    />
                </div>
                <div className={` `}>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder='Phone Number'
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className='bg-[#FCF7E8] w-full lg:h-[62px] md:h-[55px] sm:h-[50px] xs:h-[45px] rounded-3xl p-5'
                    />
                </div>
                <div className={``}>
                    <textarea
                        id="message"
                        name="message"
                        placeholder='Your Message...'
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className='bg-[#FCF7E8] w-full lg:h-[257px] md:h-[240px] sm:h-[220px] xs:h-[200px] rounded-3xl p-5'
                    />
                </div>
                <button
                    type="submit"
                    className={` bg-[#F9A106] w-full lg:h-[75px] md:h-[70px] sm:h-[60px] xs:h-[50px] rounded-3xl lg:text-[36px] md:text-[34px] sm:text-[30px] xs:text-[24px] text-white`}
                >
                    Send
                </button>
            </div>

        </form>
    );
};

export default ContactForm;