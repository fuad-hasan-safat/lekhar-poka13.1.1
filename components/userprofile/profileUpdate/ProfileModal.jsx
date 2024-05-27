import React from 'react'

export default function ProfileModal({ showModal, handleClose }) {
    return (

        <div className={`${showModal ? 'block' : 'hidden'} fixed z-[9999999999] inset-0 overflow-y-auto flex items-center justify-center`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all lg:max-w-[1022px] sm:align-middle sm:max-w-lg sm:w-full xs:max-w-lg xs:w-full ">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">

                        <div className="mt-3 w-full ml-0 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3 className="text-[22px] leading-6 font-medium text-gray-900" id="modal-title">
                                নতুন রাইটার ক্রিয়েট করুন
                            </h3>
                            <div className="my-[25px] w-full">
                                <h1>Profile modal</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center text-[16px]">
                        <button
                            type="button"
                            className="bg-white  text-[#F9A106]  py-[10px] px-[160px] rounded border border-[#F9A106] focus:outline-none focus:shadow-outline mr-2"
                            onClick={handleClose}
                        >
                            বাতিল
                        </button>
                        <button
                            type="submit"
                            className="bg-[#FCA000] hover:bg-[#e3a230] text-white py-[10px] px-[160px] rounded focus:outline-none focus:shadow-outline"
                        >
                            আপডেট
                        </button>
                    </div>

                </div>
            </div>
        </div>

    )
}
