import React, { useState } from 'react'
import CreateWriterModal from './CreateWriterModal';


export default function CreateWriter() {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div>
            <button
                className="bg-[#F9A106] hover:bg-[#f3ad57] text-white py-2 px-4 rounded mt-[20px]"
                onClick={handleShow}
            >
                নতুন রাইটার ক্রিয়েট করুন
            </button>

            <CreateWriterModal showModal={showModal} handleClose={handleClose} />
        </div>
    );

}
