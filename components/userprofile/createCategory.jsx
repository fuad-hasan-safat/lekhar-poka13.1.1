import React, { useState } from 'react'
import CreatecategoryModal from './createCategoryModal';

export default function CreateCategory({setIsCategoryAdded}) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <div>
            <button
                className="bg-[#F9A106] hover:bg-[#f3ad57] text-white py-2 px-4 rounded mt-[20px]"
                onClick={handleShow}
            >
                নতুন লেখার ধরণ করুন
            </button>

            <CreatecategoryModal showModal={showModal} handleClose={handleClose} setIsCategoryAdded={setIsCategoryAdded} />
        </div>
    );
}
