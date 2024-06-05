import { useRouter } from 'next/router';
import React from 'react';

const ReaderModeModal = ({ isOpen, onClose, children }) => {
    const router = useRouter()
    if (!isOpen) return null;


    function readerModeClosehandler() {
        onClose();
        router.reload()
    }

    return (
        <div className="fixed left-0 right-0 top-0 bottom-0 inset-0 z-[99999999999999999999]  bg-black bg-opacity-50">
            <div className="relative w-full h-full bg-white shadow-lg overflow-y-auto">
                <div className="read__mod__btn">
                    <button
                        onClick={readerModeClosehandler}
                        className="fixed z-[9999999] w-[40px] h-[40px] text-white bg-orange-400 rounded-full"
                    >
                        {/* <div className="read__mod__btn">
                    <button className="w-[40px] h-[40px] text-white rounded-full bg-orange-400" onClick={readerModeClosehandler}><i class="ri-close-large-fill"></i></button>
                </div> */}
                        <i class="ri-close-large-fill"></i>
                    </button>
                </div>
                <div className="p-8">{children}</div>
            </div>
        </div >
    );
};

export default ReaderModeModal;
