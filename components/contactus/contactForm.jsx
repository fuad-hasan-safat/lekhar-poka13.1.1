"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { apiBasePath } from '../../utils/constant';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {

    let notification = ''


    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        message: ''
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(`${apiBasePath}/contact`, {
                name: formData.fullName,
                mobile: formData.phoneNumber,
                message: formData.message
            });

            // alert('ধন্যবাদ আপনার মন্তব্যের জন্য')
            notification = 'ধন্যবাদ আপনার মন্তব্যের জন্য'

        } catch (error) {
            console.error('Signup error:', error);
        }



        // Reset form fields after submission
        setFormData({
            fullName: '',
            phoneNumber: '',
            message: ''
        });

        notify();
    };

    const notify = () => toast.warn(notification, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,

    });

    return (
        <form onSubmit={handleSubmit} >

            <div className='space-y-5'>

                <div className={``}>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder='নাম'
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className='bg-[#FCF7E8] w-full lg:h-[62px] md:h-[55px] sm:h-[50px] xs:h-[45px] rounded-[5px] p-5'
                    />
                </div>

                <div className={` `}>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder='ফোন নাম্বার'
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        className='bg-[#FCF7E8] w-full lg:h-[62px] md:h-[55px] sm:h-[50px] xs:h-[45px] rounded-[5px] p-5'
                    />
                </div>

                <div className={``}>

                    <textarea
                        id="message"
                        name="message"
                        placeholder='আপনার মন্তব্য'
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className='bg-[#FCF7E8] w-full lg:h-[270px] md:h-[240px] sm:h-[220px] xs:h-[200px] rounded-[5px] p-5'
                    />

                </div>

                <button
                    type="submit"
                    className={`page__common__btn contact__form__btn font-[600] bg-[#F9A106] w-full lg:h-[75px] md:h-[70px] sm:h-[60px] xs:h-[50px] rounded-[5px] lg:text-[30px] md:text-[29px] sm:text-[28px] xs:text-[24px] text-white`}
                >
                    সাবমিট
                </button>
                <ToastContainer />


            </div>

        </form>
    );
};

export default ContactForm;