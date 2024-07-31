import React, { useEffect, useState } from 'react'
import { apiBasePath } from '../../../utils/constant';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteEbookAndAudio() {

    let notification = '';

    const [audioData, setAudioData] = useState({
        audioId: '',
        ebook_id: '',
    });

    const [allBooks, setAllBooks] = useState([]);
    const [audiosOfSelectedBook, setAudioOfSelectedBook] = useState([]);
    useEffect(() => {
        getAudioBookList()
    }, [])

    useEffect(() => {
        if (audioData.ebook_id.length > 0) {
            getAudioList()
        }
    }, [audioData.ebook_id])

    const resetAudioData = () => {
        setAudioData({
            file: null,
            image: null,
            ebook_id: '',
        })
    }

    async function getAudioBookList() {
        try {
            console.log('Inside try')
            const result = await axios.get(
                `${apiBasePath}/books`
            );
            console.log(result)
            setAllBooks(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getAudioList() {
        try {
            console.log('Inside try get audiolist', audioData.ebook_id)
            const result = await axios.get(
                `${apiBasePath}/getaudiobook/${audioData.ebook_id}`
            );
            console.log(result.data.audio);
            setAudioOfSelectedBook(result.data?.audio);
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = async (event) => {
        const { name, value, type, files } = event.target;

        if (name === 'audio') {
            setAudioData((prevData) => ({
                ...prevData,
                audioId: value
            }))
        }

        if (name === 'book') {
            setAudioData((prevData) => ({
                ...prevData,
                ebook_id: value
            }))
        }

    }



    return (
        <div className='admin__add__slider__wrap'>
            <ToastContainer />
            <div >
                <div className='audio__book__input__fields clearfix'>
                    <div className='admin__input  text-black'>
                        <label>বই নির্বাচন করুন</label>
                        <select
                            name="book"
                            id="book"
                            value={audioData.ebook_id}
                            onChange={handleChange}
                        >
                            <option>বই নির্বাচন করুন</option>
                            {allBooks.map((book) => (
                                <option key={book._id} value={book._id}>
                                    {book.title}
                                </option>
                            ))}
                        </select>
                        <div className='pt-[20px]'>
                            <button
                                className="page__common__yello__btn w-[100%] max-w-[300px] h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                                type="submit"
                            >
                                বই মুছে ফেলুন
                            </button>
                        </div>

                    </div>
                    <div className='admin__input  text-black'>
                        <label>অডিও নির্বাচন করুন</label>
                        <select
                            name="audio"
                            id="audio"
                            value={audioData.audioId}
                            onChange={handleChange}
                        >
                            <option>অডিও নির্বাচন করুন</option>
                            {audiosOfSelectedBook.map((audio) => (
                                <option key={audio._id} value={audio._id}>
                                    {audio.title}
                                </option>
                            ))}
                        </select>
                        <div className='pt-[20px]'>
                            <button
                                className="page__common__yello__btn w-[100%] max-w-[300px] h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                                type="submit"
                            >
                                অডিও মুছে ফেলুন
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* <div className='submit__btn flex  !mt-[40px]'>
                <div className='w-[50%] '>
                    <button
                        className="page__common__yello__btn w-[100%] max-w-[300px] h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                        type="submit"
                    >
                        বই মুছে ফেলুন
                    </button>
                </div>

                <div className='w-[50%] '>
                    <button
                        className="page__common__yello__btn w-[100%] max-w-[300px] h-[50px] bg-[#FCA000] rounded-md text-[16px] text-white items-center profile__btn__midl"
                        type="submit"
                    >
                        অডিও মুছে ফেলুন
                    </button>
                </div>
            </div> */}
        </div>
    )
}
