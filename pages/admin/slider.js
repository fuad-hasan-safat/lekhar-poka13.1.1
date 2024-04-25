'use client'
import React from 'react';
import { useState, useEffect } from 'react';
import Classes from './slider.module.css';
import { apiBasePath } from '../../utils/constant';

const Page = () => {

    const [highlight, setHighlight] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [caption, setCaption] = useState('');
    const [related, setRelated] = useState('');
    const [optionList, setOptionList] = useState([])


    const customStyles = {
        menu: (provided) => ({
          ...provided,
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          color: "#000"
        }),
      };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();


        const formData = new FormData();
        formData.append('profile_pic', imageFile);
        formData.append('')

        if (typeof window !== 'undefined') {
            // Perform localStorage action
            // const item = localStorage.getItem('key')
            const token = JSON.parse(localStorage.getItem('token'));
        }

        // const token = JSON.parse(localStorage.getItem('token'));
        try {
            const response = await fetch(`${apiBasePath}/sliders`, {
                method: 'PUT',
                headers: {
                    'x-access-token': token,
                },
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Slider updated successfully:', data);
                // Redirect to another page
                // router.push('/user-setting');
            } else {
                console.error('Failed to update Slider:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating Slider:', error);
        }
    };

    useEffect(() => {
        fetch(`${apiBasePath}/posts`)
            .then((res) => res.json())
            .then(data => setOptionList(data))
    }, [])

    const options = optionList.map((value, index) => <option value={value._id} key={index}>{value.title}</option>)

    

    const saveData = async () => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('title', title);
        formData.append('caption', caption);
        formData.append('content', content);
        formData.append('related_content', related);

        console.log(formData)

        try {
            const response = await fetch(`${apiBasePath}/sliders`, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Slider updated successfully:', data);
                // Redirect to another page
                // router.push('/user-setting');
            } else {
                console.error('Failed to update Slider:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating Slider:', error);
        }
    }


    const handleUpload = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setHighlight(false);
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result); // Set preview image
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section className='admin__add__slider__sec' style={{padding:'100px 0'}}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='admin__add__slider__wrap'>
                          <div className='admin__upload__wrap'>
                            <div className='profile__image__upload'>
                                <div
                                    onDragEnter={(e) => setHighlight(true)}
                                    onDragLeave={(e) => setHighlight(false)}
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onDrop={(e) => handleUpload(e)} className={`${Classes.upload__slider__img}${highlight ? ' is-highlight' : ''}`} style={{ backgroundImage: `url(${preview || '/default-image.jpg'})` }}>
                                    <form className='my__form'>
                                        <div className='upload__button'>
                                            <input
                                                type='file'
                                                className='upload__file'
                                                accept='image/*'
                                                onChange={(e) => handleUpload(e)}
                                            />
                                            <button className='button'><i className='ri-camera-line'></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className='admin__form__wrap'>
                                <form onSubmit={handleProfileUpdate}>
                                    <div className='admin__input'>
                                        <label>Title</label>
                                        <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
                                    </div>
                                    <div className='admin__input'>
                                        <label>Content</label>
                                        <textarea type='text' value={content} onChange={(e) => setContent(e.target.value)} placeholder='Content'/>
                                    </div>
                                    <div className='admin__input'>
                                        <label>Caption</label>
                                        <textarea type='text' value={caption} onChange={(e) => setCaption(e.target.value)} placeholder='Caption'/>
                                    </div>
                                    <div className='admin__input text-black'>
                                        <select 
                                        name="optons" id="options" 
                                        onChange={(e) => setRelated(e.target.value)} >
                                            {options}
                                        </select>
                                    </div>
                                    <div className='admin__submit'>
                                        <button type='button' onClick={saveData}>Submit</button>
                                    </div>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Page;